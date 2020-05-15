<template>

    <v-dialog v-model="modal" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn class="warning mr-2" text v-on="on">Edit</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Edit Ad</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            label="Title"
            name="title"
            type="text"
            v-model="editTitle"
          ></v-text-field>
          <v-textarea
            label="Description"
            name="description"
            multi-line
            type="text"
            v-model="editDescription"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn class="success" @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      editTitle: this.ad.title,
      editDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.editTitle = this.ad.title,
      this.editDescription = this.ad.description
      this.modal = false
    },
    onSave () {
      if (this.editTitle !== '' && this.editDescription !== '') {

        this.$store.dispatch('udateAd', {
          title: this.editTitle,
          description: this.editDescription,
          id: this.ad.id
        })

        this.modal = false
      }
    }
  }
}
</script>