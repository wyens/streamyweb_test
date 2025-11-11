import { Model } from "../Base/Model";
import { controllers } from "../Controllers/Controllers";

type listenerType = "event"|"position"

class PageScroll extends Model {

    private _maxHeight: number;
    private _scrollRef: any;
    private _isKeyboard: boolean;
    private _pos: number = 0;
    private _scrollHeight: number = 0;
    private _contentHeight: number = 0;
    private _customListener : Array<{name: string; action: (pos: number)=>void, type: listenerType}> = []
    private _scrollEnabled: boolean = true;

    constructor(){
        super()
        this._maxHeight = 0
        this._scrollRef = null
        this._isKeyboard = false
    }

    get scrollRef(){
        return this._scrollRef
    }
    setScrollRef = (ref: any) => {
        this._scrollRef = ref
    }
    tryOnScroll = (e:any)=>{
        if(this._customListener.length > 0){
            this.onScroll(e)
        }
        // console.error("Try on scroll", e)
    }
    scroll = (y: number = 0, x:number = 0) => {
        try{
            this._scrollRef.scrollTo({x,y,animated:false})
        } catch(e){
            // console.error("SCROL REF", this._scrollRef)
        }
    } 
    // scrollToEnd = () => 

    get maxHeight(){
        return this._maxHeight
    }

    setMaxHeight = (maxHeight: number) => {
        if(this._maxHeight === maxHeight){
            return
        }
        this._maxHeight = maxHeight
        this.updateMe()
    }

    setIsKeyboard = (bool: boolean) => {
        if(this._isKeyboard === bool) {
            return
        }
        this._isKeyboard = bool
    }
    
    get isKeyboard(){
        return this._isKeyboard
    }

    keyboardOpen = () => {
        this.setIsKeyboard(true)
        this.setMaxHeight(controllers().media.screen.shortHeight)
    }
    keyboardClose = () => {
        this.setIsKeyboard(false)
        this.setMaxHeight(controllers().media.screen.normalHeight)
    }

    toNormalSize = () => {
        this.setMaxHeight(controllers().media.screen.h)
    }

    onScroll = (event: any) => {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent
        // const {y, height} = event.nativeEvent.contentOffset
        this._pos = contentOffset.y
        this._scrollHeight = layoutMeasurement.height
        this._contentHeight =  contentSize.height
        this.makeAllActions(this._pos, event)
    }

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

    get scrollEnabled(){
        return this._scrollEnabled
    }

    setScrollEnabled = (bool: boolean) =>{
        if(this._scrollEnabled === bool){
            return
        }
        this._scrollEnabled = bool
        this.updateMe()
    }
}

export { PageScroll }