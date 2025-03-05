<template>
  <q-page class="flex flex-center">
    <CrudTable :rows="users"/>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CrudTable from '../components/CrudTable.vue';

const users = ref([]);

onMounted(async () => {
  users.value = [
    {
      "id": 1,
      "username": "Teste 1",
      "password": "teste",
      "created_at": "2021-07-01T00:00:00.000Z",
      "updated_at": "2021-07-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "username": "Teste 2",
      "password": "teste",
      "created_at": "2021-07-01T00:00:00.000Z",
      "updated_at": "2021-07-01T00:00:00.000Z"
    },
    {
      "id": 3,
      "username": "Teste 3",
      "password": "teste",
      "created_at": "2021-07-01T00:00:00.000Z",
      "updated_at": "2021-07-01T00:00:00.000Z"
    }
  ];
});
</script>
