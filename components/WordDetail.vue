<template>
  <h2>{{ word }}</h2>
</template>

<script>
export default {
  name: 'WordDetail',
  props: {
    word: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
