CREATE DATABASE  IF NOT EXISTS kahlougaroo;
USE kahlougaroo;

DROP TABLE IF EXISTS partie;
CREATE TABLE partie (
    -- PRIMARY KEY --
    token VARCHAR(250) NOT NULL PRIMARY KEY,
    -- OTHER --
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
    token VARCHAR(250) NOT NULL PRIMARY KEY,
    -- OTHER --
    nom VARCHAR(250) NOT NULL,
    master int(2) NOT NULL,
    mort int(2) NOT NULL,
    -- FOREIGN KEY --
    role int(11) NOT NULL,
    partie VARCHAR(250) NOT NULL,
    FOREIGN KEY (role) REFERENCES role(id),
    FOREIGN KEY (partie) REFERENCES partie(token)
);


DROP TABLE IF EXISTS statut;
CREATE TABLE statut (
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    nom VARCHAR(250) NOT NULL UNIQUE
);