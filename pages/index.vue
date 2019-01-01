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
  }
}
</script>

<style>
</style>
