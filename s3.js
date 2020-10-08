const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("req.file is not there");
        next();
    } else {
        const { filename, mimetype, size, path } = req.file;

        s3.putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: req.session.userId + '/' + filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then(() => {
                console.log("(s3.js) uploading worked");
                next();
            })
            .catch((err) => {
                console.log("err in putObject: ", err);
                res.sendStatus(500);
            });
    }
};

exports.delete = async function emptyS3Directory(dir) {
    const listParams = {
        Bucket: "spicedling",
        Prefix: dir,
    };

    console.log("directory: ", dir);
    console.log('typeof dir', typeof dir);

    let listedObjects;
    try {
        listedObjects = await s3.listObjectsV2(listParams).promise(); 
    } catch (err) {
        console.log("err in s3.listObjectsV2", err);
    }
    

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: "spicedling",
        Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    try {
        await s3.deleteObjects(deleteParams).promise(); 
    } catch (err) {
        console.log("err in s3.deleteObjects", err);
    }
    

    if (listedObjects.IsTruncated) {
        try {
            await emptyS3Directory(dir); 
        } catch (err) {
            console.log("err in emptyS3Directory", err);
        }
    }
    
};