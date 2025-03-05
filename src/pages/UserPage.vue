<template>
  <q-page class="flex flex-center">
    <CrudTable
      :rows="users"
      @add="handleAdd"
      @update="handleUpdate"
      @delete="handleDelete"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CrudTable from '../components/CrudTable.vue';
import api from 'src/services/api.js'

const users = ref([]);

const getUsers = async () => {
  const response = await api.get('/user');
  users.value = response.data;
};

onMounted(async () => {
  getUsers();
});

const handleAdd = async (user) => {
  await api.post('/user', user);
  getUsers();
};

const handleUpdate = async (user) => {
  await api.put(`/user/${user.id}`, user);
  getUsers();
};

const handleDelete = async (user) => {
  await api.delete(`/user/${user.id}`);
  getUsers();
};
</script>
