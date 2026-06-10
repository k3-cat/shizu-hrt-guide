<template>
  <button
    id="btn-toggle-sidebar"
    @click="toggleSidebar"
    :title="isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'"
  >
    {{ isSidebarVisible ? '«' : '»' }}
  </button>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;

  if (isSidebarVisible.value) {
    delete document.documentElement.dataset.sidebar;
  } else {
    document.documentElement.dataset.sidebar = 'no';
  }
}

onBeforeUnmount(() => {
  delete document.documentElement.dataset.sidebar;
})
</script>
