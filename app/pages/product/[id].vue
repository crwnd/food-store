<script setup lang="ts">
import { productTypes } from "~/utils";
import { Check, ShoppingCart } from "lucide-vue-next";

const config = useRuntimeConfig();
const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const productId = route.params.id as string;

const product = computed(() => {
	return (
		productsStore.getProductById(productId) ||
		(productsStore.getProducts()?.length ? null : undefined)
	);
});

if (product.value === null) {
	throw createError({
		statusCode: 404,
		message: "Продукт не знайдено",
	});
}

// Get related products (same type, excluding current)
const relatedProducts = computed(() =>
	product.value
		? productsStore
				.getProductsByType(product.value.type)
				.filter((p) => p.id !== product.value!.id)
				.slice(0, 3)
		: []
);

useHead({
	title: product.value
		? `${product.value.name} - ${config.public.STORE_NAME}`
		: "Не знайдено",
	meta: [
		{
			name: "description",
			content: product.value
				? `${product.value.name} (${product.value.variety}) - ${product.value.description} Ціна: ${product.value.price} ₴/${product.value.unit}. Замовляйте свіжі продукти з ферми в Квітневому.`
				: "Не знайдено",
		},
		{
			name: "og:image",
			content: product.value?.images?.[0]
				? `${config.public.APP_URL}/_ipx/f_png&q_80&fit_cover&s_512x512${product.value.images[0]}`
				: null,
		},
	],
});

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("uk-UA", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

const getStockStatus = (stock: number) => {
	if (stock > 10)
		return {
			text: "В наявності",
			class: "text-green-600 bg-green-100",
			icon: "✅",
		};
	if (stock > 0)
		return {
			text: "Залишається мало",
			class: "text-orange-600 bg-orange-100",
			icon: "⚠️",
		};
	return {
		text: "Немає в наявності",
		class: "text-red-600 bg-red-100",
		icon: "❌",
	};
};

const getTypeLabel = (type: string) => {
	return productTypes.find((e) => e.value === type)?.label || type;
};

const quantity = ref(1);

const productSwiperRef = ref();

const goToSlide = (index: number) => {
	if (productSwiperRef.value?.swiper) {
		productSwiperRef.value.swiper.slideTo(index);
	}
};
</script>

<template>
	<div class="bg-gray-50">
		<!-- Breadcrumbs -->
		<nav class="bg-white border-b py-4">
			<div class="max-w-screen-xl mx-auto px-4">
				<div class="flex items-center space-x-2 text-sm text-gray-600">
					<NuxtLink to="/" class="hover:text-green-600">
						Головна
					</NuxtLink>
					<span>/</span>
					<NuxtLink to="/catalog" class="hover:text-green-600">
						Каталог
					</NuxtLink>
					<span>/</span>
					<span class="text-green-600 font-medium">
						{{ product?.name }}
					</span>
				</div>
			</div>
		</nav>

		<!-- Product Details -->
		<section v-if="product" class="py-12">
			<div class="max-w-screen-xl mx-auto px-4">
				<div class="flex flex-col lg:flex-row gap-12">
					<!-- Product Image Gallery -->
					<div class="flex-1 min-w-0 space-y-4">
						<div class="w-full h-96 md:h-[42rem] relative">
							<ClientOnly>
								<swiper-container
									ref="productSwiperRef"
									:slides-per-view="1"
									:space-between="10"
									:loop="product.images?.length > 1"
									:pagination="{ clickable: true }"
									:navigation="product.images?.length > 1"
									class="product-image-swiper w-full h-full"
								>
									<swiper-slide
										v-for="(image, index) in product.images"
										:key="index"
										class="w-full h-full flex items-center justify-center"
									>
										<NuxtPicture
											:src="image"
											:alt="`${
												product.name
											} - зображення ${index + 1}`"
											class="w-auto h-full rounded-xl overflow-hidden"
											height="512"
											width="512"
											densities="x1 x2"
											fit="cover"
										/>
									</swiper-slide>
								</swiper-container>
							</ClientOnly>
							<!-- Stock Badge -->
							<div
								:class="[
									'absolute top-4 right-4 px-3 py-2 rounded-full font-medium flex items-center gap-2 z-10',
									getStockStatus(product.stock).class,
								]"
							>
								<span>{{
									getStockStatus(product.stock).icon
								}}</span>
								{{ getStockStatus(product.stock).text }}
							</div>
						</div>

						<!-- Thumbnail navigation for multiple images -->
						<div
							v-if="product.images?.length > 1"
							class="flex gap-2 overflow-x-auto"
						>
							<button
								v-for="(image, index) in product.images"
								:key="index"
								class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-green-500 transition-colors"
								@click="goToSlide(index)"
							>
								<NuxtImg
									:src="image"
									:alt="`${product.name} - мініатюра ${
										index + 1
									}`"
									width="80"
									height="80"
									class="w-full h-full object-cover"
								/>
							</button>
						</div>
					</div>

					<!-- Product Info -->
					<div class="flex-1 min-w-0 space-y-6">
						<div>
							<div
								class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3"
							>
								{{ getTypeLabel(product.type) }}
							</div>
							<h1 class="text-4xl font-bold text-green-800 mb-2">
								{{ product.name }}
							</h1>
							<p class="text-xl text-gray-600">
								Сорт: {{ product.variety }}
							</p>
						</div>

						<!-- Price -->
						<div class="bg-white p-6 rounded-xl shadow-lg">
							<div class="flex items-baseline gap-2 mb-2">
								<span class="text-4xl font-bold text-green-600">
									{{ product.price }} ₴
								</span>
								<span class="text-gray-500 text-lg">
									за {{ product.unit }}
								</span>
							</div>
							<!-- <p class="text-gray-600">
								В наявності: {{ product.stock }}
								{{ product.unit }}
							</p> -->
						</div>

						<!-- Order Section -->
						<div
							class="bg-green-50 p-6 rounded-xl border-2 border-green-200"
						>
							<h3
								class="text-xl font-semibold text-green-800 mb-4"
							>
								Замовити
							</h3>

							<!-- Quantity Selector -->
							<div class="flex items-center gap-4 mb-6">
								<label class="text-gray-700 font-medium"
									>Кількість:</label
								>
								<div
									class="flex items-center border-2 border-green-300 rounded-lg"
								>
									<button
										@click="
											quantity = Math.max(1, quantity - 1)
										"
										class="px-3 py-2 hover:bg-green-100 transition-colors"
										:disabled="quantity <= 1"
									>
										−
									</button>
									<input
										v-model.number="quantity"
										type="number"
										min="1"
										:max="product.stock"
										class="w-16 px-2 py-2 text-center border-none focus:ring-0"
									/>
									<button
										@click="
											quantity = Math.min(
												product.stock,
												quantity + 1
											)
										"
										class="px-3 py-2 hover:bg-green-100 transition-colors"
										:disabled="quantity >= product.stock"
									>
										+
									</button>
								</div>
								<span class="text-gray-600">{{
									product.unit
								}}</span>
							</div>

							<!-- Total Price -->
							<div
								class="flex flex-row items-center justify-between"
							>
								<div class="text-2xl font-bold text-green-800">
									Сума: {{ product.price * quantity }} ₴
								</div>
								<div class="">
									<button
										v-if="!cartStore.getItem(product.id)"
										@click="
											cartStore.addItem(product, quantity)
										"
										class="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-lg"
										:disabled="
											!product.stock ||
											quantity > product.stock
										"
									>
										<ShoppingCart /> Додати до кошика
									</button>
									<NuxtLink
										v-else
										to="/cart"
										class="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-lg"
										:disabled="
											!product.stock ||
											quantity > product.stock
										"
									>
										<Check /> У кошику
									</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Product Details -->
		<section v-if="product" class="py-4 bg-gray-50">
			<div class="max-w-screen-xl mx-auto px-4">
				<div class="bg-white p-6 rounded-xl shadow-lg">
					<h3 class="text-xl font-semibold text-green-800 mb-4">
						Деталі продукту
					</h3>
					<div class="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span class="text-gray-500">Тип:</span>
							<span class="ml-2 font-medium">{{
								getTypeLabel(product.type)
							}}</span>
						</div>
						<div>
							<span class="text-gray-500">Сорт:</span>
							<span class="ml-2 font-medium">{{
								product.variety
							}}</span>
						</div>
						<div>
							<span class="text-gray-500">Останній збір:</span>
							<span class="ml-2 font-medium">{{
								product.lastCollectionDate
									? formatDate(product.lastCollectionDate)
									: "Не вказано"
							}}</span>
						</div>
						<div>
							<span class="text-gray-500">Одиниця:</span>
							<span class="ml-2 font-medium">{{
								product.unit
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Product Description -->
		<section v-if="product" class="py-4 mb-12 bg-gray-50">
			<div class="max-w-screen-xl mx-auto px-4">
				<div class="bg-white p-6 rounded-2xl shadow-lg">
					<h3 class="text-xl font-semibold text-green-800 mb-4">
						Опис продукту
					</h3>
					<p class="text-lg text-gray-700 leading-relaxed">
						{{ product.description }}
					</p>
				</div>
			</div>
		</section>

		<!-- Related Products -->
		<section v-if="relatedProducts?.length" class="py-16 bg-white">
			<div class="max-w-screen-xl mx-auto px-4">
				<h2 class="text-3xl font-bold text-green-800 text-center mb-12">
					Схожі продукти
				</h2>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<AppCardProduct
						v-for="product in relatedProducts"
						:key="product.id"
						:product
						class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
					/>
				</div>
			</div>
		</section>

		<DeliveryInfo />
	</div>
</template>
