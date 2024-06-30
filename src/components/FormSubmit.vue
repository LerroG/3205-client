<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, configure } from 'vee-validate';
import { z } from 'zod';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

const emit = defineEmits<{
  submit: [{ email: string, number?: number }]
}>()

const validationSchema = toTypedSchema(z.object({
  email: z.string().email(),
  number: z.string().min(8, { message: 'This field must contain at least 6 characters' }).optional().transform(val => val ? Number(val?.replace(/[^+\d]/g, '')) : undefined),
}))

const { handleSubmit } = useForm({
  validationSchema
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>


  <form class="w-2/3" @submit="onSubmit">
    <div class="mb-4">

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Enter Email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="number">
        <FormItem>
          <FormLabel>Number (optional)</FormLabel>
          <FormControl>
            <Input v-imask="{ mask: '00{-}00{-}00' }" placeholder="Number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-center">
      <Button type="submit">
        Submit
      </Button>
    </div>
  </form>
</template>

<style scoped>
.input {
  @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50;
}
</style>
