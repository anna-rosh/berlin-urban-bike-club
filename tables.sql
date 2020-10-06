DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR NOT NULL CHECK (password != ''),
    img_url VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS resetcodes;

CREATE TABLE resetcodes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL CHECK (email != '') REFERENCES users(email),
    code VARCHAR NOT NULL CHECK (code != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    message VARCHAR NOT NULL CHECK (message != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);