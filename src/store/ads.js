export default {
    state: {
      ads: [
        {
          title: 'First Ad',
          discription: 'agfde`gds',
          promo: false,
          id: '123',
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          title: 'Second Ad',
          discription: 'agfde`gds',
          promo: true,
          id: '234',
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        }, 
        {
          title: 'Third Ad',
          discription: 'agfde`gds',
          promo: true,
          id: '345',
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    },
    mutations: {
      createAd (state, payload) {
        state.ads.push(payload)
      }
    },
    actions: {
      createAd ({ commit }, payload) {
        payload.id = 'dsjfnldkfjnglskjdngfl'

        commit('createAd', payload)
      }

    },
    getters: {
      ads (state) {
        return state.ads
      },
      promoAds (state) {
        return state.ads.filter(ad => ad.promo)
      },
      myAds (state) {
        return state.ads
      },
      adById (state) {
        return adId => {
          return state.ads.find(ad => ad.id === adId) 
        }
      }
    }
}