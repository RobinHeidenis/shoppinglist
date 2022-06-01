import { useEffect, useRef } from "react";

export const usePrevious = (value: unknown): undefined => {
    const ref = useRef();
    useEffect(() => {
        // @ts-expect-error this is a hook that was written by my friend Koen so I'm not exactly sure what it even does
        ref.current = value;
    });
    return ref.current;
};
