import { Model } from "~/src/Base/Model";


class IptvHeader extends Model {

    private _scrollRef: any;
    private _timeSlots: any

    setScrollRef = (ref:any) => {
        this._scrollRef = ref
    }

    get scrollRef(){
        return this._scrollRef
    }

    scrollHorizontally = (x:number) => {
        this._scrollRef?.scrollTo({ 
            x: x,      // horizontal scroll position
            y: 0,        // keep vertical position at 0
            animated: false 
        });
    };

    setTimeSlots = (timeSlots: any) => {
        this._timeSlots = timeSlots
    }

    get timeSlots(){
        return this._timeSlots
    }
}

export { IptvHeader }