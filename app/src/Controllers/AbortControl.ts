
type abortControlModel = {
    name:any;
    signal:any;
}

class AbortControl {

    private _items: Array<abortControlModel> = []


    setAbortSignal = (name: any, signal:any) => {
        const find = this._items.find(oi=>oi.name === name)
        if(find){
            find.signal = signal
        } else {
            this._items.push({name, signal})
        }
    }


    abortAll = () => {
        this._items.filter(oi=>oi.signal).forEach(oi=>{
            oi.signal.abort();
        })
    }
}



export { AbortControl }