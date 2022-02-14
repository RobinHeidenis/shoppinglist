import { SSEvent } from "../interfaces/event";
import { Item, SequenceItem } from "../interfaces/item";
import { Store } from "@reduxjs/toolkit";

export const setupEventSource = (store: Store) => {
    // const items: Item[] = store.getState().items.items;

    if (!process.env.REACT_APP_EVENTS_URL) throw new Error("EVENTS_URL environment variable has not been set.");
    const es = new EventSource(process.env.REACT_APP_EVENTS_URL);

    es.addEventListener("updateItemStatus", (event: SSEvent) => {
        if (!event.data) return;
        const { id, status }: Item = JSON.parse(event.data);
        // store.dispatch(updateItemStatus({ id, status }));
    });

    es.addEventListener("deleteItem", (event: SSEvent) => {
        if (!event.data) return;
        const { id }: Item = JSON.parse(event.data);
        // store.dispatch(removeItem(id));
    });

    es.addEventListener("addItem", (event: SSEvent) => {
        if (!event.data) return;
        const result = JSON.parse(event.data);
        // store.dispatch(addItem(result[0]));
    });

    es.addEventListener("updateItem", (event: SSEvent) => {
        if (!event.data) return;
        const { id, name, quantity, url }: Item = JSON.parse(event.data);
        // store.dispatch(setItems(items.map((item) => (item.id === id ? { ...item, name, quantity, url } : item))));
    });

    es.addEventListener("updateItemSequence", (event: SSEvent) => {
        if (!event.data) return;
        const newSequenceArray: SequenceItem[] = JSON.parse(event.data);
        // store.dispatch(
        //     setItems(
        //         items
        //             .map((item) => {
        //                 const { sequence: newSequence } = newSequenceArray.find((it) => it.id === item.id)!;
        //                 item.sequence = newSequence;
        //                 return item;
        //             })
        //             .sort((a, b) => a.sequence - b.sequence)
        //     )
        // );
    });

    es.addEventListener("deleteAllItems", () => {
        // store.dispatch(removeAllItems());
    });

    return es;
};
