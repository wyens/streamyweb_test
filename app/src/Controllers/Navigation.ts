import type { NavigateFunction } from "react-router";
import { HandleTask } from "../Base/HandleTask/HandleTask";
import {controllers} from "~/src/Controllers/Controllers";

type RouteMap = Record<string, string>;

class NavigatorImpl {
    private _navigate?: NavigateFunction;
    private _navigation: any;
    private readonly _handle: HandleTask;
    private _navigationMounded: boolean;
    private _saveScreen: string[];
    private _currentScreen = "";
    private _routeMap: RouteMap = {
        Movies: "/app/movies",
        MainListPage: "/app/home",
        VideoPlayerPage: "/app/player",
    };

    constructor() {
        this._handle = new HandleTask();
        this._navigationMounded = false;
        this._saveScreen = [];
    }

    setRouteMap(map: RouteMap) {
        this._routeMap = { ...this._routeMap, ...map };
    }

    setNavigate(navigate: NavigateFunction) {
        this._navigate = navigate;
        this._navigationMounded = true;
        this._handle.do();
    }

    private resolvePath(pageNameOrPath: string) {
        if (pageNameOrPath.startsWith("/")) return pageNameOrPath;
        return this._routeMap[pageNameOrPath] ?? `/${pageNameOrPath}`;
    }

    to(pathOrName: string, state?: any) {
        if (!this._navigate) return;
        const path = this.resolvePath(pathOrName);
        this.shiftScreen(path);
        this._navigate(path, state ? { state } : undefined);
        this.afterNavigation();
    }

    replace(pathOrName: string, state?: any) {
        if (!this._navigate) return;
        const path = this.resolvePath(pathOrName);
        this.shiftScreen(path);
        this._navigate(path, { replace: true, state });
        this.afterNavigation();
    }

    back() {
        if (this._saveScreen.length >= 2) {
            this._saveScreen.pop();
            const prev = this._saveScreen[this._saveScreen.length - 1];
            this.to(prev);
            return;
        }
        if (this._navigate) {
            (this._navigate as any)(-1);
            return;
        }
        this.to(this._routeMap.Movies ?? "/");
    }

    set = (navigation: any) => {
        this._navigation = navigation;
        this._navigationMounded = true;
        this._handle.do();
    };

    navigate = (pageNameOrPath: string, state?: any) => {
        if (this._navigate) {
            this.to(pageNameOrPath, state);
            return;
        }
        if (this._navigation?.navigate) {
            try {
                const target = this.resolvePath(pageNameOrPath);
                this.shiftScreen(target);
                this._navigation.navigate(target, { state });
                this.afterNavigation();
            } catch (e) {
                console.log("navigation error", e);
            }
        }
    };

    public goBack = () => {
        this.back();
    };

    get navigationMounted() { return this._navigationMounded; }
    get handle() { return this._handle; }
    get navigation() { return this._navigation; }
    get currentScreen() { return this._currentScreen; }

    clearFromHistory = (pageNameOrPath: string) => {
        const target = this.resolvePath(pageNameOrPath);
        this._saveScreen = this._saveScreen.filter((s) => s !== target);
        this._saveScreen.pop();
    };

    shiftScreen = (pageNameOrPath: string) => {
        const target = this.resolvePath(pageNameOrPath);
        if (this._currentScreen === target) return;
        this._saveScreen.push(target);
        this._currentScreen = target;
        if (this._saveScreen.length > 5) this._saveScreen.shift();
    };

    focusScreen = (pageNameOrPath: string) => {
        const target = this.resolvePath(pageNameOrPath);
        const lastOne = this._saveScreen[this._saveScreen.length - 1];
        if (target !== lastOne) this.shiftScreen(target);
    };

    afterNavigation = () => {};

    public goToLogout = (_data?: any) => {
        this.navigate("/", {});
    };

    public goToHomePage = (_data?: any) => {
        this.navigate("/home", {id: '1'});
    };
    public goToVideoPlayerPage = (channel: any) => {
        const currentChannelSelected = controllers().main.videoPlayerPage.initialChannel
        controllers().main.videoPlayerPage.initialChannel = channel;

        if (channel.onPressItem) {
            channel.onPressItem();
        }

        if(this._currentScreen == "VideoPlayerPage" && currentChannelSelected && currentChannelSelected.title != channel.title){
            controllers().main.videoPlayerPage.init()
        }
        this.navigate("/video");
    };
}

const key = "__app__navigator__";
const g = globalThis as any;
if (!g[key]) g[key] = new NavigatorImpl();

export function appNavigator() {
    return g[key] as NavigatorImpl;
}