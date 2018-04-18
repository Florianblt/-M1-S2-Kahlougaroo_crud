CREATE DATABASE  IF NOT EXISTS kahlougaroo;
USE kahlougaroo;

DROP TABLE IF EXISTS partie;
CREATE TABLE partie (
    -- PRIMARY KEY --
    token VARCHAR(250) NOT NULL PRIMARY KEY,
    -- OTHER --
    pin int(11) NOT NULL UNIQUE,
    nb_joueurs int(11) NOT NULL,
    -- FOREIGN KEY --
    statut int(11) NOT NULL DEFAULT 1,
    FOREIGN KEY (statut) REFERENCES statut(token)
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
    master int(2) NOT NULL DEFAULT 0,
    mort int(2) NOT NULL DEFAULT 0,
    -- FOREIGN KEY --
    role int(11) NOT NULL,
    partie int(11) NOT NULL,
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