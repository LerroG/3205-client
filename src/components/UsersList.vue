<script setup lang="ts">
import type { UsersQueryType } from '@/types/users';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type PropsType = {
  items: Array<UsersQueryType>
  isLoading: boolean
  isSearched: boolean
}

defineProps<{ usersData: PropsType }>()
</script>

<template>
  <div v-if="usersData.isLoading" class="spinner"></div>
  <div v-else-if="usersData?.items.length && !usersData.isLoading" class="w-2/3">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Email
          </TableHead>
          <TableHead>Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, idx) in usersData.items" :key="idx">
          <TableCell class="font-medium">
            {{ item.email }}
          </TableCell>
          <TableCell>{{ item.number }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
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