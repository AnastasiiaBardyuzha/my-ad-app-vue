import * as fb from 'firebase';

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name,
    this.phone = phone,
    this.adId = adId,
    this.done = done,
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  getters: {
    orders (state, getters) {
      return [...getters.unDoneOreders, ...getters.doneOrders]
    },
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    unDoneOreders (state) {
      return state.orders.filter(order => !order.done)
    }
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = (payload)
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId);
      commit('clearError')

      try{
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
        commit('setLoading', false)
      }
      catch(error) {
        commit('setError', error.massege)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')
      const resultOrders = []


      try{
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.done, key)
            )
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      }
      catch(error) {
        commit('setError', error.massege)
        commit('setLoading', false)
        throw error
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      }
      catch (error) {
        commit('setError', error.massege)
        throw error
      }
    }
  }
}