import { computed, onMounted, watch } from 'vue'
import type { Product, ProductId } from '~/types/product'

const PRODUCTS_STORAGE_KEY = 'products'

export const useProducts = () => {
    const productsState = useState<Product[]>('products', () => [])
    const isInitialized = useState<boolean>('productsInitialized', () => false)

    const loadProductsFromStorage = () => {
        if (typeof window === 'undefined') return

        const rawValue = window.localStorage.getItem(PRODUCTS_STORAGE_KEY)
        if (!rawValue) return

        try {
            const parsed = JSON.parse(rawValue) as Product[]
            if (Array.isArray(parsed)) {
                productsState.value = parsed
            }
        } catch (error) {
            console.error('Failed to parse products from localStorage', error)
        }
    }

    const saveProductsToStorage = () => {
        if (typeof window === 'undefined') return

        const serialized = JSON.stringify(productsState.value)
        window.localStorage.setItem(PRODUCTS_STORAGE_KEY, serialized)
    }

    const initializeProducts = () => {
        if (isInitialized.value) return

        loadProductsFromStorage()
        isInitialized.value = true
    }

    onMounted(() => {
        initializeProducts()
    })

    watch(
        productsState,
        () => {
            if (!isInitialized.value) return
            saveProductsToStorage()
        },
        { deep: true }
    )

    const createProduct = (name: string) => {
        const trimmedName = name.trim()
        if (!trimmedName) return

        const newProduct: Product = {
            id: Date.now(),
            name: trimmedName,
        }

        productsState.value = [...productsState.value, newProduct]
    }

    const deleteProduct = (productId: ProductId) => {
        productsState.value = productsState.value.filter(
            (product) => product.id !== productId
        )
    }

    const products = computed(() => productsState.value)

    return {
        products,
        createProduct,
        deleteProduct,
    }
}
