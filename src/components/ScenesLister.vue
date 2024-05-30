<script setup lang="ts">
import type { Ref } from 'vue'
import useScenesFetcher, { type SmartScene } from '~/composables/useScenesFetcher'

const isModalOpen = defineModel({
  type: Boolean,
  default: false
})
const scenesFetcher = useScenesFetcher()
const toast = useToast()

const apiKey = ref('')
const scenesList: Ref<SmartScene[]> = ref([])
const isFetching = ref(false)

const onSubmit = async () => {
  isFetching.value = true
  scenesFetcher.fetchScenes(apiKey.value)
    .then((resp) => {
      console.log(resp)
      scenesList.value = resp.items
    }).catch((err) => {
      console.error(err)
      toast.add({
        title: 'Error',
        description: 'Failed to list scenes',
        color: 'red'
      })
    })
    .finally(() => {
      isFetching.value = false
    })
}
</script>

<template>
  <UModal
    v-model="isModalOpen"
    :ui="{
      container: 'flex min-h-full items-center justify-center text-center'
    }"
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <div>
        <div class="text-center mb-5">
          <h2 class="text-xl">
            {{ $t('scenesLister') }}
          </h2>
        </div>

        <div>
          <i18n-t
            keypath="listScenesDescription"
            tag="p"
          >
            <strong>List scenes</strong>
          </i18n-t>
          <UForm
            class="mt-3"
            @submit="onSubmit"
          >
            <UFormGroup
              :label="$t('apiKeyInputLabel')"
              name="key"
            >
              <UInput v-model="apiKey" />
            </UFormGroup>

            <UButton
              class="mt-3"
              type="submit"
              :loading="isFetching"
            >
              {{ $t('requestScenesButton') }}
            </UButton>
          </UForm>
        </div>
        <div>
          <div v-if="scenesList.length > 0">
            <div class="mt-3">
              <p>
                {{ $t('scenesList') }}
              </p>
              <ul class="grid gap-3">
                <li
                  v-for="scene in scenesList"
                  :key="scene.sceneId"
                >
                  {{ scene.sceneName }}:
                  <br>
                  <code>{{ scene.sceneId }}</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<style scoped lang="scss">

</style>
