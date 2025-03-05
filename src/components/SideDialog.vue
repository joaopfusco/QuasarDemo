<template>
  <q-dialog v-model="dialogOpen" position="right" full-height persistent>
    <q-card class="side-dialog">
      <q-card-section class="row items-center bg-primary text-white">
        <q-toolbar-title> Entity {{ props.entity?.id }} </q-toolbar-title>
        <q-space />
        <q-btn icon="close" flat dense @click="closeDialog" class="text-white" />
      </q-card-section>

      <q-form @submit="submitForm" class="q-pa-md">
        <div v-for="field in fields" :key="field.model" class="q-mb-md">
          <template v-if="!excludedFields.includes(field.label)">
            <q-input
              v-model="formData[field.field]"
              :type="field.type"
              :label="field.label"
              outlined
              dense
              required
            />
          </template>
        </div>
        <q-btn label="Save" type="submit" color="primary" class="full-width q-mt-md" />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
  entity: {
    type: Object,
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: false,
    default: 'Add/Update',
  },
});

const emit = defineEmits(['update:isOpen', 'submit', 'reset-entity']);

const dialogOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value),
});

const excludedFields = ['Actions', 'Id', 'CreatedAt', 'UpdatedAt'];

const formData = ref({});

watch(
  () => props.entity,
  (newEntity) => {
    if (newEntity) {
      nextTick(() => {
        console.log(props.fields);
        formData.value = props.fields.reduce((acc, field) => {
          acc[field.field] = newEntity?.[field.field] ?? '';
          return acc;
        }, {});
        console.log('FormData after filling:', formData.value);
      });
    }
  },
  { immediate: true }
);

const closeDialog = () => {
  formData.value = {};
  emit('reset-entity');
  emit('update:isOpen', false);
};

const submitForm = () => {
  emit('submit', formData.value);
  closeDialog();
};
</script>

<style scoped>
.side-dialog {
  width: 40vw;
  min-width: 300px;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
</style>
