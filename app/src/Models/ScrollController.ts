import { Model } from "../Base/Model";

type scrollControllerModel = {
    onScroll?: (e:any)=>void;
    horizontal?: boolean;
}
type listenerType = "event"|"position"

class ScrollController extends Model {
    private _scrollRef:any;
    private _model: scrollControllerModel
    private _scrollHeight: number;
    private _pos: number;
    private _contentHeight: number;
    private _customListener : Array<{name: string; action: (pos: number)=>void, type: listenerType}> = []
    constructor(model: scrollControllerModel){
        super()
        this._model = model
        this._scrollRef = null
        this._pos = 0;
        this._scrollHeight = 0;
        this._contentHeight = 0;
    }
    get pos(){
        return this._pos
    }
    get scrollHeight(){
        return this._scrollHeight
    }
    get contentHeight(){
        return this._contentHeight
    }
    updateScrollHeight = (scrollHeight: number) => {
        this._scrollHeight = scrollHeight
    }

    onLayout = (e: any) => {
        var {y, height} = e.nativeEvent.layout;
        this._pos = y
        this._contentHeight = height;
    }
    setScrollRef = (ref: any) => {
        this._scrollRef = ref
        this.makeListeners()
    }
    get ref(){
        return this._scrollRef
    }

    scrollY = (y: any) => {
        if(this._scrollRef === null){
            return
        }
        this._pos = y
        if(this._scrollRef.scrollTo){
            this._scrollRef.scrollTo({
                x: 0,
                y: y,
                animated: false
            })
        }
        if (this._scrollRef.scrollToOffset) {
            this._scrollRef.scrollToOffset({
                offset: y, // horizontal scroll position
                animated: false
            });
            }
    }
    
    scrollX = (y: any) => {
        if(this._scrollRef === null){
            return
        }
        this._pos = y
        if(this._scrollRef.scrollTo){
            this._scrollRef.scrollTo({
                x: y,
                y: 0,
                animated: false
            })
        }
    }

    scroll = (y: number) => {
        if(this._scrollRef === null){
            return
        }
        this._pos = y
        if(this._scrollRef.scrollTo){
            this._scrollRef.scrollTo({
                x: y,
                y: y,
                animated: false
            })
        }
    }

    updateParams = (y: number, height: number) => {
        this._pos = y
        this._scrollHeight = height
    }
    onScroll = (event: any) => {
        const target = event?.currentTarget || event?.target || this._scrollRef;

        if (!target) return;

        if (this._model.horizontal) {
            this._pos = target.scrollLeft ?? 0;
            this._scrollHeight = target.clientWidth ?? 0;
            this._contentHeight = target.scrollWidth ?? 0;
        } else {
            this._pos = target.scrollTop ?? 0;
            this._scrollHeight = target.clientHeight ?? 0;
            this._contentHeight = target.scrollHeight ?? 0;
        }

        if (this._model.onScroll) {
            this._model.onScroll(event);
        }

        this.makeAllActions(this._pos, event);
    };
    // onScroll = (event: any) => {
    //     const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent
    //     // const {y, height} = event.nativeEvent.contentOffset
    //     this._pos = this._model.horizontal ? contentOffset.x : contentOffset.y
    //     this._scrollHeight = this._model.horizontal ? layoutMeasurement.width :layoutMeasurement.height
    //     this._contentHeight = this._model.horizontal ? contentSize.width :  contentSize.height
    //     if(this._model.onScroll){
    //         this._model.onScroll(event)
    //     }
    //     this.makeAllActions(this._pos, event)
    // }

    makeAllActions = (pos: any, event: any) => {
        this._customListener.forEach(e=>{
            e.action(e.type === "event" ? event : pos)
        })
    }

    setCustomListener = (_func: (pos: number)=>void, name: string, type: listenerType) => {
        const find = this._customListener.find(f=>f.name === name)
        if(find){
            find.action = _func
        } else {
            this._customListener.push({name, action: _func, type})
        }
    }

    clearOneListener = (name: string) => {
        this._customListener = this._customListener.filter(f=>f.name!==name)
    }

    makeListeners = () => {
        // if(this._model.onScroll && this._scrollRef !== null){
        //     this._scrollRef.addEventListener('scroll', this._model.onScroll)
        // }
    }
    removeListeners = () => {
        // if(this._model.onScroll){
        //     this._scrollRef.removeEventListener('scroll', this._model.onScroll)
        // }
    }

    getHeight = () => {
        if(this._scrollRef === null){
            return
        }
        try {
            return this._scrollRef.offsetHeight 
        } catch(e) {
            console.error("Height null")
            return null
        }
    }
    getWidth = () => {
        if(this._scrollRef === null){
            return
        }
        try {
            return this._scrollRef.offsetWidth
        } catch(e) {
            console.error("Height null")
            return null
        }
    }
    
}

export { ScrollController }