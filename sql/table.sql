CREATE DATABASE  IF NOT EXISTS kahlougaroo;
USE kahlougaroo;


DROP TABLE IF EXISTS partie;
CREATE TABLE partie (
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    token VARCHAR(250) NOT NULL UNIQUE,
    pin int(11) NOT NULL,
    nb_joueurs int(11) NOT NULL,
    statut int(11) NOT NULL
);


DROP TABLE IF EXISTS role;
CREATE TABLE role (
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    nom VARCHAR(250) NOT NULL
);


DROP TABLE IF EXISTS joueur;
CREATE TABLE joueur (
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    nom VARCHAR(250) NOT NULL,
    master int(2) NOT NULL,
    token VARCHAR(250) NOT NULL UNIQUE,
    mort int(2) NOT NULL,
    -- FOREIGN KEY --
    role int(11) NOT NULL,
    partie int(11) NOT NULL,
    FOREIGN KEY (role) REFERENCES role(id),
    FOREIGN KEY (partie) REFERENCES partie(id)
);


DROP TABLE IF EXISTS statut;
CREATE TABLE statut (
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    nom VARCHAR(250) NOT NULL UNIQUE
);