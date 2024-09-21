import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LIMIT_OPTIONS } from "@/consts/limit";
import type { Limit } from "@/store/pokemonListStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/** 表示件数の型をガード */
export const isValidLimit = (value: number): value is Limit => {
  return LIMIT_OPTIONS.includes(value as Limit);
};
