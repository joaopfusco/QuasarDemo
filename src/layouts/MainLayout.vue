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
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :mini="isMini"
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

const leftDrawerOpen = ref(true)
const isMini = ref(false)

function toggleLeftDrawer () {
  isMini.value = !isMini.value
}

const router = useRouter()

function logout () {
  window.sessionStorage.setItem('authUser', '')
  router.push('/auth/login')
}
</script>
