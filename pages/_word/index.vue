<template>
  <WordDetail 
    :word="wordObj.word"
    :definitions="definitions"
    :audio="audio"
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
      const pronunciations = await store.dispatch('getWordPronunciations', word)

      return {
        wordObj,
        audio,
        definitions,
        pronunciations
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
</script>

<style>
</style>
