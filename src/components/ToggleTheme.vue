<template>
  <div class="row items-center">
    <q-btn
      flat
      round
      :icon="isDarkMode ? 'dark_mode' : 'light_mode'"
      @click="toggleDarkMode"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');

$q.dark.set(isDarkMode.value);

watch(isDarkMode, (val) => {
  $q.dark.set(val);
  localStorage.setItem('darkMode', val);
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>
