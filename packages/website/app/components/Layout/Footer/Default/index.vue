<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
	<footer class="bg-green-800 text-white py-12">
		<div class="max-w-screen-xl mx-auto px-4">
			<div class="grid md:grid-cols-4 gap-8">
				<!-- Brand -->
				<div class="col-span-2 md:col-span-1">
					<div class="flex items-center mb-4">
						<div
							class="mr-3 h-8 w-8 bg-green-600 rounded-full flex items-center justify-center"
						>
							<span class="text-white font-bold text-lg">🌱</span>
						</div>
						<span class="text-xl font-bold">
							{{ $config.public.STORE_NAME }}
						</span>
					</div>
					<p class="text-green-200 text-sm leading-relaxed">
						Свіжі овочі та фрукти прямо з грядки та саду. Вирощуємо
						з любов'ю, доставляємо з турботою.
					</p>
				</div>

				<!-- Contact Info -->
				<div>
					<h3 class="text-lg font-semibold mb-4">Контакти</h3>
					<div class="space-y-3 text-sm">
						<div class="flex items-center">
							<span class="mr-2">📍</span>
							<span class="text-green-200">
								{{ $config.public.STORE_LOCATION.region }}
							</span>
						</div>
						<div class="flex items-center">
							<span class="mr-2">📞</span>
							<a
								:href="`tel:${$config.public.CONTACT.phone}`"
								class="text-green-200 hover:text-white transition-colors"
							>
								{{ $config.public.CONTACT.phone }}
							</a>
						</div>
						<div class="flex items-center">
							<span class="mr-2">
								<AppIconTelegram class="w-5 h-5" />
							</span>
							<a
								:href="`https://t.me/${$config.public.CONTACT.telegram.replace(
									'@',
									''
								)}`"
								target="_blank"
								class="text-green-200 hover:text-white transition-colors"
							>
								{{ $config.public.CONTACT.telegram }}
							</a>
						</div>
					</div>
				</div>

				<!-- Quick Links -->
				<div>
					<h3 class="text-lg font-semibold mb-4">Швидкі посилання</h3>
					<div class="space-y-2 text-sm">
						<NuxtLink
							to="/"
							class="block text-green-200 hover:text-white transition-colors"
						>
							Головна
						</NuxtLink>
						<NuxtLink
							to="/catalog"
							class="block text-green-200 hover:text-white transition-colors"
						>
							Каталог
						</NuxtLink>
						<a
							:href="`tel:${$config.public.CONTACT.phone}`"
							class="block text-green-200 hover:text-white transition-colors"
						>
							Замовити
						</a>
					</div>
				</div>

				<!-- Social Media -->
				<div>
					<h3 class="text-lg font-semibold mb-4">Соціальні мережі</h3>
					<div class="flex space-x-4">
						<a
							:href="`https://t.me/${$config.public.CONTACT.telegram.replace(
								'@',
								''
							)}`"
							target="_blank"
							class="bg-green-700 hover:bg-green-600 p-3 rounded-lg transition-colors"
							title="Telegram"
						>
							<AppIconTelegram class="w-5 h-5" />
						</a>
						<a
							:href="$config.public.CONTACT.facebook"
							target="_blank"
							class="bg-green-700 hover:bg-green-600 p-3 rounded-lg transition-colors"
							title="Facebook"
						>
							<AppIconFacebook class="w-5 h-5" />
						</a>
						<a
							:href="`https://wa.me/${$config.public.CONTACT.whatsapp.replace(
								/\D/g,
								''
							)}`"
							target="_blank"
							class="bg-green-700 hover:bg-green-600 p-3 rounded-lg transition-colors"
							title="WhatsApp"
						>
							<AppIconWhatsApp class="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>

			<!-- Delivery Info -->
			<div class="mt-8 pt-8 border-t border-green-700">
				<div class="grid md:grid-cols-2 gap-6 text-sm">
					<div>
						<h4 class="font-semibold text-green-200 mb-2">
							Доставка:
						</h4>
						<p class="text-green-300">
							🧺 Самовивіз з ферми (безкоштовно)<br />
							📦 Доставка поштовими службами (Нова Пошта чи
							Укрпошта) (за тарифами сервісу)<br />
							🚚 Доставка через Uklon/Bolt (за тарифами сервісу)
							(зона доставки:
							{{ $config.public.STORE_LOCATION.town }} та
							{{ $config.public.STORE_LOCATION.region }})
						</p>
					</div>
					<div>
						<h4 class="font-semibold text-green-200 mb-2">
							Режим роботи:
						</h4>
						<p class="text-green-300">
							🕐 Щоденно: 7:00 - 19:00<br />
							📞 Замовлення приймаємо до 18:00<br />
							🌱 Збір врожаю: щоранку о 6:00
						</p>
					</div>
				</div>
			</div>

			<!-- Copyright -->
			<div class="mt-8 pt-8 border-t border-green-700 text-center">
				<p class="text-green-200 text-sm">
					© 2025 {{ $config.public.STORE_NAME }}. Всі права захищені.
				</p>
				<p class="text-green-300 text-xs mt-2">
					Свіжість гарантована 🌱 Вирощено з любов'ю в Україні 🇺🇦
				</p>
			</div>
		</div>
	</footer>
</template>
