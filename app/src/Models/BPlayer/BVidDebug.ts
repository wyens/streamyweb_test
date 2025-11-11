import { Model } from "../../Base/Model";


class BVidDebug extends Model {
    private _on: boolean = false
    private _items: Array<{name: string; type: "text"|"counter", value: any}> = []

    setItem = (name: string, value: any, type: "text"|"counter" = "text") => {
        const find = this._items.find(item => item.name === name)
        if(find){
            find.value = find.type ==="counter" ? find.value + 1 : value
        } else {
            this._items.push({name, type, value: type === "counter" ? 0 : value})
        }
        this.updateMe()
    }

    get items(){
        return this._items
    }

    get on(){
        return this._on
    }
}

export { BVidDebug }