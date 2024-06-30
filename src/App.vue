<script setup lang="ts">
import FormSubmit from "@/components/FormSubmit.vue"
import UsersList from "@/components/UsersList.vue"
import axios from "axios";
import type { UsersQueryType } from "./types/users";
import { ref } from "vue";

const items = ref()

const fetchData = async (params: UsersQueryType) => {
  try {
    const { data } = await axios.get<UsersQueryType[]>('http://localhost:4200/api/users', {
      params
    })

    items.value = data
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
      <UsersList :items="items" />
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  @apply flex py-6 justify-center items-center bg-gray-100 rounded-xl w-2/6 shadow-md border;
}
</style>
