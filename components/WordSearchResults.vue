<template>
  <ul v-if="results && showResults">
    <li
      v-for="(result, index) in results.searchResults"
      :key="index"
    >
      <nuxt-link :to="{ path: `${result.word}` }">
        {{ result.word }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Object,
      default: () => {}
    },
    showResults: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<style>
</style>
