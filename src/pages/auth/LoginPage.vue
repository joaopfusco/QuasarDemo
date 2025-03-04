<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
      <q-card-section class="flex justify-between">
        <q-card-title class="text-h6">Login</q-card-title>
        <ToggleTheme />
      </q-card-section>

      <q-form @submit.prevent="loginUser">
        <q-card-section>
          <q-input outlined v-model="username" label="Username" class="q-mb-md" />
          <q-input outlined v-model="password" label="Password" type="password" />
        </q-card-section>

        <q-card-actions class="full-width">
          <q-checkbox v-model="rememberMe" label="Remember me" align="left" />
          <q-btn flat label="Forgot password?" class="q-ml-auto" color="primary" />
        </q-card-actions>

        <q-card-section class="text-center">
          <q-btn color="primary" label="Login" type="submit" class="full-width" />
        </q-card-section>
      </q-form>

      <!-- <q-card-actions class="justify-center">
        <div>Don't have an account?</div>
        <q-btn flat label="Create an account" color="primary" @click="goToRegister" />
      </q-card-actions> -->
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleTheme from 'src/components/ToggleTheme.vue'
import { login } from 'src/utils/auth.js'
import { useQuasar } from 'quasar'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()
const $q = useQuasar()

// const goToRegister = () => {
//   router.push('/auth/register')
// }

const loginUser = async () => {
  const response = await login(username.value, password.value)
  $q.notify({
    type: response.success ? 'positive' : 'negative',
    message: response.message,
    position: 'bottom',
    timeout: 3000
  })

  if (response.success) {
    router.push('/')
  }
}
</script>
