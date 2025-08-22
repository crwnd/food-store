<script setup lang="ts">
import { productTypes } from "~/utils";

const config = useRuntimeConfig();
const productsStore = useProductsStore();

const selectedType = ref<string>("all");
const searchQuery = ref("");

const filteredProducts = computed(() => {
	let products = productsStore.getProducts();

	if (selectedType.value !== "all") {
		products = productsStore.getProductsByType(selectedType.value as any);
	}

	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		products = products.filter(
			(product) =>
				product.name.toLowerCase().includes(query) ||
				product.description.toLowerCase().includes(query) ||
				product.variety.toLowerCase().includes(query)
		);
	}

	return products;
});

useHeadSafe({
	title: `Каталог продуктів - ${config.public.STORE_NAME}`,
	meta: [
		{
			name: "description",
			content:
				"Каталог свіжих овочів, фруктів та зелені з ферми Квітневий врожай. Замовляйте натуральні продукти без хімікатів з доставкою в Бровари.",
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-gray-50">
		<!-- Page Header -->
		<section class="bg-green-600 text-white py-12">
			<div class="max-w-screen-xl mx-auto px-4">
				<h1 class="text-4xl md:text-5xl font-bold mb-4">
					Каталог продуктів
				</h1>
				<p class="text-xl text-green-100">
					Свіжі овочі, фрукти та зелень прямо з нашої ферми
				</p>
			</div>
		</section>

		<!-- Filters -->
		<section class="py-8 bg-white border-b">
			<div class="max-w-screen-xl mx-auto px-4">
				<div
					class="flex flex-col md:flex-row gap-4 items-center justify-between"
				>
					<!-- Search -->
					<div class="relative flex-1 max-w-md">
						<input
							v-model="searchQuery"
							type="text"
							placeholder="Пошук продуктів..."
							class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
						<div class="absolute left-3 top-3.5 text-gray-400">
							<svg
								class="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>

					<!-- Category Filter -->
					<div class="flex flex-wrap gap-2">
						<button
							v-for="type in productTypes"
							:key="type.value"
							@click="selectedType = type.value"
							:class="[
								'px-4 py-2 rounded-full font-medium transition-colors',
								selectedType === type.value
									? 'bg-green-600 text-white'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
							]"
						>
							{{ type.label }}
						</button>
					</div>
				</div>
			</div>
		</section>

		<!-- Products Grid -->
		<section class="py-12">
			<div class="max-w-screen-xl mx-auto px-4">
				<!-- Results Info -->
				<div class="mb-8">
					<p class="text-gray-600">
						Знайдено {{ filteredProducts.length }}
						{{
							filteredProducts.length === 1
								? "продукт"
								: filteredProducts.length < 5
								? "продукти"
								: "продуктів"
						}}
					</p>
				</div>

				<!-- Products Grid -->
				<div
					v-if="filteredProducts.length > 0"
					class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
				>
					<AppCardProduct
						v-for="product in filteredProducts"
						:key="product.id"
						:product
						class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
					/>
				</div>

				<!-- No Results -->
				<div v-else class="text-center py-12">
					<div class="text-6xl mb-4">🔍</div>
					<h3 class="text-xl font-semibold text-gray-700 mb-2">
						Нічого не знайдено
					</h3>
					<p class="text-gray-500 mb-6">
						Спробуйте змінити фільтри або пошуковий запит
					</p>
					<button
						@click="
							selectedType = 'all';
							searchQuery = '';
						"
						class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
					>
						Скинути фільтри
					</button>
				</div>
			</div>
		</section>

		<!-- Call to Action -->
		<section class="py-16 bg-green-600 text-white">
			<div class="max-w-screen-xl mx-auto px-4 text-center">
				<h2 class="text-3xl font-bold mb-4">
					Готові зробити замовлення?
				</h2>
				<p class="text-xl text-green-100 mb-8">
					Телефонуйте нам для оформлення замовлення та узгодження
					доставки
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						:href="`tel:${config.public.CONTACT.phone}`"
						class="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
					>
						📞 {{ config.public.CONTACT.phone }}
					</a>
					<a
						:href="`https://t.me/${config.public.CONTACT.telegram.replace(
							'@',
							''
						)}`"
						target="_blank"
						class="flex flex-row items-center gap-2 bg-green-700 hover:bg-green-800 px-8 py-4 rounded-lg font-semibold transition-colors"
					>
						<AppIconTelegram class="w-5 h-5" /> Telegram
					</a>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
