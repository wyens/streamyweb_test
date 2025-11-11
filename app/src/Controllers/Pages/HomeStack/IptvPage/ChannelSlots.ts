import { HMOnTime } from "../../../../Helpers/DateTime";
import { EpgItem, epgItemModel } from "./EpgItem";
import { OneTimeSlot, timeSlotModel } from "./OneTimeSlot";
import { Slots } from "./Slots";

type channelSlotsModel = {
    items:Array<timeSlotModel>;
    channelEpgItems: Array<EpgItem>
    channel: any;
    currentMaxItemsToLoad?: number;
}

class ChannelSlots extends Slots {
    private _model: channelSlotsModel
    
    constructor(model: channelSlotsModel){
        super()
        this._model = model
        this.items = model.items
        if(this._model.currentMaxItemsToLoad){
            this.visibleItemsCount = this._model.currentMaxItemsToLoad
        }
        this.generateChannelSlots()
    }

    


    generateChannelSlots = () => {
        const timeSlots = this.items
        let skipCount = 0;
        const allNextEpgs = this._model.channelEpgItems

        timeSlots.forEach((slot:any, index:number) => {
                // Skip slots that are already covered by a previous multi-slot item
                if (skipCount > 0) {
                    skipCount--;
                    return;
                }

                // Find all EPG items that overlap with this slot
                const overlappingItems:any = allNextEpgs.filter((epg:EpgItem) => 
                    // epg.timeCost > slot.timeCost
                    epg.timeCost <= slot.timeCost && epg.timeCostEnd > slot.timeCost
                    ||
                    epg.timeCost < slot.timeCostEnd && epg.timeCostEnd > slot.timeCostEnd
                )
                .slice(0,1);

                if (overlappingItems.length === 0) {
                    // No items for this slot, render empty
                    this.slots.push(new OneTimeSlot({...slot, channel: this._model.channel, slotTakes: 1}));
                } else if (overlappingItems.length === 1 && overlappingItems[0].timeCost === slot.timeCost) {
                    // Single item that starts at this slot
                    const item:any = overlappingItems[0];
                    const currentTimeCost = slot.timeCost
                    const timeToCountFrom = currentTimeCost>item.timeCost ? currentTimeCost : item.timeCost
                    const duration = item.timeCostEnd - timeToCountFrom;
                    let slotTakes = Math.ceil(duration / 30); // 30 minutes per slot
                    
                    // console.error("ITEM", item.name, slotTakes, item.timeCostEnd, item.timeCost+((slotTakes-1)*30))
                    if(item.timeCostEnd<slot.timeCost+(slotTakes-1)*30){
                        slotTakes = slotTakes-1;
                    }
                    // console.error("SLOT TAKES BY ITEM", item, slotTakes)
                    // const slotTakes = item && (item.timeCostEnd - item.timeCost)>30 && item.timeCostEnd>slot.timeCostEnd ? 2 : 1;
                    skipCount = slotTakes - 1; // Skip next slots covered by this item
                    if(index === timeSlots.length-1){
                        slotTakes = 1
                    }
                    this.slots.push( new OneTimeSlot({...slot, allEpgs: [item], channel: this._model.channel, slotTakes}))
                } else {
                // Multiple items or item doesn't start at this slot
                    // this.slots.push(new OneTimeSlot({...slot, channel: this._model.channel, allEpgs: overlappingItems.map((oei:any, jindex:any) => oei)}))
                    const mergedEpgs = this.mergeEpgsByName(overlappingItems);
                    const firstItemFound = mergedEpgs[0]
                    const currentTimeCost = HMOnTime()
                    const timeToCountFrom = currentTimeCost>firstItemFound.timeCost ? currentTimeCost : firstItemFound.timeCost
                    const duration = firstItemFound.timeCostEnd - timeToCountFrom
                    let slotTakes = firstItemFound && (firstItemFound.timeCostEnd - firstItemFound.timeCost)>30 && firstItemFound.timeCostEnd>slot.timeCostEnd ? Math.ceil(((duration))/30) : 1;

                    const item = firstItemFound
                    if(item.timeCostEnd<slot.timeCost+(slotTakes-1)*30){
                        slotTakes = slotTakes-1;
                    }
                    if(index === timeSlots.length-1){
                        // console.error("LAST ITEM", item)
                        slotTakes = 1
                    }
                    this.slots.push(new OneTimeSlot({...slot, channel: this._model.channel, allEpgs: mergedEpgs, slotTakes: slotTakes}))
                }
            });
        this.combineSimilarSlots()
    }

    mergeEpgsByName = (epgs: EpgItem[]) => {
        const merged: EpgItem[] = [];
        const epgMap = new Map<string, EpgItem>();
        
        epgs.forEach((epg: EpgItem) => {
            const epgName = epg.name;
            
            if (epgMap.has(epgName)) {
                // Item with same name exists, we need to create a new merged item
                const existing = epgMap.get(epgName)!;
                
                // Determine the earliest start time and latest end time
                const mergedTimeCost = Math.min(existing.timeCost, epg.timeCost);
                const mergedTimeCostEnd = Math.max(existing.timeCostEnd, epg.timeCostEnd);
                
                // Create a new merged EPG item with combined time range
                // We'll use the data from the item with the earliest timeCost
                const baseEpg = existing.timeCost <= epg.timeCost ? existing : epg;
                
                // Create new model with merged time values
                const mergedModel: epgItemModel = {
                    ...baseEpg.data,
                    programme_time: this.formatTimeEpg(mergedTimeCost),
                    programme_start_end_time: `${this.formatTimeEpg(mergedTimeCost)} - ${this.formatTimeEpg(mergedTimeCostEnd)}`
                };
                
                // Create new EpgItem with merged data
                const mergedEpgItem = new EpgItem(mergedModel, baseEpg.section);
                epgMap.set(epgName, mergedEpgItem);
            } else {
                // New item, add to map
                epgMap.set(epgName, epg);
            }
        });
        
        // Convert map back to array
        return Array.from(epgMap.values());
    }

    combineSimilarSlots = () => {
        const combined: any[] = [];
        let i = 0;
        
        while (i < this.slots.length) {
            const currentSlot = this.slots[i];
            let slotTakes = 1;
            
            // Check if current slot has EPG items
            if (currentSlot.allEpgs && currentSlot.allEpgs.length > 0) {
                const currentEpgs = currentSlot.allEpgs;
                const programTimeStart = currentEpgs[0].betweenItems![0]
                let programTimeEnd = currentEpgs[0].betweenItems![1]
                // Look ahead to find consecutive slots with same EPG items
                let j = i + 1;
                while (j < this.slots.length) {
                    const nextSlot = this.slots[j];
                    
                    // Check if next slot has same EPG items
                    if (nextSlot.allEpgs &&
                        this.areEpgsSame(currentEpgs, nextSlot.allEpgs)) {
                        programTimeEnd = nextSlot.allEpgs[0].betweenItems![1]
                        slotTakes++;
                        j++;
                    } else {
                        break;
                    }
                }
                
                // Create combined slot with slotTakes
                const epg = currentSlot.allEpgs[0]
                epg.setBetweens(`${programTimeStart} - ${programTimeEnd}`)
                // const duration = epg.timeCostEnd - epg.timeCost
                // const slotTakesResult = Math.ceil(duration/30)
                const currentTimeCost = currentSlot.timeCost
                const timeToCountFrom = currentTimeCost>epg.timeCost ? currentTimeCost : epg.timeCost
                const duration = epg.timeCostEnd - timeToCountFrom;
                let slotTakesResult = Math.ceil(duration / 30); // 30 minutes per slot
                
                // console.error("ITEM", item.name, slotTakes, item.timeCostEnd, item.timeCost+((slotTakes-1)*30))
                
                const lastSlot = this.slots[this.slots.length-1]
                if(epg.timeCost < lastSlot.timeCostEnd && epg.timeCost+(slotTakesResult-1)*30 > lastSlot.timeCost){
                    // console.error("LAST SLOT", epg.betweens, epg.name, epg.timeCost, epg.timeCost+slotTakesResult*30, slotTakesResult, lastSlot.timeCostEnd, lastSlot)

                    const dur = lastSlot.timeCostEnd - epg.timeCost
                    slotTakesResult = Math.ceil(dur/30)

                //     while(epg.timeCost+(slotTakesResult-1)*30 >= lastSlot.timeCost){
                //         slotTakesResult = slotTakesResult - 1;
                //     }
                }
                // if(epg.timeCostEnd<currentSlot.timeCost+(slotTakesResult-1)*30){
                //     slotTakesResult = slotTakesResult-1;
                // }
                // console.error("LAST SLOT", epg.name, slotTakesResult, lastSlot)
                combined.push(new OneTimeSlot({
                    ...currentSlot.data,
                    allEpgs: [epg],
                    // slotTakes: currentSlot.slotTakes && currentSlot.slotTakes>1 && slotTakes == 1 ? currentSlot.slotTakes : slotTakes
                    slotTakes: slotTakesResult
                }));
                
                i = j; // Skip the combined slots
            } else {
                // Empty slot, just add it
                if(i == this.slots.length-1){
                    currentSlot.slotTakes = 1
                }
                combined.push(currentSlot);
                i++;
            }
        }

        // console.error("COMBINED", combined)
        
        this.slots = combined;
    }

    
    formatTimeEpg = (timeCost: number): string => {
        const hours = Math.floor(timeCost / 60);
        const minutes = timeCost % 60;
        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hoursStr}:${minutesStr}`;
    }

    areEpgsSame = (epgs1: any[], epgs2: any[]) => {
        // console.error("COMPARE", epgs1, epgs2)
        // Compare EPG items by their timeCost (or any unique identifier)
        return epgs1.every((epg1, index) => {
            const epg2 = epgs2[index];
            // console.log("EPG SAME", epg1.name, epg2.name, epg1.timeCost)
            return epg1.name === epg2.name;
        });
    }
}

export { ChannelSlots }