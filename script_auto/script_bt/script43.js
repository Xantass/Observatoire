// Importer le module MySQL
const mysql = require('mysql');
const axios = require('axios');
const parseString = require('xml2js').parseString;

const host = 'i2bat.mysql.database.azure.com'
const utilisateur = 'I2bat'
const mot_de_passe = 'dz7@8#%PYP2b'
const nom_base_de_donnees = 'observatoire'
const port = 3306
// Paramètres de connexion à la base de données
const connexion = mysql.createConnection({
    host: host,     // Adresse du serveur MySQL
    user: utilisateur,  // Nom d'utilisateur MySQL
    password: mot_de_passe, // Mot de passe MySQL
    database: nom_base_de_donnees, // Nom de la base de données MySQL
    port: port
});

// URL de l'API que vous souhaitez interroger
const apiUrl = 'https://api.insee.fr/token';

// Données à envoyer dans le corps de la requête
const requestData = 'grant_type=client_credentials'; // Les données XML que vous souhaitez envoyer

axios.post(apiUrl, requestData, {
    headers: {
        'Authorization': 'Basic WnFzZjdYWTJ0M2p6Sm05YjRsM3BqXzJFOUdvYTpnaEJhTHVTRzZaSllTeUxqNlJnMzVHYnhFVzBh' // Si l'API nécessite un jeton d'authentification
    }
})
.then(response => {
    // La requête a réussi, analysez la réponse XML
    //console.log("response = ", response.data);

    const bearer = "Bearer " + response.data.access_token;

    axios.get("https://api.insee.fr/series/BDM/V1/data/SERIES_BDM/001710976", {
        headers: {
            "Authorization": bearer,
            "Accept": "application/vnd.sdmx.structurespecificdata+xml;version=2.1"
        }
    })
    .then(response => {
        parseString(response.data, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'analyse de la réponse XML :', err);
            } else {
                const obsElements = result['message:StructureSpecificData']['message:DataSet'][0]['Series'][0]['Obs']
                if (obsElements && obsElements.length > 0) {
                    connexion.connect(async (erreur) => {
                        if (erreur) {
                            console.error('Erreur de connexion : ' + erreur.stack);
                            return;
                        }
                        connexion.query("TRUNCATE TABLE indice_bt43", (erreur, resultats) => {
                            if (erreur) {
                                console.error('Erreur lors de la suppresion : ' + erreur.message);
                            } else {
                                //console.log('Données insérées avec succès. ID de l\'enregistrement : ' + resultats.insertId);
                            }
                        });
                        const requeteInsertion = 'INSERT INTO indice_bt43 (BT_DATE, BT_INDICE, BT_PARUTION) VALUES (?, ?, ?)';
                        for (const obs of obsElements) {
                            const timePeriod = obs.$.TIME_PERIOD;
                            const obsValue = obs.$.OBS_VALUE;
                            const dateJo = obs.$.DATE_JO;
                            const valeurs = [timePeriod, obsValue, dateJo];

                            connexion.query(requeteInsertion, valeurs, (erreur, resultats) => {
                                if (erreur) {
                                    console.error('Erreur lors de l\'insertion : ' + erreur.message);
                                } else {
                                    //console.log('Données insérées avec succès. ID de l\'enregistrement : ' + resultats.insertId);
                                }
                            });
                        }
                        connexion.end()
                    });
                } else {
                    console.log("Aucun élément <Obs> trouvé.");
                }
            }
        });
    })
    .catch(error => {
        console.error('Erreur lors de la requête API :', error);
    })
})
.catch(error => {
    // La requête a échoué, affichez l'erreur
    console.error('Erreur lors de la requête API :', error);
});