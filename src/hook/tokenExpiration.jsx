import { useEffect } from "react";

export default function useTokenExpiration(tokenExpire, onExpire) {
    useEffect(() => {
        if(!tokenExpire) return;

        const time = tokenExpire * 1000;
        const timeout = time - Date.now();

        if(timeout > 0)
        {
            const timer = setTimeout(() =>{
                onExpire();
            }, timeout)

            return () => clearTimeout(timer);
        }
        else onExpire();

    }, [tokenExpire, onExpire]);
}