<template>
  <div>
    <SearchInput v-model="query" />
    <SearchResults
      :results="results"
      @select-word="selectWord"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import SearchInput from './WordSearchInput.vue'
import SearchResults from './WordSearchResults.vue'

export default {
  name: 'WordSearch',
  components: {
    SearchInput,
    SearchResults
  },
  data() {
    return {
      query: null
    }
  },
  computed: {
    results() {
      return this.$store.state.results
    }
  },
  watch: {
    query(newVal) {
      if (newVal) {
        this.debouncedQueryResults(newVal)
      } else {
        this.$store.dispatch('clearResults')
      }
    }
  },
  methods: {
    debouncedQueryResults: debounce(function debouncedQueryResults(query) {
      this.$store.dispatch('fetchQueryResults', query)
    }, 500),
    selectWord(word) {
      this.$store.dispatch('getWord', word)
    }
  }
}
</script>

<style>
</style>
