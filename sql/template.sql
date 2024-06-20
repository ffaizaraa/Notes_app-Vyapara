-- Buat database baru
CREATE DATABASE notes_db;

-- Gunakan database yang baru dibuat
USE notes_db;

-- Buat tabel notes
CREATE TABLE notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    datetime DATETIME NOT NULL,
    note LONGTEXT NOT NULL
);
