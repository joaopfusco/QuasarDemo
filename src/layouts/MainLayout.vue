<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title @click="router.push('/')" class="cursor-pointer">
          Quasar App
        </q-toolbar-title>

        <ToggleTheme />

        <q-btn flat dense round icon="account_circle" aria-label="User" ref="userButton">
          <q-menu fit anchor="bottom right" self="top right">
            <q-card class="q-pa-md" style="min-width: 200px">
              <q-card-section class="row items-center">
                <q-avatar icon="person" />
                <div class="q-ml-md">
                  <div class="text-subtitle1">{{ userName }}</div>
                  <div class="text-caption text-grey">{{ userEmail }}</div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn flat label="Logout" icon="logout" color="negative" @click="logout" />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
    >
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in menu"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import ToggleTheme from 'components/ToggleTheme.vue'
import { useRouter } from 'vue-router'
import menu from 'src/utils/menu'

const userName = ref('Root')
const userEmail = ref('root@email.com')

const leftDrawerOpen = ref(true)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const router = useRouter()

function logout () {
  window.sessionStorage.setItem('authUser', '')
  router.push('/auth/login')
}
</script>
