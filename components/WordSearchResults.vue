<template>
  <ul v-if="results">
    <li
      v-for="(result, index) in results.searchResults"
      :key="index"
      @click="selectWord(result.word)"
    ><nuxt-link :to="{ path: `${result.word}` }">{{ result.word }}</nuxt-link></li>
  </ul>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    selectWord(word) {
      this.$emit('select-word', word)
    }
  }
}
</script>

<style>
</style>
