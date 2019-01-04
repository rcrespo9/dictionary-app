<template>
  <article>
    <header>
      <h1>{{ word }}</h1>
      <p>{{ pronunciations[0].raw }}</p>
    </header>
    <h2>Definitions for <em>{{ word }}</em></h2>
    <ol>
      <li 
        v-for="definition in definitions" 
        :key="definition.sequence">{{ definition.text }}</li>
    </ol>
    <h2>Examples</h2>
    <blockquote 
      v-for="example in examples" 
      :key="example.exampleId"
      :cite="example.url"
    >
      <p>{{ example.text }}</p>
      <footer>
        <cite>{{ example.title }}</cite>
      </footer>
    </blockquote>
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
  },
  methods: {
    playAudio(audioUrl) {
      const audio = new Audio(audioUrl)

      audio.play()
    }
  }
}
</script>

<style>
</style>
