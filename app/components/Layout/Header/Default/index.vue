<script setup lang="ts">
import { LayoutGrid, Menu, ShoppingCart } from "lucide-vue-next";

const config = useRuntimeConfig();
const cartStore = useCartStore();
const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
	showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
	<header
		class="h-16 w-full flex flex-col justify-center sticky top-0 bg-white shadow-sm border-b border-green-100 z-50"
	>
		<nav class="px-4 lg:px-6">
			<div
				class="h-full flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
			>
				<NuxtLink
					to="/"
					class="flex items-center"
					aria-label="Головна сторінка"
				>
					<div
						class="mr-3 h-8 w-8 bg-green-600 rounded-full flex items-center justify-center"
					>
						<span class="text-white font-bold text-lg">🌱</span>
					</div>
					<span
						class="hidden 2xs:block self-center md:text-xl font-bold text-green-800 text-lg"
					>
						{{ config.public.STORE_NAME }}
					</span>
				</NuxtLink>

				<div
					class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
				>
					<ul
						class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
					>
						<li>
							<NuxtLink
								to="/catalog"
								class="flex flex-row items-center gap-2 py-2 pr-4 pl-3 text-green-800 hover:text-green-600 lg:p-0 transition-colors"
								active-class="text-green-600 font-semibold"
							>
								<LayoutGrid />
								Каталог
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/cart"
								class="flex flex-row items-center gap-2 py-2 pr-4 pl-3 text-green-800 hover:text-green-600 lg:p-0 transition-colors"
								active-class="text-green-600 font-semibold"
							>
								<div class="relative">
									<ShoppingCart />
									<span
										v-if="cartStore.itemCount > 0"
										class="absolute -top-3 -right-3 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
									>
										{{
											cartStore.itemCount > 99
												? "99+"
												: cartStore.itemCount
										}}
									</span>
								</div>
								Кошик
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="flex items-center space-x-4 lg:hidden">
					<NuxtLink
						to="/catalog"
						class="relative p-2 text-green-800 hover:text-green-600 transition-colors"
						aria-label="Каталог"
					>
						<LayoutGrid class="w-6 h-6" />
					</NuxtLink>
					<NuxtLink
						to="/cart"
						class="relative p-2 text-green-800 hover:text-green-600 transition-colors"
						aria-label="Кошик"
					>
						<ShoppingCart class="w-6 h-6" />
						<span
							v-if="cartStore.itemCount > 0"
							class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
						>
							{{
								cartStore.itemCount > 99
									? "99+"
									: cartStore.itemCount
							}}
						</span>
					</NuxtLink>
					<!-- 
					<button
						class="p-2 text-green-800"
						title="Меню"
						@click="toggleMobileMenu"
					>
						<Menu class="w-6 h-6" />
					</button> -->
				</div>
			</div>

			<!-- Mobile Menu -->
			<div
				v-if="false"
				class="lg:hidden border-t border-green-100 bg-white"
			>
				<ul class="flex flex-col py-4 px-4 space-y-2">
					<li>
						<NuxtLink
							to="/catalog"
							class="block py-2 text-green-800 hover:text-green-600 transition-colors"
							active-class="text-green-600 font-semibold"
							@click="showMobileMenu = false"
						>
							Каталог
						</NuxtLink>
					</li>
					<li>
						<NuxtLink
							to="/cart"
							class="block py-2 text-green-800 hover:text-green-600 transition-colors"
							active-class="text-green-600 font-semibold"
							@click="showMobileMenu = false"
						>
							Кошик
						</NuxtLink>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>
