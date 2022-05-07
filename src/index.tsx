import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { ThemeProvider } from "./themes/themeProvider";
import { persistor, store } from "./app/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
