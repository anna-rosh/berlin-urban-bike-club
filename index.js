const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const bc = require('./bc');
const csurf = require('csurf');
const cryptoRandomString = require("crypto-random-string");
const ses = require('./ses');
const multer = require("multer");
const s3 = require("./s3");
const { s3Url } = require("./config");
const uidSafe = require("uid-safe");
const path = require("path");
const { async } = require('crypto-random-string');
// compression makes the responses smaller and the application faster (can be used in any server)
app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    // this code will only run if the application will be published online
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static('./public'));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

///////////////////////////////////// END MIDDLEWARE & OTHER SETTINGS ////////////////////////////

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + "/index.html"); 
    }
});

app.post('/register', (req, res) => {

    const { first, last, email, password } = req.body;

    bc.hash(password)
        .then((hashedPassword) => {
            db.addUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                })
                .catch((err) => {
                    console.log("ERR in addUser: ", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("err in hash: ", err); 
            res.json({ error: true });
        });

});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    db.checkEmail(email)
        .then(({ rows }) => {
            const { password:encodedPassword, id } = rows[0];

            bc.compare(password, encodedPassword)
                .then((result) => {
                    if (result == true) {
                        req.session.userId = id;
                        res.json({ error: false });
                    } else {
                        res.json({ error: true });
                    }
                })
                .catch(err => {
                    console.log('err in bc.compare: ', err);
                    res.json({ error: true });
                });

        })
        .catch(err => {
            console.log('err in checkEmail: ', err);
            res.json({ error: true });
        });

});

app.post('/password/reset/start', (req, res) => {
    const { email } = req.body;

    db.checkEmail(email)
        .then(() => {
            const resetCode = cryptoRandomString({ length: 6 });

            db.addCode(email, resetCode)
                .then(() => {
                    ses.sendEmail(email, `please use the following code to reset your password: ${resetCode}`, 'reset your password');
                    
                    res.json({ error: false });
                })
                .catch(err => {
                    console.log('err in addCode: ', err);
                    res.json({ error: true });
                });
        })
        .catch(err => {
            console.log('err in checkEmail for reseting password: ', err);
            res.json({ error: true });
        });

});

app.post('/password/reset/verify', (req, res) => {
    // in req.body we expect to find the properties: code, password, email
    const { code, password, email } = req.body;

    db.getResentCode(email)
        .then(({ rows }) => {
            const currentCode = rows[0].code;

            if (code !== currentCode) {
                res.json({ error: true });
            } else {
                bc.hash(password)
                    .then(hashedPassword => {
                        
                        db.updatePassword(hashedPassword, email)
                            .then(() => {
                                res.json({ error: false });
                            })
                            .catch(err => {
                                console.log('err in hash for pw-updating: ', err);
                                res.json({ error: true });
                            });

                    })
                    .catch();
            }
        })
        .catch(err => {
            console.log('err in getResentCode: ', err);
            res.json({ error: true});
        });

});

app.get('/user', async function(req, res) {

    try {
        const { rows } = await db.getUserById(req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in getUserById: ", err);
    }

});

app.post("/upload-profile-picture", uploader.single("file"), s3.upload, async function(req, res) {

    if (!req.file) {
        res.json({ error: true });
    } else {
        const { filename } = req.file;
        const imageUrl = `${s3Url}${filename}`;

        try {
            const { rows } = await db.updateProfilePicUrl(imageUrl, req.session.userId);
            res.json(rows[0]);

        } catch (err) {
            console.log("err in updateProfilePicUrl", err);
        }

    } // closes else statement

});

app.post("/update-bio", async function(req, res) {
    // getting { bio: somevalue } from the client side in req.body
    try {
        const { rows } = await db.updateBio(req.body.bio, req.session.userId);
        res.json(rows[0]);

    } catch (err) {
        console.log('err in updateBio: ', err);
        res.json({ error: true });
    }

});

app.get('/api/user/:id', async function(req, res) {

    try {
        const { rows } = await db.getUserById(req.params.id);

        if (!rows[0]) {
            res.json({ error: true });
        } else {
            res.json({
                ...rows[0],
                currUserId: req.session.userId
            });  
        }

    } catch (err) {
        console.log('err in getUserById in GET /user/id: ', err);
        res.json({ error: true });
    }

});

// app.get('/all-users', async function(req, res) {

//     try {
//         // get the information about all the users but not of the current user
//         const { rows } = await db.getAllUsersButTheCurrent(req.session.userId);
//         res.json(rows);


//     } catch (err) {
//         console.log('err in getAllUsers: ', err);
//     }

// });

////////////////// DO NOT DELETE CODE BELOW THIS LINE //////////////////
app.get('*', function(req, res) { 
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');  
    }
});
////////////////// DO NOT DELETE CODE ABOVE THIS LINE //////////////////

app.listen(8080, function() {
    console.log("index.js for social network is listening 🦜");
});
