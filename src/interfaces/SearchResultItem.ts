export interface SearchResultItem {
    id: number;
    name: string;
    url: string;
    imageUrl: string;
    price: {
        amount: number;
        unitSize: string;
    };
    checked: boolean;
}
