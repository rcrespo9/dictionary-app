<template>
  <!-- <WordDetail :word="wordObj.word" /> -->
  <div/>
</template>

<script>
import WordDetail from '~/components/WordDetail'

export default {
  name: 'Word',
  components: {
    WordDetail
  },
  async asyncData({ $axios, params, store, error }) {
    const baseUrl = '/word'
    const { word } = params

    try {
      const wordRes = await $axios.get(`${baseUrl}/${word}`)
      const wordObj = await wordRes.data

      const wordAudioRes = await $axios.get(`${baseUrl}/${word}/audio`)
      const wordAudio = await wordAudioRes.data
      wordObj.audio = wordAudio

      const wordPronunciationsRes = await $axios.get(
        `${baseUrl}/${word}/pronunciations`
      )
      const wordPronunciations = await wordPronunciationsRes.data
      wordObj.pronunciations = wordPronunciations

      const wordExamplesRes = await $axios.get(`${baseUrl}/${word}/examples`)
      const wordExamples = await wordExamplesRes.data
      wordObj.examples = wordExamples.examples

      const wordDefinitionsRes = await $axios.get(
        `${baseUrl}/${word}/definitions`
      )
      const wordDefinitions = await wordDefinitionsRes.data
      wordObj.definitions = wordDefinitions

      store.dispatch('getWord', wordObj)
    } catch (error) {
      throw new Error(error)
    }
  },
  beforeRouteEnter(to, from, next) {
    const { word } = to.params

    next(vm => {
      if (!vm.$store.state.results) {
        vm.$store.dispatch('fetchQueryResults', word)
      }
    })
  }
}
</script>

<style>
</style>
