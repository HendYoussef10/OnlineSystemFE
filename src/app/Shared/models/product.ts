import { Category } from "./Category";

export class Product {
    Id!: string;
    CategoryId!: string;
    Description!: string;
    Name!: string;
    NameEn!: string;
    HasAvailableStock: boolean = false;
    Price!: number;
    Image!: string;
    Category!: Category;
}