<template>
  <WordDetail :word="selectedWord.word" />
</template>

<script>
import WordDetail from '~/components/WordDetail'

export default {
  name: 'Word',
  components: {
    WordDetail
  },
  computed: {
    word() {
      return this.$route.params.word
    },
    selectedWord() {
      return this.$store.state.selectedWord
    }
  },
  created() {
    this.$store.dispatch('getWord', this.word)
  }
}
</script>

<style>
</style>
