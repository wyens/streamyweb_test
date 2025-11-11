

class Timeout {

    private _timeoutHandler: any
    private _miliseconds: number;

    constructor(miliseconds: number){
        this._miliseconds = miliseconds
        this._timeoutHandler = null
    }

    set = (some: ()=>void) => {
        if(this._timeoutHandler !== null){
            this.clear()
        }
        this._timeoutHandler = setTimeout(some, this._miliseconds)
    }

    clear = () => {
        clearTimeout(this._timeoutHandler)
        this._timeoutHandler = null
    }

    
}

export { Timeout }