<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
	product: Product
}>()

const emit = defineEmits<{
	remove: []
}>()

const handleRemoveClick = () => {
	emit('remove')
}
</script>

<template>
	<UCard
		:ui="{
	    body: 'flex items-center justify-between gap-3 p-4 sm:p-6'
	  }"
	>
  <span class="text-sm sm:text-base break-words">
    {{ product.name }}
  </span>
		
		<UButton
			color="neutral"
			variant="outline"
			aria-label="Видалити"
			@click="handleRemoveClick"
		>
			Видалити
		</UButton>
	</UCard>

</template>
