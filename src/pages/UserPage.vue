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
import { useQuasar } from 'quasar'

const users = ref([]);
const $q = useQuasar()

const getUsers = async () => {
  const response = await api.get('/user');
  users.value = response.data;
};

onMounted(async () => {
  getUsers();
});

const handleAdd = async (user) => {
  const response = await api.post('/user', user);
  $q.notify({
    type: response.status === 200 ? 'positive' : 'negative',
    message: response.statusText,
    position: 'bottom',
    timeout: 1000
  })
  getUsers();
};

const handleUpdate = async (user) => {
  const response = await api.put(`/user/${user.id}`, user);
  $q.notify({
    type: response.status === 200 ? 'positive' : 'negative',
    message: response.statusText,
    position: 'bottom',
    timeout: 1000
  })
  getUsers();
};

const handleDelete = async (user) => {
  const response = await api.delete(`/user/${user.id}`);
  $q.notify({
    type: response.status === 200 ? 'positive' : 'negative',
    message: response.statusText,
    position: 'bottom',
    timeout: 1000
  })
  getUsers();
};
</script>
