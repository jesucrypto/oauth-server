CREATE DATABASE IF NOT EXISTS playlister_db;

CREATE TABLE IF NOT EXISTS user
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spotify_user_id VARCHAR(200),
    spotify_uri VARCHAR(200),
    spotify_display_name VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS tokens
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    access_token VARCHAR(200),
    refresh_token VARCHAR(200),
    expiration_date VARCHAR(225)
    CONSTRAINT `fk_user_tokens`
        FOREIGN KEY (user_id) REFERENCES user (id)
        ON DELETE CASCADE
);

