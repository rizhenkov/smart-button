<script setup lang="ts">
import useConfigurationCheck from '~/composables/useConfigurationCheck'

const { checkConfiguration, checkLoading } = useConfigurationCheck()

const scenesListerShown = ref(false)

const checkAgain = async () => {
  if (await checkConfiguration()) {
    window.location.href = '/'
  }
}
</script>

<template>
  <div class="p-10">
    <UCard>
      <template #header>
        {{ $t('finishConfigurationAskTitle') }}
      </template>

      <div>
        <p>
          {{ $t('finishConfigurationAskDescription') }}
        </p>
        <p class="mt-3">
          {{ $t('finishConfigurationInstruction') }}
        </p>

        <table class="mt-3 vars-table">
          <tr>
            <td>NUXT_SMART_THINGS_API_TOKEN</td>
            <td>
              <i18n-t
                keypath="tokenGenerateTip"
                tag="p"
              >
                <ULink
                  to="https://account.smartthings.com/tokens/new"
                  inactive-class="text-primary-500 dark:text-primary-400 hover:text-gray-700 dark:hover:text-gray-200"
                  target="_blank"
                >
                  https://account.smartthings.com/tokens/new
                </ULink>
              </i18n-t>

              <br>
              <i18n-t
                keypath="tokenPermissionTip"
                tag="p"
              >
                <strong>"Control this scene"</strong>
              </i18n-t>
            </td>
          </tr>
          <tr>
            <td>NUXT_SMART_THINGS_SCENE_ID</td>
            <td>
              {{ $t('sceneIdDescription') }}

              <UButton @click="scenesListerShown = true">
                {{ $t('sceneIdHowGetButton') }}
              </UButton>

              <ScenesLister v-model="scenesListerShown" />
            </td>
          </tr>
          <tr>
            <td>NUXT_PIN_CODE</td>
            <td>{{ $t('pinTableDescription') }}</td>
          </tr>
        </table>

        <p class="mt-3">
          {{ $t('vercelTip') }}
          <br>
          {{ $t('rebuildTip') }}
        </p>
      </div>

      <template #footer>
        <UButton
          :loading="checkLoading"
          :label="$t('checkConfigurationButton')"
          @click="checkAgain"
        />
      </template>
    </UCard>

    <UAlert
      v-if="!checkLoading"
      class="mt-5"
      :title="$t('configRequiredAlertTitle')"
      :description="$t('configRequiredAlertDescription')"
    />
  </div>
</template>

<style scoped lang="scss">
.vars-table td {
  @apply text-sm p-3 border;
}
</style>
