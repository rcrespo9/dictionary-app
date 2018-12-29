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
    store.dispatch('getWord', params.word)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('getWord', to.params.word)
    })
  }
}
</script>

<style>
</style>
