import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Router } from "react-router-dom";
import { ShoppingList } from "./pages/shoppingList/shoppingList";
import { Item, SequenceItem } from "./interfaces/item";
import { CssBaseline } from "@material-ui/core";
import BonusCard from "./pages/bonus/bonus";
import Settings from "./pages/settings/settings";
import { ShoppingListContext } from "./contexts/ShoppingListContext";
import LoginForm from "./pages/login/LoginForm";
import history from "./components/lib/history";
import { SSEvent } from "./interfaces/event";
import { NavbarContext } from "./contexts/NavbarContext";

function App(): JSX.Element {
    const [items, setItems] = useState<Item[]>([]);
    const [isOnItemList, setIsOnItemList] = useState(false);
    const [hasBackButton, setHasBackButton] = useState(false);
    const [title, setTitle] = useState("");

    const setupEventSource = () => {
        if (!process.env.REACT_APP_EVENTS_URL) throw new Error("EVENTS_URL environment variable has not been set.");
        const es = new EventSource(process.env.REACT_APP_EVENTS_URL);

        es.addEventListener("updateItemStatus", (event: SSEvent) => {
            if (!event.data) return;
            const { id, status }: Item = JSON.parse(event.data);
            setItems((old) => old.map((item) => (item.id === id ? { ...item, status } : item)));
        });

        es.addEventListener("deleteItem", (event: SSEvent) => {
            if (!event.data) return;
            const { id }: Item = JSON.parse(event.data);
            setItems((old) => old.filter((item) => item.id !== id));
        });

        es.addEventListener("addItem", (event: SSEvent) => {
            if (!event.data) return;
            const result: Item = JSON.parse(event.data);
            setItems((old) => old.concat(result));
        });

        es.addEventListener("updateItem", (event: SSEvent) => {
            if (!event.data) return;
            const { id, name, quantity, url }: Item = JSON.parse(event.data);
            setItems((old) => old.map((item) => (item.id === id ? { ...item, name, quantity, url } : item)));
        });

        es.addEventListener("updateItemSequence", (event: SSEvent) => {
            if (!event.data) return;
            const newSequenceArray: SequenceItem[] = JSON.parse(event.data);
            setItems((old) => {
                return old
                    .map((item) => {
                        const { sequence: newSequence } = newSequenceArray.find((it) => it.id === item.id)!;
                        item.sequence = newSequence;
                        return item;
                    })
                    .sort((a, b) => a.sequence - b.sequence);
            });
        });

        es.addEventListener("deleteAllItems", () => {
            setItems([]);
        });

        return es;
    };

    useEffect(() => {
        let es = setupEventSource();

        es.onerror = () => (es = setupEventSource());

        return () => {
            if (es.readyState && es.readyState === 1) es.close();
        };
    }, []);

    return (
        <div>
            <CssBaseline />
            <ShoppingListContext.Provider value={{ items, setItems }}>
                <NavbarContext.Provider value={{ title, setTitle }}>
                    <Router history={history}>
                        <NavBar isOnItemList={isOnItemList} hasBackButton={hasBackButton} />
                        <Route path="/bonuscard" exact>
                            <BonusCard setHasBackButton={setHasBackButton} />
                        </Route>
                        <Route path="/settings">
                            <Settings />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route exact path="/">
                            <ShoppingList setIsOnItemList={setIsOnItemList} />
                        </Route>
                    </Router>
                </NavbarContext.Provider>
            </ShoppingListContext.Provider>
        </div>
    );
}

export default App;
