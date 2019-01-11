<template>
  <WordDetail 
    :word="wordOfDay.word" 
    :definitions="wordOfDay.definitions"
    :examples="wordOfDay.examples"
    :audio="audio"
    :pronunciations="pronunciations"
    :note="wordOfDay.note"
  />
</template>

<script>
import WordDetail from '~/components/WordDetail'

export default {
  components: {
    WordDetail
  },
  async asyncData({ store }) {
    try {
      const wordOfDay = await store.dispatch('getWordOfDay')
      const { word } = wordOfDay

      const audio = await store.dispatch('getWordAudio', word)
      const pronunciations = await store.dispatch('getWordPronunciations', word)

      return {
        wordOfDay,
        audio,
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
