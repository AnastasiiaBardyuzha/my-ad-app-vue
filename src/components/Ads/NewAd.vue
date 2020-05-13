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
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg" width="150px" height="auto">
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
            :disabled="!valid"
          >Create ad</v-btn>
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
      valid: false
    }
  },
  methods: {
    createAd() {
      if(this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          discription: this.description,
          promo: this.promo,
          src: 'https://images.unsplash.com/photo-1533907650686-70576141c030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }

        this.$store.dispatch('createAd', ad)
      }
    }
  }
}
</script>