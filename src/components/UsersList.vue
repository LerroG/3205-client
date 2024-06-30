<script setup lang="ts">
import type { UsersQueryType } from '@/types/users';

defineProps<{ items: UsersQueryType[] | undefined }>()
</script>

<template>
  <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  <div v-if="items?.length">
    <div v-for="item in items">
      {{ item.email }}
    </div>
  </div>
  <div v-else>
    Empty users list
  </div>
</template>