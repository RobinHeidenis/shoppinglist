import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export interface RequestParams {
    path: string;
    data?: Record<string, unknown>;
}

export default function useRequest(): [(params: RequestParams) => Promise<Record<string, any>>] {
    const { push } = useHistory();

    const request = useCallback(
        async ({ path, data }: RequestParams): Promise<Record<string, any>> => {
            return fetch(process.env.REACT_APP_API_URL + path, {
                method: data ? "POST" : "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
                ...(data ? { body: JSON.stringify(data) } : {}),
            })
                .then((r) => r.json())
                .catch((e) => {
                    console.error(e);
                    push("/login");
                });
        },
        [push]
    );

    if (!process.env.REACT_APP_API_URL) throw new Error("EVENTS_URL environment variable has not been set.");

    return [request];
}
