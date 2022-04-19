CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

INSERT INTO users (username, password, email)
VALUES ('hatproject', 'qwerty', 'hatproject@admin.com'),
           ('watermelonhumorous', 'qwerty', 'watermelonhumorous@admin.com');
