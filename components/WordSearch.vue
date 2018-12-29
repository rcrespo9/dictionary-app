<template>
  <div>
    <SearchInput
      ref="searchInput"
      v-model="query"
      @update-input-length="updateInputLen"
    />
    <SearchResults
      :results="results"
      :show-results="showResults"
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
      searchInputEl: null,
      searchInputLen: 0,
      showResults: false
    }
  },
  computed: {
    results() {
      return this.$store.state.results
    }
  },
  watch: {
    query(newVal) {
      this.debouncedQueryResults(newVal)
    },
    $route() {
      this.resetInput()
    },
    searchInputLen(newVal) {
      this.showResults = !!newVal
    }
  },
  mounted() {
    this.searchInputEl = this.$refs.searchInput.$el
  },
  methods: {
    debouncedQueryResults: debounce(function debouncedQueryResults(query) {
      if (query) {
        this.$store.dispatch('fetchQueryResults', query)
      } else {
        this.$store.dispatch('clearResults')
      }
    }, 500),
    updateInputLen() {
      this.searchInputLen = this.searchInputEl.value.length
    },
    resetInput() {
      this.searchInputEl.value = ``
      this.searchInputLen = this.searchInputEl.value.length
    }
  }
}
</script>

<style>
</style>
