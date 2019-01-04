<template>
  <WordDetail 
    :word="wordObj.word"
    :definitions="definitions"
    :audio="audio"
    :examples="examples.examples"
    :pronunciations="pronunciations"
  />
</template>

<script>
import WordDetail from '~/components/WordDetail'

export default {
  name: 'Word',
  components: {
    WordDetail
  },
  async asyncData({ params, store }) {
    const { word } = params

    try {
      const wordObj = await store.dispatch('getWord', word)
      const audio = await store.dispatch('getWordAudio', word)
      const definitions = await store.dispatch('getWordDefinitions', word)
      const examples = await store.dispatch('getWordExamples', word)
      const pronunciations = await store.dispatch('getWordPronunciations', word)

      return {
        wordObj,
        audio,
        definitions,
        examples,
        pronunciations
      }
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
