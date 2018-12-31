import axios from 'axios'
require('isomorphic-fetch')

const baseUrl = '/api'

export default {
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
  }
}
