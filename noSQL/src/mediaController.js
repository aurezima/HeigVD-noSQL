import PouchDB from 'pouchdb-browser';

const db = new PouchDB('documents_db');

// 1. Ajouter un média à un document
export async function addMediaToDocument(documentId, file) {
  try {
    // Vérifier si le document existe
    const doc = await db.get(documentId);

    // Ajouter le média comme pièce jointe
    const response = await db.putAttachment(documentId, file.name, doc._rev, file, file.type);

    console.log('Média ajouté avec succès :', response);
  } catch (err) {
    console.error('Erreur lors de l’ajout du média :', err);
  }
}

// 2. Lister les médias associés à un document
export async function listMedia(documentId) {
  try {
    const doc = await db.get(documentId, { attachments: true });

    // Retourne les métadonnées des pièces jointes
    return doc._attachments ? Object.keys(doc._attachments) : [];
  } catch (err) {
    console.error('Erreur lors de la récupération des médias :', err);
    return [];
  }
}

// 3. Supprimer un média d’un document
export async function deleteMediaFromDocument(documentId, attachmentName) {
  try {
    const doc = await db.get(documentId);

    // Supprimer l'attachement
    const response = await db.removeAttachment(documentId, attachmentName, doc._rev);

    console.log('Média supprimé avec succès :', response);
  } catch (err) {
    console.error('Erreur lors de la suppression du média :', err);
  }
}
