<template>
  <div>
    <SearchInput
      ref="searchInput"
      v-model="query" 
    />
    <SearchResults
      :results="results"
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
      query: null,
      searchInputEl: null
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
    },
    $route() {
      this.searchInputEl.value = ``
      this.$store.dispatch('clearResults')
    }
  },
  mounted() {
    this.searchInputEl = this.$refs.searchInput.$el
  },
  methods: {
    debouncedQueryResults: debounce(function debouncedQueryResults(query) {
      this.$store.dispatch('fetchQueryResults', query)
    }, 500)
  }
}
</script>

<style>
</style>
