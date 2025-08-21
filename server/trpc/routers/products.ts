import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import type { ProductType } from "~/utils";

export interface Product {
	id: string;
	name: string;
	description: string;
	type: ProductType;
	variety: string | null; // сорт
	price: number;
	unit: "кг" | "шт" | "пучок" | "л";
	stock: number;
	lastCollectionDate: string; // ISO date string
	images: string[];
	featured?: boolean;
}

export const products: Product[] = [
	// {
	// 	id: "1",
	// 	name: "Помідори",
	// 	description:
	// 		"Свіжі червоні помідори, вирощені без хімікатів. Соковиті та ароматні.",
	// 	type: "vegetable",
	// 	variety: "Червоний гігант",
	// 	price: 45,
	// 	unit: "кг",
	// 	stock: 15,
	// 	lastCollectionDate: "2025-08-18",
	// 	images: [],
	// },
	// {
	// 	id: "2",
	// 	name: "Огірки",
	// 	description:
	// 		"Хрусткі зелені огірки, ідеальні для салатів та консервування.",
	// 	type: "vegetable",
	// 	variety: "Ніжинський",
	// 	price: 35,
	// 	unit: "кг",
	// 	stock: 20,
	// 	lastCollectionDate: "2025-08-18",
	// 	images: [],
	// },
	// {
	// 	id: "3",
	// 	name: "Морква",
	// 	description: "Солодка оранжева морква, багата на вітаміни.",
	// 	type: "vegetable",
	// 	variety: "Каротель",
	// 	price: 25,
	// 	unit: "кг",
	// 	stock: 30,
	// 	lastCollectionDate: "2025-08-17",
	// 	images: [],
	// },
	// {
	// 	id: "4",
	// 	name: "Яблука",
	// 	description:
	// 		"Свіжі яблука з нашого саду. Ідеальні для дітей та дорослих.",
	// 	type: "fruit",
	// 	variety: "Голден",
	// 	price: 30,
	// 	unit: "кг",
	// 	stock: 25,
	// 	lastCollectionDate: "2025-08-16",
	// 	images: [],
	// 	featured: true,
	// },
	// {
	// 	id: "5",
	// 	name: "Картопля",
	// 	description: "Молода картопля з тонкою шкіркою. Розсипчаста та смачна.",
	// 	type: "vegetable",
	// 	variety: "Слов'янка",
	// 	price: 20,
	// 	unit: "кг",
	// 	stock: 50,
	// 	lastCollectionDate: "2025-08-15",
	// 	images: [],
	// },
	// {
	// 	id: "6",
	// 	name: "Полуниця",
	// 	description: "Ароматна червона полуниця. Ідеальна для десертів.",
	// 	type: "berry",
	// 	variety: "Вікторія",
	// 	price: 80,
	// 	unit: "кг",
	// 	stock: 8,
	// 	lastCollectionDate: "2025-08-18",
	// 	images: [],
	// },
	// {
	// 	id: "7",
	// 	name: "Зелень (петрушка)",
	// 	description: "Свіжа зелена петрушка для приправи страв.",
	// 	type: "herb",
	// 	variety: "Кучерява",
	// 	price: 15,
	// 	unit: "пучок",
	// 	stock: 12,
	// 	lastCollectionDate: "2025-08-18",
	// 	images: [],
	// },
	// {
	// 	id: "8",
	// 	name: "Кабачки",
	// 	description: "Молоді кабачки, ідеальні для смаження та тушкування.",
	// 	type: "vegetable",
	// 	variety: "Цукіні",
	// 	price: 28,
	// 	unit: "кг",
	// 	stock: 18,
	// 	lastCollectionDate: "2025-08-17",
	// 	images: [],
	// },
	{
		id: "9",
		name: "Груші",
		description:
			"Свіжі, соковиті груші з власного саду. Вирощені без використання хімічних добрив, тому вони є натуральними та смачними. Ідеальний вибір для тих, хто цінує якісні та екологічно чисті продукти.",
		type: "fruit",
		variety: "Мар'яна",
		price: 50,
		unit: "кг",
		stock: 15,
		lastCollectionDate: "2025-08-19",
		images: [
			"/images/peaches-vertical-2000x1400.jpg",
			"/images/peaches-2.jpg",
		],
		featured: true,
	},
	{
		id: "10",
		name: "Сушені груші",
		description: `Домашня, без хім.обробок груша порізана на часточки, зі шкіркою та видаленою насіннєвою камерою. Без додавання цукру. Із врожаю 2025 року.

Частинки сушеної груші не поступаються смаком і корисними якостями свіжому фрукту та навіть смачнііші, в міру солодкі та ароматні.

У сухофруктах збережені всі вітаміни, мінерали, органічне кислоти, флавоноїди. Великий вміст клітковини, а також фолієвої кислоти. У плодах груші накопичені вітаміни С, В, РР, Е, К, калій, йод, пектин, каротиноїди та інші.
необхідні для організму сполуки.

Лікувальні переваги натуральних часточок: покращують стан кишківника; підвищують опірність інфекцій; мають сечогінний і протизапальний ефект; позитивно впливають на серце та судини.

Кулінарне використання як окремий перекус чи ласощі; як добавка до вівсяної та інших каш, мюслі, у випічці, десертах, запіканках, кексах; ідеальний варіант для приготування компотів, киселів, узвару.`,
		type: "dried-fruit",
		variety: "Мар'яна",
		price: 200,
		unit: "кг",
		stock: 15,
		lastCollectionDate: "2025-08-21",
		images: ["/images/dried-peaches-1.jpg"],
		featured: true,
	},
];

export const productsRouter = router({
	getAll: publicProcedure.query(() => {
		return products;
	}),

	getFeatured: publicProcedure.query(() => {
		return products.filter((p) => p.featured);
	}),

	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(({ input }) => {
			return products.find((p) => p.id === input.id);
		}),

	getByType: publicProcedure
		.input(
			z.object({ type: z.enum(["fruit", "vegetable", "berry", "herb"]) })
		)
		.query(({ input }) => {
			return products.filter((p) => p.type === input.type);
		}),
});
