<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useProducts } from '~/composables/useProducts'

const { products, createProduct, deleteProduct } = useProducts()

const productFormState = reactive({
	name: '',
})

const isSubmitDisabled = computed(() => !productFormState.name.trim())

const handleCreateProduct = () => {
	if (isSubmitDisabled.value) return
	
	createProduct(productFormState.name)
	productFormState.name = ''
}
</script>

<template>
	<UContainer class="py-10">
		<div class="max-w-xl mx-auto space-y-8">
			<div class="space-y-2 text-center">
				<h1 class="text-2xl font-semibold">Список продуктів</h1>
				<p class="text-sm text-gray-500">
					Додайте продукт у список — дані зберігаються в браузері (localStorage).
				</p>
			</div>
			
			<UCard>
				<form
					class="flex flex-col gap-3 sm:flex-row"
					@submit.prevent="handleCreateProduct"
				>
					<UInput
						v-model="productFormState.name"
						placeholder="Назва продукту"
						aria-label="Назва продукту"
						class="flex-1"
					/>
					<UButton type="submit" :disabled="isSubmitDisabled">
						Додати
					</UButton>
				</form>
			</UCard>
			
			<div class="space-y-3">
				<h2 class="text-lg font-medium">Продукти</h2>
				
				<UAlert v-if="!products.length" color="neutral" variant="subtle">
					Список порожній. Додайте перший продукт ✨
				</UAlert>
				
				<div v-else class="space-y-2">
					<ProductItem
						v-for="product in products"
						:key="product.id"
						:product="product"
						@remove="deleteProduct(product.id)"
					/>
				</div>
			</div>
		</div>
	</UContainer>
</template>
