<script setup lang="ts">

const { t } = useI18n()

useSeoMeta({
  title: t('appName')
})

const { isPinModalOpen, pin, openPinModal } = usePinManager()

const { loading, pushButton } = useButtonPusher()

const { checkConfiguration } = useConfigurationCheck()

watch(pin, (value) => {
  if (value.length === 0) {
    openPinModal()
  }
}, {
  immediate: true
})

onMounted(() => {
  checkConfiguration().then(async (isConfigured) => {
    if (!isConfigured) {
      await navigateTo('/setup')
    }
  })
})
</script>

<template>
  <div>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="flex justify-end p-5 absolute top-0 right-0">
        <UButton
          icon="i-heroicons-key"
          size="xs"
          variant="soft"
          @click="openPinModal"
        />
      </div>
      <UContainer>
        <div class="flex justify-center items-center">
          <div class=" relative">
            <UButton
              icon="i-heroicons-power"
              square
              size="xl"
              class="rounded-full active:bg-green-500 dark:active:bg-green-600"
              :disabled="loading"
              type="button"
              @click="pushButton"
            />
            <LoadingRing
              v-if="loading"
            />
          </div>
        </div>
        <ClientOnly>
          <PinModal
            v-model="isPinModalOpen"
          >
            <PinForm />

            <template #footer>
              <SavePinButton />
            </template>
          </PinModal>
        </ClientOnly>
      </UContainer>
    </div>
  </div>
</template>

<style lang="scss">

</style>
