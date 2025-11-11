import type { NavigateFunction } from "react-router";
import { HandleTask } from "../Base/HandleTask/HandleTask";

class NavigatorImpl {
    private _navigate?: NavigateFunction;
    private _navigation: any;
    private readonly _handle: HandleTask;
    private _navigationMounded: boolean;
    private _saveScreen: Array<string>;
    private _currentScreen: string = '';

    constructor() {
        this._handle = new HandleTask();
        this._navigationMounded = false;
        this._saveScreen = [];
    }

    setNavigate(navigate: NavigateFunction) {
        this._navigate = navigate;
        this._navigationMounded = true;
        this._handle.do();
    }
    isReady() { return !!this._navigate; }

    to(path: string, state?: any) {
        if (!this._navigate) return;
        this.shiftScreen(path);
        this._navigate(path, state ? { state } : undefined);
        this.afterNavigation();
    }
    replace(path: string, state?: any) {
        if (!this._navigate) return;
        this.shiftScreen(path);
        this._navigate(path, { replace: true, state });
        this.afterNavigation();
    }
    back() {
        this._navigate?.(-1 as any);
    }

    set = (_navigation: any) => {
        this._navigation = _navigation;
        this._navigationMounded = true;
        this._handle.do();
    };

    navigate = (pageName: string) => {
        if (this._navigate) {
            this.to(pageName);
            return;
        }
        if (this._navigation?.navigate) {
            try {
                this.shiftScreen(pageName);
                this._navigation.navigate(pageName);
                this.afterNavigation();
            } catch (e) {
                console.log("navigation error", e);
            }
        }
    };

    public goBack = () => {
        if (this._navigate) this.back();
        else this._navigation?.goBack?.();
    };

    get navigationMounted() { return this._navigationMounded; }
    get handle() { return this._handle; }
    get navigation() { return this._navigation; }
    get currentScreen() { return this._currentScreen; }

    clearFromHistory = (pageName: string) => {
        this._saveScreen = this._saveScreen.filter((s) => s !== pageName);
        this._saveScreen.pop();
    };

    shiftScreen = (pageName: string) => {
        if (this._currentScreen === pageName) return;
        this._saveScreen.push(pageName);
        this._currentScreen = pageName;
        if (this._saveScreen.length > 5) {
            this._saveScreen.shift();
        }
    };

    focusScreen = (pageName: string) => {
        const lastOne = this._saveScreen[this._saveScreen.length - 1];
        if (pageName !== lastOne) this.shiftScreen(pageName);
    };

    afterNavigation = () => {};


    public goToHomePage = (_data?: any) => {
        this.navigate("/home");
    };

    public goToVideoPlayerPage = (_channel: any) => {
        this.navigate("/player");
    };
}

const key = "__app__navigator__";
const g = globalThis as any;
if (!g[key]) g[key] = new NavigatorImpl();

export function appNavigator(): NavigatorImpl {
    return g[key] as NavigatorImpl;
}