<script setup lang="ts">
import FormSubmit from "@/components/FormSubmit.vue"
import UsersList from "@/components/UsersList.vue"
import axios from "axios";
import type { UsersQueryType } from "./types/users";
import { reactive } from "vue";


const usersData = reactive({
  items: [] as UsersQueryType[],
  isLoading: false,
  isSearched: false
})

const fetchData = async (params: UsersQueryType) => {
  try {
    usersData.isLoading = true
    usersData.isSearched = true
    const { data } = await axios.get<UsersQueryType[]>('http://localhost:4200/api/users', {
      params
    })
    usersData.isLoading = false

    usersData.items = data
  } catch (error) {
    usersData.isLoading = false
    console.log(error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="form-wrapper mt-24">
      <FormSubmit @submit="fetchData" />
    </div>
    <div class="form-wrapper mt-10">
      <UsersList :usersData="usersData" />
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  @apply flex py-6 justify-center items-center bg-gray-100 rounded-xl w-2/6 shadow-md border;
}
</style>
