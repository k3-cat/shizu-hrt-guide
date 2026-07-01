<template>
  <button
    id="expand-content-area-btn"
    @click="toggleSidebar"
    :title="isSidebarVisible ? 'Expand Contnet Area' : 'Reset Content Area'"
  >
    <Icon :viewBox="viewBox" :content="content" fallback="mi:layout" />
  </button>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

import { Icon } from "@iconify/css-vue";

const isSidebarVisible = ref(true);

const viewBox = { width: 24, height: 24 };
const content = computed(() => {
	return `<path class=${isSidebarVisible.value ? "x7wx2m" : "rgru1v"} />`;
});

const toggleSidebar = () => {
	isSidebarVisible.value = !isSidebarVisible.value;

	if (isSidebarVisible.value) {
		delete document.documentElement.dataset.sidebar;
	} else {
		document.documentElement.dataset.sidebar = "no";
	}
};

onBeforeUnmount(() => {
	delete document.documentElement.dataset.sidebar;
});
</script>
