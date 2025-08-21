<script setup lang="ts">
const config = useRuntimeConfig();
const productsStore = useProductsStore();

const featuredProducts = productsStore.getFeaturedProducts();

useHead({
	title: `${config.public.STORE_NAME} - Свіжі овочі та фрукти з Квітневого`,
	meta: [
		{
			name: "description",
			content:
				"Свіжі овочі та фрукти прямо з грядки. Доставка в Бровари та область. Замовляйте натуральні продукти без хімікатів.",
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-gradient-to-b from-green-50 to-white">
		<!-- Hero Section -->
		<section class="relative py-20 px-4">
			<div class="max-w-screen-xl mx-auto">
				<div class="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h1
							class="text-4xl md:text-6xl font-bold text-green-800 mb-6 leading-tight"
						>
							{{ config.public.STORE_NAME }}
						</h1>
						<p class="text-xl text-gray-700 mb-8 leading-relaxed">
							Свіжі овочі та фрукти прямо з грядки. Доставляємо в
							{{ config.public.STORE_LOCATION.town }} та
							{{ config.public.STORE_LOCATION.region }}.
						</p>
						<div class="flex flex-col sm:flex-row gap-4">
							<NuxtLink
								to="/catalog"
								class="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
							>
								Переглянути каталог
							</NuxtLink>
							<a
								:href="`tel:${config.public.CONTACT.phone}`"
								class="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors text-center"
							>
								Зателефонувати
							</a>
						</div>
					</div>
					<div
						class="w-full h-full md:h-auto flex items-center justify-center relative"
					>
						<NuxtPicture
							src="/images/farm-hero.png"
							alt="Свіжі овочі та фрукти з ферми"
							class="h-full rounded-2xl shadow-2xl overflow-hidden"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Products Section -->
		<section class="py-16 px-4 bg-green-50">
			<div class="max-w-screen-xl mx-auto">
				<h2
					class="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12"
				>
					Наші топ-продукти
				</h2>
				<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<AppCardProduct
						v-for="product in featuredProducts"
						:key="product.id"
						:product
					/>
				</div>
				<div class="text-center mt-12">
					<NuxtLink
						to="/catalog"
						class="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
					>
						Переглянути всі продукти
					</NuxtLink>
				</div>
			</div>
		</section>

		<!-- Who We Are & Our Advantages Section -->
		<section class="py-16 px-4 bg-white">
			<div class="max-w-screen-xl mx-auto text-center">
				<h2 class="text-3xl md:text-4xl font-bold text-green-800 mb-12">
					Хто ми та наші переваги
				</h2>
				<div
					class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
				>
					<div class="p-6">
						<div class="text-4xl mb-4">🌱</div>
						<h3 class="text-xl font-semibold text-green-700 mb-3">
							Сімейна ферма
						</h3>
						<p class="text-gray-600">
							Ми - родина фермерів, яка вирощує овочі та фрукти з
							любов'ю до землі та природи.
						</p>
					</div>
					<div class="p-6">
						<div class="text-4xl mb-4">🚫</div>
						<h3 class="text-xl font-semibold text-green-700 mb-3">
							Без хімікатів
						</h3>
						<p class="text-gray-600">
							Вся наша продукція вирощується без використання
							шкідливих хімічних добрив та пестицидів.
						</p>
					</div>
					<div class="p-6">
						<div class="text-4xl mb-4">🌿</div>
						<h3 class="text-xl font-semibold text-green-700 mb-3">
							Свіжість
						</h3>
						<p class="text-gray-600">
							Вирощуємо з дбайливістю та зберігаємо природну
							свіжість продуктів.
						</p>
					</div>
					<div class="p-6">
						<div class="text-4xl mb-4">🚚</div>
						<h3 class="text-xl font-semibold text-green-700 mb-3">
							Зручна доставка
						</h3>
						<p class="text-gray-600">
							Доставка через Uklon/Bolt або самовивіз з ферми
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Delivery Methods Section -->
		<section class="py-16 px-4 bg-green-50">
			<div class="max-w-screen-xl mx-auto">
				<h2
					class="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12"
				>
					Способи доставки
				</h2>
				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white p-8 rounded-2xl shadow-lg">
						<div class="text-4xl mb-4">🚗</div>
						<h3 class="text-2xl font-semibold text-green-700 mb-4">
							Самовивіз
						</h3>
						<p class="text-gray-600 mb-4">
							Забирайте замовлення прямо з нашої ферми. Попередньо
							телефонуйте для узгодження часу.
						</p>
						<ul class="text-sm text-gray-600 space-y-2">
							<li>• Безкоштовно</li>
							<li>• Можна оглянути ферму</li>
							<li>• Вибрати найкращі плоди</li>
						</ul>
					</div>
					<div class="bg-white p-8 rounded-2xl shadow-lg">
						<div class="text-4xl mb-4">📦</div>
						<h3 class="text-2xl font-semibold text-green-700 mb-4">
							Доставка кур'єром
						</h3>
						<p class="text-gray-600 mb-4">
							Доставляємо через сервіси Uklon або Bolt по місту
							{{ config.public.STORE_LOCATION.town }}
							та найближчим населеним пунктам.
						</p>
						<ul class="text-sm text-gray-600 space-y-2">
							<li>• Вартість доставки по тарифам сервісу</li>
							<li>• Доставка в день замовлення</li>
							<li>• Мінімальне замовлення: 200 ₴</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Section -->
		<section class="py-16 px-4 bg-green-800 text-white">
			<div class="max-w-screen-xl mx-auto text-center">
				<h2 class="text-3xl md:text-4xl font-bold mb-8">
					Зв'яжіться з нами
				</h2>
				<p class="text-xl mb-12 text-green-100">
					Маєте питання? Хочете зробити замовлення? Ми завжди на
					зв'язку!
				</p>
				<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<a
						:href="`tel:${config.public.CONTACT.phone}`"
						class="bg-green-700 hover:bg-green-600 p-4 rounded-xl transition-colors flex items-center gap-3"
					>
						<div class="text-2xl">📞</div>
						<div class="flex-1">
							<div class="font-semibold text-sm">Телефон</div>
							<div class="text-green-200 text-xs">
								{{ config.public.CONTACT.phone }}
							</div>
						</div>
					</a>
					<a
						:href="`https://t.me/${config.public.CONTACT.telegram.replace(
							'@',
							''
						)}`"
						target="_blank"
						class="bg-green-700 hover:bg-green-600 p-4 rounded-xl transition-colors flex items-center gap-3"
					>
						<AppIconTelegram class="w-6 h-6 flex-shrink-0" />
						<div class="flex-1">
							<div class="font-semibold text-sm">Telegram</div>
							<div class="text-green-200 text-xs">
								{{ config.public.CONTACT.telegram }}
							</div>
						</div>
					</a>
					<a
						:href="config.public.CONTACT.facebook"
						target="_blank"
						class="bg-green-700 hover:bg-green-600 p-4 rounded-xl transition-colors flex items-center gap-3"
					>
						<AppIconFacebook class="w-6 h-6 flex-shrink-0" />
						<div class="flex-1">
							<div class="font-semibold text-sm">Facebook</div>
							<div class="text-green-200 text-xs">
								Наша сторінка
							</div>
						</div>
					</a>
					<a
						:href="`https://wa.me/${config.public.CONTACT.whatsapp.replace(
							/\D/g,
							''
						)}`"
						target="_blank"
						class="bg-green-700 hover:bg-green-600 p-4 rounded-xl transition-colors flex items-center gap-3"
					>
						<AppIconWhatsApp class="w-6 h-6 flex-shrink-0" />
						<div class="flex-1">
							<div class="font-semibold text-sm">WhatsApp</div>
							<div class="text-green-200 text-xs">
								{{ config.public.CONTACT.whatsapp }}
							</div>
						</div>
					</a>
				</div>
			</div>
		</section>
	</div>
</template>
