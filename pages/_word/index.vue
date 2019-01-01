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
  async asyncData({ params, store }) {
    const { word } = params

    try {
      await store.dispatch('getWord', word)
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
