<template>
  <div/>
</template>

<script>
export default {
  async asyncData({ $axios, store }) {
    try {
      const wordOfDayRes = await $axios.get(`/api/wordOfDay`)
      const wordOfDay = await wordOfDayRes.data
      const { word } = wordOfDay

      const wordAudioRes = await $axios.get(`/api/word/${word}/audio`)
      const wordAudio = await wordAudioRes.data

      const wordPronunciationsRes = await $axios.get(
        `/api/word/${word}/pronunciations`
      )
      const wordPronunciations = await wordPronunciationsRes.data

      wordOfDay.audio = wordAudio
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
