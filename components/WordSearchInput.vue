<template>
  <input
    :value="value"
    type="text"
    @input="$emit('input', $event.target.value)"
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
  }
}
</script>
