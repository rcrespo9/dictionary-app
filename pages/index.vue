<template>
  <div/>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getWordOfDay')
  }
}
</script>

<style>
</style>
