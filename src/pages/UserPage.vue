<template>
  <q-page class="flex flex-center">
    <CrudTable :rows="users"/>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CrudTable from '../components/CrudTable.vue';
import api from 'src/services/api.js'

const users = ref([]);

onMounted(async () => {
  const response = await api.get('/user');
  users.value = response.data;
});
</script>
