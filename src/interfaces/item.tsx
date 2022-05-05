// pascalcase
export enum status {
    open = 1,
    closed = 2,
}

export interface Item {
    id: number;
    name: string;
    quantity: string;
    url: string;
    checked?: boolean;
    status: status;
    sequence: number;
    categoryId?: number;
}

export interface SequenceItem {
    id: number;
    sequence: number;
}

export type UnsubmittedItem = Omit<Item, "id" | "status" | "sequence">;
