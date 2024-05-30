<script setup lang="ts">
const isPinModalOpen = defineModel({
  type: Boolean,
  default: false
})
</script>

<template>
  <UModal
    v-model="isPinModalOpen"
    prevent-close
    :ui="{
      container: 'flex min-h-full items-center justify-center text-center'
    }"
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <div class="py-12">
        <div class="text-center">
          {{ $t('askPin') }}
        </div>

        <slot />
      </div>

      <template #footer>
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>

<style scoped lang="scss">

</style>
