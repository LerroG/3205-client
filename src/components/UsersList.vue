<script setup lang="ts">
import type { UsersQueryType } from '@/types/users';



type PropsType = {
  items: Array<UsersQueryType>
  isLoading: boolean
  isSearched: boolean
}

defineProps<{ usersData: PropsType }>()
</script>

<template>
  <div v-if="usersData.isLoading" class="spinner"></div>
  <div v-if="usersData?.items.length">
    <div v-for="item in usersData.items">
      User Email: {{ item.email }}
    </div>
  </div>
  <div v-else-if="usersData.isSearched && !usersData.isLoading">Users not found</div>
  <div v-else-if="!usersData.isSearched && !usersData.isLoading">
    Empty users list
  </div>
</template>

<style scoped>
.spinner {
  @apply w-10 h-10 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent;
}
</style>