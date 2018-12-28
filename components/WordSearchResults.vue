<template>
  <ul v-if="results">
    <li
      v-for="(result, index) in results.searchResults"
      :key="index"
    >
      <nuxt-link 
        :to="{ path: `${result.word}` }"
        @click.native="clearResults"
      >
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
    }
  },
  methods: {
    clearResults() {
      this.$store.dispatch('clearResults')
    }
  }
}
</script>

<style>
</style>
