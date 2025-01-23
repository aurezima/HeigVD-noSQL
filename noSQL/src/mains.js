import { addMediaToDocument, listMedia, deleteMediaFromDocument } from './mediaController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Récupération des éléments du DOM
  const mediaForm = document.getElementById('mediaForm');
  const documentIdInput = document.getElementById('documentId');
  const mediaFileInput = document.getElementById('mediaFile');
  const mediaListDiv = document.getElementById('mediaList');

  // Écouteur pour le formulaire d'ajout de médias
  mediaForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const documentId = documentIdInput.value;
    const file = mediaFileInput.files[0]; // Récupère le fichier sélectionné

    if (documentId && file) {
      try {
        await addMediaToDocument(documentId, file);
        alert('Média ajouté avec succès');
        updateMediaList(documentId); // Met à jour la liste des médias
      } catch (err) {
        console.error('Erreur lors de l’ajout du média :', err);
      }
    } else {
      alert('Veuillez fournir un ID de document et un fichier.');
    }
  });

  // Fonction pour mettre à jour la liste des médias
  async function updateMediaList(documentId) {
    try {
      const mediaList = await listMedia(documentId);
      mediaListDiv.innerHTML = ''; // Réinitialise la liste
      mediaList.forEach((media) => {
        const mediaItem = document.createElement('div');
        mediaItem.textContent = media.name;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', async () => {
          try {
            await deleteMediaFromDocument(documentId, media.name);
            alert('Média supprimé avec succès');
            updateMediaList(documentId); // Met à jour la liste après suppression
          } catch (err) {
            console.error('Erreur lors de la suppression du média :', err);
          }
        });
        mediaItem.appendChild(deleteButton);
        mediaListDiv.appendChild(mediaItem);
      });
    } catch (err) {
      console.error('Erreur lors de la récupération de la liste des médias :', err);
    }
  }
});
