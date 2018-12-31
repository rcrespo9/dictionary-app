import axios from 'axios'
require('isomorphic-fetch')

const baseUrl = '/api'
const baseUrlSingleWord = `${baseUrl}/word`

export default {
  async apiCall(callback) {
    try {
      const response = await callback
      const { data } = response

      return data
    } catch (error) {
      throw new Error(error)
    }
  },
  async fetchQueryResults(query) {
    try {
      const response = await fetch(`${baseUrl}/search?word=${query}`)

      const results = await response.json()

      return results
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordOfDay() {
    try {
      const response = await axios.get(`${baseUrl}/wordOfDay`)

      const wordOfDay = await response.data
      const { word } = wordOfDay
      const wordAudio = await this.getWordAudio(word)
      const wordPronunciations = await this.getWordPronunciations(word)

      wordOfDay.audio = wordAudio
      wordOfDay.pronunciations = wordPronunciations

      return wordOfDay
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWord(word) {
    try {
      const response = await fetch(`${baseUrlSingleWord}/${word}`)

      const wordObj = await response.json()
      const definitions = await this.getWordDefs(word)
      const audio = await this.getWordAudio(word)
      const examples = await this.getWordExamples(word)
      const pronunciations = await this.getWordPronunciations(word)

      wordObj.definitions = definitions
      wordObj.audio = audio
      wordObj.examples = examples.examples
      wordObj.pronunciations = pronunciations

      return wordObj
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordExamples(word) {
    try {
      const response = await fetch(`${baseUrlSingleWord}/${word}/examples`)

      const examples = await response.json()

      return examples
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordDefs(word) {
    try {
      const response = await fetch(`${baseUrlSingleWord}/${word}/definitions`)

      const definitions = await response.json()

      return definitions
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordAudio(word) {
    try {
      const response = await fetch(`${baseUrlSingleWord}/${word}/audio`)

      const audio = await response.json()

      return audio
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordPronunciations(word) {
    try {
      const response = await fetch(
        `${baseUrlSingleWord}/${word}/pronunciations`
      )

      const pronunciations = await response.json()

      return pronunciations
    } catch (error) {
      throw new Error(error)
    }
  }
}
