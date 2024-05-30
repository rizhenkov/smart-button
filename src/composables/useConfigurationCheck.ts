export default function useConfigurationCheck () {
  const checkLoading = ref(false)

  const checkConfiguration = async () => {
    checkLoading.value = true
    const result = await $fetch('/api/check', {
      method: 'GET'
    })
      .finally(() => {
        checkLoading.value = false
      })
    return result.isConfigured
  }

  return {
    checkLoading,
    checkConfiguration
  }
}
