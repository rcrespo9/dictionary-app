<template>
  <article>
    <header>
      <h1>{{ word }}</h1>
      <p v-if="pronunciations.length">{{ pronunciations[0].raw }}</p>
      <button 
        v-if="audio.length" 
        @click="playAudio(audio[0].fileUrl)">Play Audio</button>
    </header>
    <div v-if="note">
      <h2>Note</h2>
      <p>{{ note }}</p>
    </div>
    <div v-if="definitionGroups">
      <h2>Definitions for <em>{{ word }}</em></h2>
      <div 
        v-for="(definitionGroup, index) in definitionGroups" 
        :key="index">
        <h3>{{ definitionGroup.partOfSpeech }}</h3>
        <ol>
          <li 
            v-for="(definition, index) in definitionGroup.definitions" 
            :key="index" 
            v-html="definition"/>
        </ol>
      </div>
    </div>
    <div v-if="examples.length">
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
    </div>
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
      default: () => []
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
    },
    note: {
      type: String,
      default: ''
    }
  },
  computed: {
    definitionGroups() {
      if (!!!this.definitions.length) return false

      const definitionGroups = []

      this.definitions.forEach(definition => {
        const defGroupObj = {}
        const defGroupIndex = definitionGroups.findIndex(
          defGroup => defGroup.partOfSpeech === definition.partOfSpeech
        )

        if (defGroupIndex >= 0) {
          definitionGroups[defGroupIndex].definitions.push(definition.text)
        } else {
          defGroupObj.partOfSpeech = definition.partOfSpeech
          defGroupObj.definitions = []
          defGroupObj.definitions.push(definition.text)

          definitionGroups.push(defGroupObj)
        }
      })

      return definitionGroups
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
