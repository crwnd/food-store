import type { ZodError, ZodIssue, z } from "zod";

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const padToTwoDigits = (number: number | string) => {
	return number?.toString().length <= 1 ? `0${number}` : `${number}`;
};
export const roundNumber = (num: number, digits = 2) =>
	num ? Math.round(num * 10 ** digits) / 10 ** digits : 0;

export const getRandomArbitrary = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

export const zodErrorsFlatten = (errors?: ZodError<any>) => {
	const fieldErrors: Record<string, z.core.$ZodIssue[]> = {};
	errors?.issues.forEach((error) => {
		const path = error.path.join(".");
		if (!fieldErrors[path]) {
			fieldErrors[path] = [];
		}
		fieldErrors[path].push(error);
	});
	return fieldErrors;
};

export const assertInt = (input: number) => {
	if (typeof input === "number" && input >= 2147483647) {
		throw new Error("Integer overflow");
	}
};

export const arraysDiff = <T>(a: T[] | null, b: T[] | null) => {
	const aSet = new Set(a ?? []);
	const bSet = new Set(b ?? []);
	const diff = new Set([...aSet].filter((x) => !bSet.has(x)));
	return Array.from(diff);
};

export const formatTimeAgo = (datetime: string) => {
	const date = new Date(datetime);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(weeks / 4);
	const years = Math.floor(months / 12);

	if (years > 0) {
		return `${years} year${years > 1 ? "s" : ""} ago`;
	}
	if (months > 0) {
		return `${months} month${months > 1 ? "s" : ""} ago`;
	}
	if (weeks > 0) {
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	}
	if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	}
	if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	}
	if (minutes > 0) {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	}
	if (seconds > 0) {
		return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
	}
	return "just now";
};

export const getFieldInsensitive = <T extends Record<string, any>>(
	obj: T,
	field: string
) => {
	const keys = Object.keys(obj);
	const key = keys.find(
		(k) => k.toLowerCase().trim() === field.toLowerCase()
	);
	return key ? obj[key] : undefined;
};

export const findFirstFieldValueInsensitive = (
	objects: Record<string, number | string>[],
	keys: string[]
) => {
	for (const object of objects) {
		for (const k of keys) {
			const value = getFieldInsensitive(object, k);
			if (value) {
				return value;
			}
		}
	}
	return null;
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("uk-UA", {
		day: "numeric",
		month: "long",
	});
};

export const getStockStatus = (stock: number) => {
	if (stock > 10) return { text: "В наявності", class: "text-green-600" };
	if (stock > 0)
		return { text: "Залишається мало", class: "text-orange-600" };
	return { text: "Немає в наявності", class: "text-red-600" };
};

export type ProductType =
	| "all"
	| "vegetable"
	| "fruit"
	| "berry"
	| "herb"
	| "dried-fruit";
export const productTypes: { value: ProductType; label: string }[] = [
	{ value: "all", label: "Всі продукти" },
	{ value: "vegetable", label: "Овочі" },
	{ value: "fruit", label: "Фрукти" },
	{ value: "berry", label: "Ягоди" },
	{ value: "herb", label: "Зелень" },
	{ value: "dried-fruit", label: "Сушені фрукти" },
];
