use Observatoire;

CREATE TABLE IF NOT EXISTS user
(
    id smallint unsigned not null auto_increment,
    identifiant text not null,
    password text not null,
    encrypt text not null,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS operation
(
    id int unsigned not null auto_increment,
    id_user smallint not null,
    nom text not null,
    dates DATE not null,
    maj DATE not null,
    PRIMARY KEY(id)
);

