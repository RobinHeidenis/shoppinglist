export enum status {
    open,
    closed
}

export default interface Item {
    id: number;
    name: string;
    quantity?: string;
    url?: string;
    checked?: boolean;
    status: status;
    sequence: number;
}

export interface SequenceItem {
    id: number;
    sequence: number;
}

export type unsubmittedItem = Omit<Item, 'id'|'status'|'sequence'>;

