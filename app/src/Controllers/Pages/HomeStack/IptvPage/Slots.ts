import {Model} from "~/src/Base/Model";
import {OneTimeSlot, type timeSlotModel} from "~/src/Controllers/Pages/HomeStack/IptvPage/OneTimeSlot";
import {timeParse} from "~/src/Helpers/DateTime";


class Slots extends Model {
    private _items: Array<timeSlotModel> = [];
    private _slots: Array<OneTimeSlot> = []

    private _visibleItemsCount: number = 12;

    get visibleItemsCount(){
      return this._visibleItemsCount
    }
    set visibleItemsCount(val){
      this._visibleItemsCount = val
    }

    loadNext = () => { 
      this._visibleItemsCount = this._visibleItemsCount+5;
      this.updateMe()
    }

    get items(){
        return this._items
    }
    set items(val){
        this._items = val
    }

    get slots(){
      // console.log("GET SLOTS", this._visibleItemsCount, this._slots?.splice(0, this._visibleItemsCount))
      // return this._slots.filter((os:any,i:number)=>i<this._visibleItemsCount)
      return this._slots
    }
    set slots(val){
        this._slots = val
    }

    get visibleSlots(){
      return this._slots.filter((os:any,i:number)=>i<this._visibleItemsCount)
    }

    updateFirstItem = () => {
      const currentTime = new Date();
      const current = this.formatTime(currentTime)
      const find = this._slots.find(oi=>oi.type == "mainepg")
      if(find){
        find.setTitle(current)
      }
    }
    initHeaderSlots = () =>{
        this._items = this.generateTimeSlots()
        this.generateHeaderSlots()
    }

    generateHeaderSlots = () => {
        this._slots = this._items.map(oi=>new OneTimeSlot(oi))
    }

    generateTimeSlots = ():Array<timeSlotModel> => {
        const slots:Array<timeSlotModel> = [];
        
        // Get actual current time
        const currentTime = new Date();
        // console.log('Current time:', currentTime.toString());
        // console.log('Current hours:', currentTime.getHours(), 'minutes:', currentTime.getMinutes());
        
        // Add first slot with current time
        slots.push({
          title: this.formatTime(currentTime),
          type: "mainepg" as const
        });
        
        // Calculate next 30-minute interval
        const nextSlot = new Date(currentTime);
        const currentMinutes = nextSlot.getMinutes();
        
        if (currentMinutes < 30) {
          nextSlot.setMinutes(30, 0, 0);
        } else {
          nextSlot.setHours(nextSlot.getHours() + 1);
          nextSlot.setMinutes(0, 0, 0);
        }
        
        // Generate slots from next 30-min interval to 3:00 AM (next day)
        let currentSlot = new Date(nextSlot);
        const endTime = new Date(currentTime);
        endTime.setDate(endTime.getDate() + 1); // Next day
        endTime.setHours(3, 0, 0, 0); // 1:00 AM
        
        while (currentSlot <= endTime) {
          const nextMinutes = new Date(currentSlot.getTime() + 30 * 60 * 1000);
          slots.push({
            title: this.formatTime(currentSlot),
            endTitle: this.formatTime(nextMinutes),
            type: "secondaryepg" as const,
            timeCost: timeParse(this.formatTime(currentSlot)),
            timeCostEnd: timeParse(this.formatTime(nextMinutes))
          });
          
          // Add 30 minutes
          currentSlot = nextMinutes;
        }
        
        return slots;
    }
      
    formatTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }
}

export { Slots }