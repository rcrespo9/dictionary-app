import Vuex from 'vuex'
import WordnikApi from '~/assets/WordnikApi'
const singleWordUrl = '/word'

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
        } else {
          return null
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
          const response = await this.$axios.$get(`${singleWordUrl}/${word}`)
          const wordObj = await response.data

          commit('setSelectedWord', word)
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordAudio(word) {
        try {
          const response = await this.$axios.$get(
            `${singleWordUrl}/${word}/audio`
          )
          const audio = await response.data

          return audio
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordExamples(word) {
        try {
          const response = await this.$axios.$get(
            `${singleWordUrl}/${word}/examples`
          )
          const examples = await response.data

          return examples
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordDefinitions(word) {
        try {
          const response = await this.$axios.$get(
            `${singleWordUrl}/${word}/definitions`
          )
          const definitions = await response.data

          return definitions
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordPronunciations(word) {
        try {
          const response = await this.$axios.$get(
            `${singleWordUrl}/${word}/pronunciations`
          )
          const pronunciations = await response.data

          return pronunciations
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
