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
let controller: AbortController | null

const fetchData = async (params: UsersQueryType) => {
  try {
    if (controller) controller.abort()
    controller = new AbortController()
    const signal = controller.signal

    usersData.isLoading = true
    usersData.isSearched = true
    await axios.get<UsersQueryType[]>(`${import.meta.env.VITE_BASE_URL}/users`, {
      params,
      signal
    }).then((res) => {
      usersData.isLoading = false

      usersData.items = res.data
      controller = null
    })

  } catch (error) {
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
  @apply flex py-6 justify-center items-center bg-gray-100 rounded-xl min-h-[100px] w-2/6 shadow-md border;
}
</style>
