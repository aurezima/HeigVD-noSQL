<script lang="ts">
import PouchDB from 'pouchdb';

declare interface Post {
  _id: string,
  doc:{
    post_name:string,
    post_content: string,
    attributes: {
      creation_date: string
    }
  }
}

export default {


  data() {
    return {
      datas: [],
      databaseReference: null,

    };

  },
  methods: {
    inc() {

      // old

      // this.total++;
    },

    initDatabase() {
    const db = new PouchDB ('http://localhost:5984/nosql_document_db');
    if (db) {
        console.log("Connected to collection 'post'");
      } else {
        console.warn("Something went wrong");
      }
      this.storage = db;

    console.log(db)
    db.info().then(function (info) {
  console.log(info);
})
    
    },
      fetchData() {
     
    }
  },

  



  mounted() {
    this.initDatabase()
  }
}


</script>



<template>
  <h1>InfraDon2</h1>
  <p>Counter: {{ datas }}</p>
  <button type="button" role="button" @click="inc">
    +1
  </button>
</template>

