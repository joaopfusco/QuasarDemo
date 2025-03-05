<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="max-width: 400px; width: 100%;">
      <q-card-section class="flex justify-between">
        <q-card-title class="text-h6">Register</q-card-title>
        <ToggleTheme />
      </q-card-section>

      <q-form @submit.prevent="registerUser">
        <q-card-section>
          <q-input
            outlined
            v-model="username"
            label="Username"
            class="q-mb-md"
            :rules="[val => val && val.length > 0 || 'Username is required']"
          />
          <q-input
            outlined
            v-model="password"
            label="Password"
            type="password"
            class="q-mb-md"
            :rules="[val => val && val.length > 0 || 'Password is required']"
          />
          <q-input
            outlined
            v-model="password2"
            label="Confirm Password"
            type="password"
            :rules="[val => val && val.length > 0 || 'Password is required']"
          />
        </q-card-section>

        <q-card-section class="text-center">
          <q-btn color="primary" label="Register" type="submit" class="full-width"/>
        </q-card-section>
      </q-form>

      <q-card-actions class="justify-center">
        <div>Already have an account?</div>
        <q-btn flat label="Log in" color="primary" @click="goToLogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ToggleTheme from 'src/components/ToggleTheme.vue'
import { register } from 'src/utils/auth.js'
import { useQuasar } from 'quasar'

const username = ref('')
const password = ref('')
const password2 = ref('')
const router = useRouter()
const $q = useQuasar()

const goToLogin = () => {
  router.push('/auth/login')
}

const registerUser = async () => {
  const response = await register(username.value, password.value, password2.value)
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
