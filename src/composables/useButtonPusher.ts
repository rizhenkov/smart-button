import { useStorage } from '@vueuse/core'
import { FetchError } from 'ofetch'

const loading = ref(false)
export default function useButtonPusher () {
  const toast = useToast()
  const { vibrate, isSupported: isVibrateSupported } = useVibrate({ pattern: [10, 30] })
  const pin = useStorage('pin', '')

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
    } catch (e: unknown) {
      console.error(e)
      if (e instanceof FetchError && e.data && e.data.statusCode === 401) {
        toast.add({
          title: 'Error',
          description: e.data.statusMessage || 'Unknown access error',
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

  return {
    loading,
    pushButton
  }
}
