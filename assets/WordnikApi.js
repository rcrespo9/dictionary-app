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
  }
}
