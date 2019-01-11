<template>
  <v-autocomplete
    v-model="selectedWord"
    :search-input.sync="query"
    :items="resultsWords"
    placeholder="Start typing to find a word"
    hide-no-data
    flat
    solo-inverted
    append-icon="search"
  />
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'WordSearch',
  data: () => ({
    query: null,
    selectedWord: ''
  }),
  computed: {
    ...mapGetters(['wordFound', 'resultsWords'])
  },
  watch: {
    query(newVal) {
      this.debouncedQueryResults(newVal)
    },
    selectedWord(word) {
      this.$router.push({ path: word })
    },
    $route() {
      this.selectedWord = ''
    }
  },
  methods: {
    debouncedQueryResults: debounce(function debouncedQueryResults(query) {
      if (query) {
        this.$store.dispatch('fetchQueryResults', query)
      } else {
        this.$store.dispatch('clearResults')
      }
    }, 500)
  }
}
</script>

<style>
</style>
