import Vuex from 'vuex'
const singleWordUrl = '/word'

const createStore = () => {
  return new Vuex.Store({
    state: {
      results: null
    },
    getters: {
      resultsWords: state => {
        const { results } = state

        if (results) {
          if (!!results.totalResults) {
            return results.searchResults.map(searchResult => searchResult.word)
          } else {
            return []
          }
        } else {
          return []
        }
      },
      wordFound: state => {
        const { results } = state

        if (results) {
          return !!results.totalResults
        } else {
          return false
        }
      }
    },
    mutations: {
      setQueryResults(state, val) {
        state.results = val
      }
    },
    actions: {
      async fetchQueryResults({ commit }, query) {
        try {
          const response = await this.$axios.$get(`/search?word=${query}`)

          commit('setQueryResults', response)
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordOfDay() {
        try {
          const wordOfDay = await this.$axios.$get(`/wordOfDay`)

          return wordOfDay
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWord({}, word) {
        try {
          const wordObj = await this.$axios.$get(`${singleWordUrl}/${word}`)

          return wordObj
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordAudio({}, word) {
        try {
          const audio = await this.$axios.$get(`${singleWordUrl}/${word}/audio`)

          return audio
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordExamples({}, word) {
        try {
          const examples = await this.$axios.$get(
            `${singleWordUrl}/${word}/examples`
          )

          return examples
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordDefinitions({}, word) {
        try {
          const definitions = await this.$axios.$get(
            `${singleWordUrl}/${word}/definitions`
          )

          return definitions
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWordPronunciations({}, word) {
        try {
          const pronunciations = await this.$axios.$get(
            `${singleWordUrl}/${word}/pronunciations`
          )

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
