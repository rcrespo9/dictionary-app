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
  async asyncData({ params, store, error }) {
    try {
      store.dispatch('getWord', params.word)
    } catch {
      throw new Error(error)
    }
  },
  beforeRouteEnter(to, from, next) {
    const { word } = to.params

    next(vm => {
      if (!vm.$store.state.results) {
        vm.$store.dispatch('fetchQueryResults', word)
      }

      vm.$store.dispatch('getWord', word)
    })
  }
}
</script>

<style>
</style>
