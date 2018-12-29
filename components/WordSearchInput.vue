<template>
  <input
    :value="value"
    type="text"
    @input="onInput"
  >
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$emit('update-input-length')
    }
  }
}
</script>
