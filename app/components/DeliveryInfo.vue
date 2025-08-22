<script setup lang="ts">
const config = useRuntimeConfig();
</script>
<template>
	<section class="py-16 bg-green-50">
		<div class="max-w-screen-xl mx-auto px-4 text-center">
			<h2 class="text-3xl font-bold text-green-800 mb-8">
				Доставка та оплата
			</h2>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="bg-white p-6 rounded-xl shadow-lg">
					<div class="text-4xl mb-4">🚗</div>
					<h3 class="text-xl font-semibold text-green-700 mb-3">
						Самовивіз
					</h3>
					<p class="text-gray-600">Безкоштовно з ферми</p>
				</div>
				<div class="bg-white p-6 rounded-xl shadow-lg">
					<div class="text-4xl mb-4">📦</div>
					<h3 class="text-xl font-semibold text-green-700 mb-3">
						Доставка
					</h3>
					<p class="text-gray-600">
						Нова Пошта, Укрпошта, Uklon, Bolt
					</p>
				</div>
				<div class="bg-white p-6 rounded-xl shadow-lg">
					<div class="text-4xl mb-4">💰</div>
					<h3 class="text-xl font-semibold text-green-700 mb-3">
						Оплата
					</h3>
					<p class="text-gray-600">Готівкою чи карткою</p>
				</div>
			</div>
		</div>
	</section>
</template>
