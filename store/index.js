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
      async getWordOfDay({ dispatch, commit }) {
        try {
          const wordOfDay = await this.$axios.$get(`/wordOfDay`)
          const { word } = wordOfDay

          const audio = await dispatch('getWordAudio', wordOfDay.word)
          wordOfDay.audio = audio

          const pronunciations = await dispatch('getWordPronunciations', word)
          wordOfDay.pronunciations = pronunciations

          commit('setSelectedWord', wordOfDay)
        } catch (error) {
          throw new Error(error)
        }
      },
      async getWord({ commit, dispatch }, word) {
        try {
          const wordObj = await this.$axios.$get(`${singleWordUrl}/${word}`)

          const audio = await dispatch('getWordAudio', word)
          wordObj.audio = audio

          const examples = await dispatch('getWordExamples', word)
          wordObj.examples = examples

          const definitions = await dispatch('getWordDefinitions', word)
          wordObj.definitions = definitions

          const pronunciations = await dispatch('getWordPronunciations', word)
          wordObj.pronunciations = pronunciations

          commit('setSelectedWord', wordObj)
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
