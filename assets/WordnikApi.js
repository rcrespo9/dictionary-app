require('isomorphic-fetch')

const baseUrl = 'https://api.wordnik.com/v4'
const apiKey = process.env.apiKey

export default {
  async fetchQueryResults(query) {
    try {
      const response = await fetch(
        `${baseUrl}/words.json/search/${query}?allowRegex=false&caseSensitive=true&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=10&api_key=${apiKey}`
      )

      const results = await response.json()

      return results
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWord(word) {
    try {
      const response = await fetch(
        `${baseUrl}/word.json/${word}?api_key=${apiKey}`
      )

      const wordObj = await response.json()
      const definitions = await this.getWordDefs(word)
      const audio = await this.getWordAudio(word)
      const examples = await this.getWordExamples(word)

      wordObj.definitions = definitions
      wordObj.audio = audio
      wordObj.examples = examples.examples

      return wordObj
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordExamples(word) {
    try {
      const response = await fetch(
        `${baseUrl}/word.json/${word}/examples?api_key=${apiKey}`
      )

      const examples = await response.json()

      return examples
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordDefs(word) {
    try {
      const response = await fetch(
        `${baseUrl}/word.json/${word}/definitions?api_key=${apiKey}`
      )

      const definitions = await response.json()

      return definitions
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordAudio(word) {
    try {
      const response = await fetch(
        `${baseUrl}/word.json/${word}/audio?api_key=${apiKey}`
      )

      const audio = await response.json()

      return audio
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWordOfDay() {
    try {
      const response = await fetch(
        `${baseUrl}/words.json/wordOfTheDay?api_key=${apiKey}`
      )

      const wordOfDay = await response.json()
      const wordAudio = await this.getWordAudio(wordOfDay.word)

      wordOfDay.audio = wordAudio

      return wordOfDay
    } catch (error) {
      throw new Error(error)
    }
  }
}
