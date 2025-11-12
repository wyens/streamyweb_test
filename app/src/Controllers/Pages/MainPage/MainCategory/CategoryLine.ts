import { Model } from "~/src/Base/Model";

export const PADDING_ON_CATEGORY_LIST = 50;

class CategoryLine extends Model {
    private _layout: any = null;
    private _visible = false;
    private _sectionEnabled = false;

    private _left = 0;
    private _width = 0;

    setSectionEnabled = (bool: boolean) => {
        if (this._sectionEnabled === bool) return;
        this._sectionEnabled = bool;
        this.updateMe();
    };

    get sectionEnabled() {
        return this._sectionEnabled;
    }
    get layout() {
        return this._layout;
    }
    get isVisible() {
        return this._visible;
    }

    setVisible = (bool: boolean) => {
        if (this._visible === bool) return;
        this._visible = bool;
        this.updateMe();
    };

    setLayout = (layout: any) => {
        const l =
            layout?.nativeEvent?.layout ??
            layout?.layout ??
            layout;

        if (!l) return;

        const { x = 0, width = 0 } = l;

        this._layout = l;

        this._left = Math.max(0, x);
        this._width = Math.max(0, width);

        this._visible = this._width > 0;

        this.updateMe();
    };

    get left() {
        return this._left;
    }
    get width() {
        return this._width;
    }
}

export { CategoryLine };