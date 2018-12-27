<template>
  <WordSearch />
</template>

<script>
import WordSearch from '~/components/WordSearch.vue'

export default {
  components: {
    WordSearch
  },
  created() {
    this.$store.dispatch('getWordOfDay')
  }
}
</script>

<style>
</style>
