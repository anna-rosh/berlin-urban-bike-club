const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
);

//////////////////////// Q U E R I E S ////////////////////

module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.checkEmail = (email) => {
    return db.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.addCode = (email, code) => {
    return db.query(
        `INSERT INTO resetcodes (email, code)
        VALUES ($1, $2)`,
        [email, code]
    );
};

module.exports.getResentCode = (email) => {
    return db.query(
        `SELECT * FROM resetcodes
        WHERE email = $1
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY id DESC
        LIMIT 1`,
        [email]
    );
};

module.exports.updatePassword = (password, email) => {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE email = $2`,
        [password, email]
    );
};

module.exports.getUserById = (id) => {
    return db.query(
        `SELECT first, last, img_url, bio, id
        FROM users
        WHERE id = $1`,
        [id]
    );
};

module.exports.updateProfilePicUrl = (url, id) => {
    return db.query(
        `UPDATE users
        SET img_url = $1
        WHERE id = $2
        RETURNING img_url`,
        [url, id]
    );
};

module.exports.updateBio = (bio, id) => {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2
        RETURNING bio`,
        [bio, id]
    );
};

module.exports.getNewUsers = (currUserId) => {
    return db.query(
        `SELECT id, img_url, first, last FROM users
        WHERE id <> $1
        ORDER BY id DESC LIMIT 3`,
        [currUserId]
    );
};

module.exports.getMatchingUsers = (input, currUserId) => {
    return db.query(
        `SELECT id, img_url, first, last
        FROM users
        WHERE first ILIKE $1
        AND id <> $2
        LIMIT 10`,
        [input + '%', currUserId]
    );
};

module.exports.checkFriendshipStatus = (currProfileId, currUserId) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [currProfileId, currUserId]
    );
};

module.exports.addFriendship = (currProfileId, currUserId) => {
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id)
        VALUES ($1, $2)`,
        [currProfileId, currUserId]
    );
};

module.exports.deleteFriendship = (currProfileId, currUserId) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1)`,
        [currProfileId, currUserId]
    );
};

module.exports.acceptFriendship = (currUserId, currProfileId) => {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE recipient_id = $1
        AND sender_id = $2`,
        [currUserId, currProfileId]
    );
};