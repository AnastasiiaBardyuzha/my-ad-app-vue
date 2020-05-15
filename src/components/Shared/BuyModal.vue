<template>

    <v-dialog v-model="modal" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn dark class="blue accent-3" text v-on="on">Buy</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Do you wont to buy it</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            label="Name"
            name="name"
            type="text"
            v-model="name"
          ></v-text-field>
          <v-text-field
            label="Your phone"
            name="phone"
            type="phone"
            v-model="phone"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
           text 
           @click="onCancel"
           :disabled="localLoading"
          >
            Close
          </v-btn>
          <v-btn
           class="success" 
           @click="onSave"
           :disabled="localLoading"
           :loading="localLoading"
          >
            Buy it
          </v-btn>
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
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = '',
      this.phone = '',
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.name = '',
          this.phone = '',
          this.localLoading = false
          this.modal = false
        })

        
      }
    }
  }
}
</script>