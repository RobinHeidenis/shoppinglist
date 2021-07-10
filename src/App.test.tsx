import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("app gets sent to login screen", () => {
    render(<App />);
});
