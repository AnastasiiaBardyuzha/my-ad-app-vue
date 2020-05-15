import * as fb from 'firebase';

class Ad {
  constructor (title, description, ownerId, src = '', promo = false, id = null) {
    this.title = title,
    this.description = description,
    this.ownerId = ownerId,
    this.src = src,
    this.promo = promo,
    this.id = id
  }
}

export default {
    state: {
      ads: [],
    },
    mutations: {
      createAd (state, payload) {
        state.ads.push(payload)
      },
      loadAds (state, payload) {
        state.ads = payload
      },
      udateAd (state, { title, description, id }) {
        const ad = state.ads.find(a => a.id === id);

        ad.title = title
        ad.description = description
      }
    },
    actions: {
      async createAd ({ commit, getters }, payload) {
        commit('clearError')
        commit('setLoading', true)

        const img = payload.img

        try{
          const newAd = new Ad(
            payload.title,
            payload.description, 
            getters.user.id,
           '', 
            payload.promo
          )

          const ad = await fb.database().ref('ads').push(newAd) 
          const imgExt = img.name.slice(img.name.lastIndexOf('.'))

          const fileData = await fb.storage().ref(`ads/${ad.key}.${imgExt}`).put(img)

          const src = await fileData.ref.getDownloadURL()

          await fb.database().ref('ads').child(ad.key).update({
            src
          })

          commit('setLoading', false)
          commit('createAd', {
            ...newAd,
            id: ad.key,
            src
          })      
        }
        catch(error){
          commit('setError', error.massege)
          commit('setLoading', false)
          throw error
        }
      },
      async fetchAds ({ commit }) {
        commit('clearError')
        commit('setLoading', true)
        const resultAds = []

        try {
          const fbVal = await fb.database().ref('ads').once('value')
          const ads = fbVal.val();

          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.src, ad.promo, key))
          })
          
          commit('loadAds', resultAds)
          commit('setLoading', false)
        }
        catch (error) {
          commit('setError', error.massege)
          commit('setLoading', false)
          throw error
        }
      },
      async udateAd ({ commit }, { title, description, id }) {
        commit('clearError')
        commit('setLoading', true)

        try {
          console.log(title,
            description, id)

          await fb.database().ref('ads').child(id).udate({
            title,
            description
          })
          commit ('udateAd', {
            title,
            description,
            id
          })
          commit('setLoading', false)
        }
        catch (error) {
          commit('setError', error.massege)
          commit('setLoading', false)
          throw error
        }
      }
    },
    getters: {
      ads (state) {
        return state.ads
      },
      promoAds (state) {
        return state.ads.filter(ad => ad.promo)
      },
      myAds (state, getters) {
        return state.ads.filter(ad => ad.ownerId === getters.user.id)
      },
      adById (state) {
        return adId => {
          return state.ads.find(ad => ad.id === adId) 
        }
      }
    }
}