export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()

  const apiToken = runtimeConfig.smartThingsApiToken
  const sceneId = runtimeConfig.smartThingsSceneId

  const isConfigured = !!(apiToken && sceneId && apiToken.length > 0 && sceneId.length > 0)
  return {
    status: 'success',
    isConfigured
  }
})
