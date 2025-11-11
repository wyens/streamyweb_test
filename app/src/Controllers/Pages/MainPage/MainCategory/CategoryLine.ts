import { Model } from "~/src/Base/Model";

export const PADDING_ON_CATEGORY_LIST = 50


class CategoryLine extends Model {

    private _layout: any = null;
    private _visible: boolean = false;
    // private _animatedX = new Animated.Value(0);
    // private _animatedWidth = new Animated.Value(0);
    private _sectionEnabled: boolean = false

    setSectionEnabled = (bool: boolean) => { 
        if(this._sectionEnabled === bool){
            return
        }
        this._sectionEnabled = bool
        this.updateMe()
    }
    get sectionEnabled(){
        return this._sectionEnabled
    }
    get layout(){
        return this._layout
    }

    get isVisible(){
        return this._visible
    }

    setVisible = (bool:any) => {
        if(this._visible===bool){
            return
        }
        this._visible  = bool
        this.updateMe()
    }

    setLayout = (layout: any) => {
        this._layout = layout;
        
        if(layout){
            // Reset and recreate if there are conflicts
            // this._animatedX.setValue(layout.x - 20);
            // this._animatedWidth.setValue(layout.width);
            
            // Then animate if needed
            // Animated.parallel([
            // Animated.timing(this._animatedX, {
            //     toValue: layout.x - PADDING_ON_CATEGORY_LIST,
            //     duration: 200,
            //     useNativeDriver: false,
            // }),
            // Animated.timing(this._animatedWidth, {
            //     toValue: layout.width,
            //     duration: 200,
            //     useNativeDriver: false,
            // })
            // ]).start();
        }
    }

    // get left(){
    //     return this._animatedX
    // }
    //
    // get width(){
    //     return this._animatedWidth
    // }

}

export { CategoryLine }