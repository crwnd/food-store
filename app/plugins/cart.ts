export default defineNuxtPlugin(() => {
	const cartStore = useCartStore();
	cartStore.loadCart();
});
