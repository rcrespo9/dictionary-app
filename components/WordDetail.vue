<template>
  <h1>{{ word }}</h1>
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
