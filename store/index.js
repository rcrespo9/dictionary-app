import Vuex from 'vuex'
import WordnikApi from '~/assets/WordnikApi'

const createStore = () => {
  return new Vuex.Store({
    state: {
      selectedWord: null,
      results: null
    },
    mutations: {
      setSelectedWord(state, val) {
        state.selectedWord = val
      },
      setQueryResults(state, val) {
        state.results = val
      }
    },
    actions: {
      async fetchQueryResults({ commit, dispatch }, query) {
        try {
          const queryResults = await WordnikApi.fetchQueryResults(query)

          if (queryResults.totalResults > 0) {
            commit('setQueryResults', queryResults)
          } else {
            dispatch('clearResults')
          }
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWord({ commit }, word) {
        try {
          commit('setSelectedWord', await WordnikApi.getWord(word))
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordOfDay({ commit }) {
        try {
          commit('setSelectedWord', await WordnikApi.getWordOfDay())
        } catch (error) {
          throw new Error(error)
        }
      },
      clearResults({ commit }) {
        commit('setQueryResults', null)
      }
    }
  })
}

export default createStore
