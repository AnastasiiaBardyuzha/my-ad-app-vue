<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form
          ref="form"
          v-model="valid"
          validation
          class="md-3"
        >
          <v-text-field
            label="Ad Title"
            name="title"
            type="text"
            :rules="[v => !!v || 'Title is requared']"
            required
            v-model="title"
          ></v-text-field>

          <v-textarea
            label="Ad description"
            name="description"
            multi-line
            type="text"
            :rules="[v => !!v || 'Description is requared']"
            v-model="description"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn
              color="warning"
              class="ma-2 white--text"
              @click="trigerUpload"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
             ref="fileInput" 
             type="file" 
             style="display: none;" 
             accept="image/*"
             @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="src" height="auto" v-if="src">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
            v-model="promo"
            label="Add to Promo"
          >
          </v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
           <v-spacer></v-spacer>
           <v-btn
            class="success"
            @click="createAd"
            :disabled="!valid || !img || loading"
            :loading="loading"
          >
            Create ad
          </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      img: null,
      src: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd() {
      if(this.$refs.form.validate() && this.img) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          img: this.img
        }

        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    trigerUpload() {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        this.src = reader.result
      }

      reader.readAsDataURL(file)
      this.img = file
    }
  }
  
}

</script>