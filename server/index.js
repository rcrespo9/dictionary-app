const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

require('isomorphic-fetch')

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const baseApiUrl = 'https://api.wordnik.com/v4'
  const apiKey = process.env.WORDNIK_API_KEY
  const allWords = `${baseApiUrl}/words.json`
  const singleWord = `${baseApiUrl}/word.json`

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.get('/api/search', async (req, res) => {
    try {
      const query = req.query.word

      const response = await fetch(
        `${allWords}/search/${query}?api_key=${apiKey}`
      )
      const results = await response.json()

      res.json(results)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/wordOfDay', async (req, res) => {
    try {
      const response = await fetch(`${allWords}/wordOfTheDay?api_key=${apiKey}`)
      const wordOfDay = await response.json()

      res.json(wordOfDay)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/word/:word', async (req, res) => {
    try {
      const word = req.params.word
      const response = await fetch(`${singleWord}/${word}?api_key=${apiKey}`)
      const wordObj = await response.json()

      res.json(wordObj)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/word/:word/examples', async (req, res) => {
    try {
      const word = req.params.word
      const response = await fetch(`
        ${singleWord}/${word}/examples?api_key=${apiKey}
      `)
      const examples = await response.json()

      res.json(examples)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/word/:word/definitions', async (req, res) => {
    try {
      const word = req.params.word
      const response = await fetch(`
        ${singleWord}/${word}/definitions?api_key=${apiKey}
      `)
      const definitions = await response.json()

      res.json(definitions)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/word/:word/audio', async (req, res) => {
    try {
      const word = req.params.word
      const response = await fetch(`
        ${singleWord}/${word}/audio?api_key=${apiKey}
      `)
      const audio = await response.json()

      res.json(audio)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/word/:word/pronunciations', async (req, res) => {
    try {
      const word = req.params.word
      const response = await fetch(`
        ${singleWord}/${word}/pronunciations?api_key=${apiKey}
      `)
      const pronunciations = await response.json()

      res.json(pronunciations)
    } catch (error) {
      throw new Error(error)
    }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
