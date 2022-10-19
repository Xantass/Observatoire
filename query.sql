use Observatoire

CREATE TABLE IF NOT EXISTS user
(
    id smallint unsigned not null auto_increment,
    identifiant text not null,
    password text not null,
    PRIMARY KEY(id)
);

SELECT * FROM user;