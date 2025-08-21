import { router } from "~~/server/trpc/trpc";
import { productsRouter } from "./products";

export const appRouter = router({
	products: productsRouter,
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
