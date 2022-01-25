export enum status {
    open,
    closed,
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

export type unsubmittedItem = Omit<Item, "id" | "status" | "sequence">;
