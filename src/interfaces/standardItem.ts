import { Category } from "./category";

export interface StandardItem {
    id: number;
    name: string;
    quantity: string | null;
    url: string | null;
    categoryId: number;
    category: Category;
}
