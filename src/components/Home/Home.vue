<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel cycle>
            <v-carousel-item
              v-for="(ad, i) in promoAds"
              :key="i"
              :src="ad.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            <div class="car-link">
              <v-btn class="error" :to="'/ad/' + ad.id">
              {{ ad.title }}
              </v-btn>
            </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-row wrap>
        <v-col
          cols="12"
          md="4"
          sm="6"
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-card
            class="mx-auto"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.src"
            >
              <v-card-title>{{ad.title}}</v-card-title>
            </v-img>

            <v-card-text class="text--primary">
              <div>{{ad.description}}</div>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text :to="'/ad/' + ad.id">
              Open
            </v-btn>
           <app-buy-modal :ad="ad"></app-buy-modal>  
          </v-card-actions>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-center pt-5">
           <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 10px 15px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px 5px 0 0;
  }
</style>