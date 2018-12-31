<template>
  <div/>
</template>

<script>
export default {
  async asyncData({ $axios, store }) {
    try {
      const wordOfDayRes = await $axios.get(`/wordOfDay`)
      const wordOfDay = await wordOfDayRes.data
      const { word } = wordOfDay

      const wordAudioRes = await $axios.get(`/word/${word}/audio`)
      const wordAudio = await wordAudioRes.data
      wordOfDay.audio = wordAudio

      const wordPronunciationsRes = await $axios.get(
        `/word/${word}/pronunciations`
      )
      const wordPronunciations = await wordPronunciationsRes.data
      wordOfDay.pronunciations = wordPronunciations

      store.dispatch('getWord', wordOfDay)
    } catch (error) {
      throw new Error(error)
    }
  }
}
</script>

<style>
</style>
