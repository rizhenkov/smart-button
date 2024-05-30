<script setup lang="ts">
const { loading } = useButtonPusher()
const { pin, submitPin } = usePinManager()
</script>

<template>
  <UButton
    class="w-full justify-center"
    :loading="loading"
    :disabled="pin.length === 0"
    :label="$t('savePinButton')"
    size="xl"
    @click="submitPin"
  />
</template>

<style scoped lang="scss">

</style>
