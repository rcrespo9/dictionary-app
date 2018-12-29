import Vuex from 'vuex'
import WordnikApi from '~/assets/WordnikApi'

const createStore = () => {
  return new Vuex.Store({
    state: {
      selectedWord: null,
      results: null
    },
    getters: {
      wordFound: state => {
        const { results } = state

        if (results) {
          return !!results.totalResults
        }
      }
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
      async fetchQueryResults({ commit }, query) {
        try {
          commit('setQueryResults', await WordnikApi.fetchQueryResults(query))
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
