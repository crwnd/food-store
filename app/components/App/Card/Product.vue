<script setup lang="ts">
import { getStockStatus, formatDate } from "~/utils";
import { ShoppingCart } from "lucide-vue-next";

const cartStore = useCartStore();

defineProps({
	product: {
		type: Object,
		required: true,
	},
});
</script>
<template>
	<NuxtLink
		:to="`/product/${product.id || 1}`"
		class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-[transform,shadow] duration-300 hover:-translate-y-1"
	>
		<div class="w-full h-48 flex items-center justify-center relative">
			<NuxtPicture
				:src="product.images[0]"
				:alt="product.name"
				width="300"
				height="200"
				class="w-full h-full flex items-center justify-center"
			/>
			<!-- Stock Badge -->
			<div
				:class="[
					'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium',
					product.stock > 10
						? 'bg-green-100 text-green-800'
						: product.stock > 0
						? 'bg-orange-100 text-orange-800'
						: 'bg-red-100 text-red-800',
				]"
			>
				{{ product.stock }} {{ product.unit }}
			</div>
		</div>

		<div class="p-5">
			<h3 class="font-bold text-xl text-green-800 mb-2">
				{{ product.name }}
			</h3>
			<p class="text-sm text-gray-600 mb-1">
				Сорт: {{ product.variety }}
			</p>
			<p class="text-sm text-gray-500 mb-3">
				Зібрано:
				{{ formatDate(product.lastCollectionDate) }}
			</p>

			<p class="text-gray-700 text-sm mb-4 line-clamp-2">
				{{ product.description }}
			</p>

			<div class="flex justify-between items-center">
				<div>
					<span class="text-2xl font-bold text-green-600">
						{{ product.price }} ₴
					</span>
					<span class="text-gray-500 text-sm"
						>/{{ product.unit }}</span
					>
				</div>
				<div
					:class="getStockStatus(product.stock).class"
					class="text-sm font-medium"
				>
					{{ getStockStatus(product.stock).text }}
				</div>
			</div>

			<div class="mt-4 flex gap-2">
				<span
					class="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
				>
					Детальніше
				</span>
				<button
					@click.stop.prevent="
						cartStore.getItem(product.id)?.quantity
							? cartStore.removeItem(product.id)
							: cartStore.addItem(product, 1)
					"
					class="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors relative"
					title="Додати до кошика"
					:disabled="!product.stock"
				>
					<ShoppingCart />
					<span
						v-if="cartStore.getItem(product.id)?.quantity"
						class="absolute -top-3 -right-3 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
					>
						{{
							cartStore.getItem(product.id)!.quantity > 99
								? "99+"
								: cartStore.getItem(product.id)?.quantity
						}}
					</span>
				</button>
			</div>
		</div>
	</NuxtLink>
</template>
