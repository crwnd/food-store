<template>
	<div class="min-h-[100dvh]">
		<LayoutHeaderDefault />
		<slot />
		<LayoutFooterDefault />
	</div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

useHeadSafe({
	title: config.public.STORE_NAME || "Квітневий врожай",
	meta: [
		{
			name: "description",
			content:
				"Ласкаво просимо до нашого інтернет-магазину свіжих овочів, фруктів та ягід з ферми. Замовляйте онлайн та отримуйте доставку додому.",
		},
	],
});
</script>
