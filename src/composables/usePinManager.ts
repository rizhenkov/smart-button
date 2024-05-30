import { useStorage } from '@vueuse/core'

const isPinModalOpen = ref(false)

export default function usePinManager () {
  const pin = useStorage('pin', '')

  const submitPin = () => {
    if (pin.value.length === 0) {
      return
    }
    isPinModalOpen.value = false
  }

  const openPinModal = () => {
    isPinModalOpen.value = true
  }

  return {
    pin,
    isPinModalOpen,
    submitPin,
    openPinModal
  }
}
