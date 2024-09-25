USE chall;

DROP TABLE IF EXISTS flag;
CREATE TABLE IF NOT EXISTS flag (
    value VARCHAR(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- On the remote server, a real flag is inserted.
INSERT INTO flag (value) VALUES ('Alpaca{REDACTED}');

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(16) PRIMARY KEY,
    password VARCHAR(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO users (username, password) VALUES ('admin', 'pass');
INSERT INTO users (username, password) VALUES ('hacker', '1337');
