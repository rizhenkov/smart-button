export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const additionalTime = runtimeConfig.additionalPushPause || 0

  const body = await readBody(event)

  const pinEntered = body.pin || ''
  if (pinEntered !== String(runtimeConfig.pinCode)) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, additionalTime)
    })

    throw createError({ statusCode: 401, statusMessage: 'Invalid PIN' })
  }

  const apiUrl = runtimeConfig.smartThingsApiUrl || 'https://api.smartthings.com/v1'
  const apiToken = runtimeConfig.smartThingsApiToken
  const sceneId = runtimeConfig.smartThingsSceneId
  await $fetch(`${apiUrl}/v1/scenes/${sceneId}/execute`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  })
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, additionalTime)
  })

  return {
    status: 'success'
  }
})
