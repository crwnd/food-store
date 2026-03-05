<script setup lang="ts">
import type { NuxtError } from "#app";

const config = useRuntimeConfig();

const props = defineProps({
	error: Object as () => NuxtError,
});

useHeadSafe({
	title: `Сторінка не знайдена - ${config.public.STORE_NAME}`,
	meta: [
		{
			name: "description",
			content:
				"Сторінка не знайдена. Поверніться на головну сторінку або переглядайте наш каталог свіжих продуктів.",
		},
	],
});
</script>

<template>
	<div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
		<div class="text-center max-w-md mx-auto">
			<div class="text-8xl mb-8">🌱</div>
			<h1 class="text-4xl font-bold text-green-800 mb-4">
				{{ error?.statusCode || "404" }}
			</h1>
			<!-- <h2 class="text-2xl font-semibold text-gray-700 mb-6">
				{{ error?.statusCode || "Сторінка не знайдена" }}
			</h2> -->
			<p class="text-gray-600 mb-8 leading-relaxed">
				{{
					error?.message ||
					"На жаль, сторінка, яку ви шукаєте, не існує. Можливо, вона була видалена або ви ввели неправильну адресу."
				}}
				<!-- {{ error?.stack }} -->
			</p>

			<div class="space-y-4">
				<NuxtLink
					to="/"
					class="block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
				>
					🏠 На головну
				</NuxtLink>
				<NuxtLink
					to="/catalog"
					class="block border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
				>
					🛍️ Переглянути каталог
				</NuxtLink>
				<a
					:href="`tel:${config.public.CONTACT.phone}`"
					class="block text-green-600 hover:text-green-800 font-medium"
				>
					📞 Зв'язатися з нами
				</a>
			</div>
		</div>
	</div>
</template>
