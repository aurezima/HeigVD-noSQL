<template>
  <div>
    <form @submit.prevent="addMedia">
      <label for="documentId">Document ID :</label>
      <input v-model="documentId" type="text" id="documentId" name="documentId" required />

      <label for="mediaFile">Choisir un fichier :</label>
      <input ref="fileInput" type="file" id="mediaFile" name="mediaFile" required />

      <button type="submit">Ajouter un média</button>
    </form>

    <div id="mediaList">
      <h3>Liste des médias associés :</h3>
      <ul>
        <li v-for="(media, index) in mediaList" :key="index">
          {{ media }}
          <button @click="deleteMedia(media)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      documentId: '',
      mediaList: [], // Liste des médias associés
    };
  },
  methods: {
    async addMedia() {
      if (!this.documentId || !this.$refs.fileInput.files[0]) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      const file = this.$refs.fileInput.files[0];

      try {
        // Envoyer le fichier à la base de données via une API ou directement avec PouchDB
        await this.$emit('add-media', this.documentId, file);

        // Mettre à jour la liste des médias associés
        this.updateMediaList();
        alert('Média ajouté avec succès.');
      } catch (err) {
        console.error(err);
        alert('Erreur lors de l’ajout du média.');
      }
    },

    async updateMediaList() {
      try {
        const media = await this.$emit('get-media-list', this.documentId);
        this.mediaList = media;
      } catch (err) {
        console.error(err);
        this.mediaList = [];
      }
    },

    async deleteMedia(mediaName) {
      try {
        await this.$emit('delete-media', this.documentId, mediaName);
        this.updateMediaList();
        alert('Média supprimé avec succès.');
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la suppression du média.');
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
button {
  margin-left: 10px;
}
</style>
