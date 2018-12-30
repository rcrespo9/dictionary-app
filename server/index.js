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

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.get('/api/wordOfDay', async (req, res) => {
    console.log(apiKey)
    try {
      const response = await fetch(
        `${baseApiUrl}/words.json/wordOfTheDay?api_key=${apiKey}`
      )

      const wordOfDay = await response.json()

      res.json(wordOfDay)
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
