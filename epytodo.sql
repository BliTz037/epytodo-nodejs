CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;
CREATE TABLE IF NOT EXISTS user
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status ENUM("not started", "todo", "in progress", "done") DEFAULT "not started",
    user_id INT UNSIGNED NOT NULL
);