const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const db = require('./db');
const bc = require('./bc');
const csurf = require('csurf');
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

///////////////////////////////////// END MIDDLEWARE ////////////////////////////

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + "/index.html"); 
    }
});
////////////////// DO NOT DELETE CODE BELOW THIS LINE //////////////////
app.get('*', function(req, res) { 
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');  
    }
});
////////////////// DO NOT DELETE CODE ABOVE THIS LINE //////////////////

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

    db.checkPassword(email)
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
            console.log('err in checkPassword: ', err);
            res.json({ error: true });
        });

});

app.listen(8080, function() {
    console.log("index.js for social network is listening 🦜");
});
