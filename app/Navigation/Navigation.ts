import type { NavigateFunction } from "react-router";

class NavigatorImpl {
    private _navigate?: NavigateFunction;

    setNavigate(navigate: NavigateFunction) {
        this._navigate = navigate;
    }

    to(path: string, state?: any) {
        this._navigate?.(path, state ? { state } : undefined);
    }

    replace(path: string, state?: any) {
        this._navigate?.(path, { replace: true, state });
    }

    back() {
        this._navigate?.(-1 as any);
    }

    isReady() {
        return !!this._navigate;
    }
}

const key = "__app__navigator__";
const g = globalThis as any;
if (!g[key]) g[key] = new NavigatorImpl();

export function appNavigator() {
    return g[key] as NavigatorImpl;
}