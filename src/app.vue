<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const toast = useToast()
const { vibrate, isSupported: isVibrateSupported } = useVibrate({ pattern: [10, 30] })
const { isInstallable, promptInstall } = useInstallPrompt()
const pin = useStorage('pin', '')
const isPinModalOpen = ref(false)

const loading = ref(false)
const pushButton = async () => {
  loading.value = true
  if (isVibrateSupported.value) {
    vibrate()
  }
  try {
    await $fetch('/api/push', {
      method: 'POST',
      body: JSON.stringify({
        pin: pin.value
      })
    })

    if (isInstallable.value) {
      promptInstall()
    }
  } catch (e: unknown) {
    console.error(e)
    if (e.data && e.data.statusCode === 401) {
      toast.add({
        title: 'Error',
        description: 'Invalid pin',
        color: 'red'
      })
      pin.value = ''
    } else {
      toast.add({
        title: 'Error',
        description: 'Failed to push the button',
        color: 'red'
      })
    }
  } finally {
    loading.value = false
  }
}

watch(pin, (value) => {
  if (value.length === 0) {
    isPinModalOpen.value = true
  }
}, {
  immediate: true
})

const submitPin = () => {
  if (pin.value.length === 0) {
    return
  }
  isPinModalOpen.value = false
}
</script>
<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
          <div
            v-if="loading"
            class="absolute top-0 bottom-0 left-0 right-0 flex justify-stretch items-stretch -z-10"
          >
            <div class="lds-ring w-full h-full">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
      <ClientOnly>
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
                Please enter your PIN to use the Smart button
              </div>

              <UForm
                autocomplete="off"
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
                  autocomplete="off"
                  inputmode="numeric"
                />
              </UForm>
            </div>

            <template #footer>
              <UButton
                class="w-full justify-center"
                :loading="loading"
                :disabled="pin.length === 0"
                label="Save PIN"
                size="xl"
                @click="submitPin"
              />
            </template>
          </UCard>
        </UModal>
      </ClientOnly>
    </UContainer>
    <UNotifications />
  </div>
</template>
<style lang="scss">
.lds-ring {
  display: inline-block;
  position: relative;
  transform: scale(1.2);

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
    height: 100%;
    margin: 0;
    border-width: 12px;
    border-style: solid;
    border-radius: 50%;
    animation: lds-ring 1.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgba(255, 255, 255, 0.66) transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
