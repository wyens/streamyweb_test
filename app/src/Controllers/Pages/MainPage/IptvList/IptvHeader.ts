import { Model } from "~/src/Base/Model";
import React from "react";

class IptvHeader extends Model {
    private _scrollRef: any;
    private _timeSlots: any;
    private _setOnScroll: any;

    setScrollRef = (ref: any) => {
        this._scrollRef = ref?.current || ref || null;
    };

    get scrollRef() {
        return this._scrollRef;
    }

    scrollHorizontally = (x: number) => {
        const el = this._scrollRef;
        if (!el) return;

        if (typeof el.scrollTo === "function") {
            el.scrollTo({ left: x, top: 0, behavior: "auto" as ScrollBehavior });
        } else {
            try {
                el.scrollLeft = x;
            } catch {}
        }
    };

    setTimeSlots = (timeSlots: any) => {
        this._timeSlots = timeSlots;
    };

    get timeSlots() {
        return this._timeSlots;
    }

    setOnScroll = (method) => {
        this._setOnScroll = method;
    };

    public onHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
        this._setOnScroll && this._setOnScroll(e)
    };
}

export { IptvHeader };