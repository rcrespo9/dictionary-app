<template>
  <article>
    <header>
      <h1>{{ word }}</h1>
    </header>
    <h2>Definitions for <em>{{ word }}</em></h2>
  </article>
</template>

<script>
export default {
  name: 'WordDetail',
  props: {
    word: {
      type: String,
      required: true
    },
    definitions: {
      type: Array,
      required: true
    },
    audio: {
      type: Array,
      default: () => []
    },
    examples: {
      type: Array,
      default: () => []
    },
    pronunciations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
</style>
