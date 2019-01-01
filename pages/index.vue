<template>
  <div/>
</template>

<script>
export default {
  async asyncData({ store }) {
    try {
      await store.dispatch('getWordOfDay')
    } catch (error) {
      throw new Error(error)
    }
  },
  beforeRouteEnter(to, from, next) {
    const { word } = from.params

    next(vm => {
      if (word || vm.$store.state.results) {
        vm.$store.dispatch('clearResults')
      }
    })
  }
}
</script>

<style>
</style>
