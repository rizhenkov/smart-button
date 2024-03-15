import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useInstallPrompt () {
  const deferredPrompt: Ref<BeforeInstallPromptEvent | null> = ref(null)
  const isInstallable = ref(false)

  const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault()
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e
    isInstallable.value = true
  }

  const promptInstall = () => {
    // Show the prompt
    if (deferredPrompt.value) {
      deferredPrompt.value.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.value.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        deferredPrompt.value = null
        isInstallable.value = false
      })
    }
  }

  onMounted(() => {
    // @ts-ignore
    window.addEventListener('beforeinstallprompt', beforeInstallPrompt)
  })

  onUnmounted(() => {
    // @ts-ignore
    window.removeEventListener('beforeinstallprompt', beforeInstallPrompt)
  })

  return { isInstallable, promptInstall }
}
