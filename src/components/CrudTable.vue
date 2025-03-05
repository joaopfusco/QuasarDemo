<template>
  <q-page class="full-width full-height q-pa-md">
    <div class="table-header q-mb-md row items-center justify-between">
      <q-input
        v-model="searchTerm"
        outlined
        dense
        placeholder="Filter..."
        class="filter-input"
        clearable
        debounce="300"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn color="primary" icon="add" label="Add" @click="openDrawerAdd" />
    </div>

    <q-table
      class="custom-table"
      flat
      bordered
      :rows="filteredRows"
      :columns="computedColumns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
      wrap-cells
      no-data-label="Nenhum dado disponível"
      loading-label="Carregando dados..."
      :grid="isSmallScreen"
    >
      <template v-slot:header="props">
        <q-tr :props="props" class="bg-primary text-white">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-chip
            v-if="typeof props.row[props.col.field] === 'boolean'"
            :color="props.row[props.col.field] ? 'green' : 'red'"
            text-color="white"
            dense
          >
            {{ props.row[props.col.field] ? 'Sim' : 'Não' }}
          </q-chip>
          <span v-else>
            {{ props.row[props.col.field] }}
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" color="primary" flat dense round @click="openDrawerUpdate(props.row)" />
          <q-btn icon="delete" color="red" flat dense round @click="confirmDelete(props.row)" />
        </q-td>
      </template>

      <template v-slot:no-data>
        <div class="full-width q-pa-md text-center">
          <q-icon name="warning" size="md" color="grey-6" />
          <div class="text-grey-7 q-mt-sm">Nenhum registro encontrado.</div>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="confirmDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="lg" class="q-mr-sm" />
          <span class="text-h6">Tem certeza que deseja excluir?</span>
        </q-card-section>

        <q-card-section>
          <p>Essa ação não pode ser desfeita.</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Delete" color="red" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <SideDialog
      v-model:isOpen="isDrawerOpen"
      :fields="computedColumns"
      :entity="selectedEntity"
      @submit="handleSubmit"
      @reset-entity="resetEntity"
    />
  </q-page>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import SideDialog from './SideDialog.vue';

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: false,
    default: () => []
  }
});

const emit = defineEmits(["add, update, delete"]);

const $q = useQuasar();
const isSmallScreen = ref($q.screen.lt.md);
const searchTerm = ref("");
const isDrawerOpen = ref(false);
const selectedEntity = ref(null);
const confirmDialog = ref(false);
const itemToDelete = ref(null);

onMounted(() => {
  $q.screen.setSizes({ sm: 640, md: 1024, lg: 1440, xl: 1920 });
});

const openDrawerAdd = () => {
  isDrawerOpen.value = true;
  selectedEntity.value = null;
};

const openDrawerUpdate = (entity) => {
  isDrawerOpen.value = true;
  selectedEntity.value = entity;
};

const confirmDelete = (item) => {
  itemToDelete.value = item;
  confirmDialog.value = true;
};

const computedColumns = computed(() => {
  let baseColumns = props.columns.length > 0 ? props.columns : [];

  if (baseColumns.length === 0 && props.rows.length > 0) {
    baseColumns = Object.keys(props.rows[0]).map(key => ({
      name: key,
      required: true,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      align: 'left',
      field: key,
      sortable: true
    }));
  }

  return [
    ...baseColumns,
    {
      name: "actions",
      label: "Actions",
      align: "center",
      field: "actions",
      sortable: false
    }
  ];
});

const filteredRows = computed(() => {
  if (!searchTerm.value) return props.rows;

  const lowerSearch = searchTerm.value.toLowerCase();
  return props.rows.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(lowerSearch)
    )
  );
});

const resetEntity = () => {
  selectedEntity.value = null;
};

const handleSubmit = (data) => {
  console.log("Form data submitted:", data);
  isDrawerOpen.value = false;
  resetEntity();
};

const deleteItem = () => {
  emit("delete", itemToDelete.value);
  confirmDialog.value = false;
  itemToDelete.value = null;
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .custom-table {
    overflow-x: auto;
    display: block;
  }
}

.q-tr.bg-primary {
  font-weight: bold;
  text-transform: uppercase;
}

.q-chip {
  font-size: 0.8rem;
  font-weight: bold;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
