import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./themes/themeProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
