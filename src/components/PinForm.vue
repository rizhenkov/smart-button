<script setup lang="ts">
const { pin, submitPin } = usePinManager()
</script>

<template>
  <UForm
    @submit="submitPin"
  >
    <UInput
      v-model="pin"
      type="password"
      class="mt-4 mx-auto max-w-32"
      size="xl"
      autofocus
      data-1p-ignore
      aria-autocomplete="none"
      autocomplete="none"
      inputmode="numeric"
    />
  </UForm>
</template>

<style scoped lang="scss">

</style>
