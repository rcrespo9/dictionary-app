<template>
  <div>
    <v-autocomplete
      :search-input.sync="query"
      :items="results"
      placeholder="Start typing to find a word"
      hide-no-data
      flat
      solo-inverted
      prepend-icon="search"
    />
    <!-- <SearchInput
      ref="searchInput"
      v-model="query"
      @update-input-length="updateInputLen"
    />
    <SearchResults
      :results="results"
      :show-results="showResults"
      :word-found="wordFound"
    /> -->
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
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
    },
    ...mapGetters(['wordFound'])
  },
  watch: {
    query(newVal) {
      this.debouncedQueryResults(newVal)
    },
    $route() {
      this.resetSearch()
    },
    searchInputLen(newVal) {
      this.showResults = !!newVal
    }
  },
  // mounted() {
  //   this.searchInputEl = this.$refs.searchInput.$el
  // },
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
    resetSearch() {
      this.searchInputEl.value = ``
      this.searchInputLen = 0
    }
  }
}
</script>

<style>
</style>
