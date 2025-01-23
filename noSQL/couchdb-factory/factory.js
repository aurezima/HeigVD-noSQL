import nano from 'nano'; // Utilisez "import" pour charger le module
const couch = nano('http://admin:password@127.0.0.1:5984'); // Remplacez admin et password par vos identifiants

// Exemple de génération de documents
const dbName = 'test_db';

function generateDocument(index) {
  return {
    _id: `doc_${index}`,
    name: `Name_${index}`,
    description: `Description for document ${index}`,
    timestamp: new Date().toISOString(),
    randomNumber: Math.floor(Math.random() * 1000),
  };
}

async function insertDocuments(db, numberOfDocuments) {
  try {
    const bulkDocs = [];
    for (let i = 0; i < numberOfDocuments; i++) {
      bulkDocs.push(generateDocument(i));
    }
    const response = await db.bulk({ docs: bulkDocs });
    console.log('Documents insérés avec succès :', response);
  } catch (err) {
    console.error('Erreur lors de l’insertion :', err);
  }
}

(async () => {
  try {
    const dbList = await couch.db.list();
    if (!dbList.includes(dbName)) {
      console.log(`Création de la base de données : ${dbName}`);
      await couch.db.create(dbName);
    }
    const db = couch.db.use(dbName);
    console.log('Insertion des documents...');
    await insertDocuments(db, 100);
    console.log('Insertion terminée.');
  } catch (err) {
    console.error('Erreur :', err);
  }
})();
