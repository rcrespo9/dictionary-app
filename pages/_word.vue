<template>
  <div/>
</template>

<script>
export default {
  name: 'Word',
  computed: {
    word() {
      return this.$route.params.word
    }
  },
  created() {
    this.$store.dispatch('getWord', this.word)
  }
}
</script>

<style>
</style>
