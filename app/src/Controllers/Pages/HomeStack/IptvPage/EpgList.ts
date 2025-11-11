import { Model } from '../../../../Base/Model';
import { HMOnTime, dayDifference, dayDifferenceFromString, timeParse } from '../../../../Helpers/DateTime';
import { EpgItem, epgItemModel } from './EpgItem';
import { EPG_ITEM_HEIGHT } from '../../../../Views/Screens/MainStack/IptvPage/EpgItemView.tsx';

export type epgOneChannelResponceType = {
  channel_name: string;
  epg_date: string;
  epg_country: string;
  programmeResult: Array<epgItemModel>;
};

class EpgList extends Model {
  private _items: Array<EpgItem> = [];
  private _stream_epg: string;
  private _stream_epg_item: epgOneChannelResponceType | null = null;
  private _issetEpg: boolean;
  private _timeDifference: number;
  private _scrollRef: any;
  private _offsetWidth: number = 0;
  private _currentSection: number = 0;

  constructor(stream_epg: string | undefined, stream_timezone: any = '') {
    super();
    this._timeDifference = this.calculateTimeDifference(stream_timezone);
    this._stream_epg = stream_epg || '';
    this._issetEpg = this.parsingEpg(this._stream_epg);
    this.makeList();
  }
  calculateTimeDifference = (stream_timezone: any) => {
    if (!stream_timezone) {
      return 0;
    }
    var a = parseInt(stream_timezone.replace('UTC', ''));
    return (a * -60 - new Date().getTimezoneOffset()) / 60;
  };

  parsingEpg = (stream_epg_input: string) => {
    const json = stream_epg_input || '';
    if (json === '') {
      return false;
    }
    const stream_epg = JSON.parse(json);
    this._stream_epg_item = stream_epg;
    // console.log('channel', this.name, 'epg', stream_epg)
    return true;
  };

  makeList = () => {
    if (this._stream_epg_item && this._stream_epg_item.programmeResult && this._stream_epg_item.programmeResult.length) {
      const arrayEpgs = this._stream_epg_item.programmeResult;

      var section = 0;
      var isMidnight = false;
      this._items = arrayEpgs.map((epg) => {
        const item = new EpgItem(epg, section, this._timeDifference);
        if (item.timeCost > 720) {
          section = 1;
        }
        try {
          if (section === 1 && item.time[0] === '0' && !isMidnight) {
            isMidnight = true;
          }
        } catch (e) {
          console.error('hear');
        }
        item.isMidnight = isMidnight;
        return item;
      });

      // console.error("THIS ITEMS", this._items)
    }
    this.findSelectedTime();
  };

  findSelectedTime = () => {
    const time = HMOnTime();
    // get difference between current day and stream day
    const midnight = dayDifferenceFromString(this._stream_epg_item?.epg_date || '') === 1;
    // get items
    const items: Array<EpgItem> = this._items;
    // find item
    var find: EpgItem | null = null;
    // if we had section and no midnight
    const filtered: Array<EpgItem> = items.filter((item) => item.timeCost <= time && item.isMidnight === midnight);
    // if no items
    if (!filtered.length) {
      find = items.filter((i) => i.isMidnight === midnight)[0];
    } else {
      find = filtered[filtered.length - 1];
    }

    if (find !== null) {
      // if first load need to add to history and return
      this.makeSelected(find);
    }
  };

  makeSelected = (item: EpgItem) => {
    if (!item) {
      return;
    }
    if (this.selectedItem) {
      this.selectedItem.setSelected(false);
    }
    item.setSelected(true);
    this.findAndScroll();
    this.makeDisabled();
  };

  makeDisabled = () => {
    const findIndex = this._items.findIndex((epg) => epg.selected);
    if (findIndex != -1) {
      this._items.forEach((epg, i) => {
        if (i < findIndex) {
          epg.makeDisabled(true);
        } else {
          epg.makeDisabled(false);
        }
      });
    }
  };

  findAndScroll = () => {
    this.findSection();
    this.scrollToSection();
  };

  findSection = () => {
    const findIndex = this._items.findIndex((epg) => epg.selected);
    this._currentSection = Math.round(Math.abs(findIndex / 8)) - 1;
    this.scrollToSection();
  };

  nextSection = () => {
    const maxSection = Math.round(this._items.length / 8);
    if (this._currentSection === maxSection - 1) {
      return;
    }
    this._currentSection = this._currentSection + 1;
    this.scrollToSection();
  };
  previousSection = () => {
    if (this._currentSection === 0) {
      return;
    }
    this._currentSection = this._currentSection - 1;
    this.scrollToSection();
  };

  scrollToSection = () => {
    if (this._scrollRef) {
      const findIndex = this._items.findIndex((epg) => epg.selected);
      if (findIndex) {
        const findTop = findIndex * EPG_ITEM_HEIGHT;
        setTimeout(() => {
          this._scrollRef.scrollTo({ x: 0, y: findTop, animated: true });
        }, 200);
        //   this._scrollRef.scroll(this._currentSection*this._offsetWidth+this._currentSection, 0)
      }
    }
  };

  get selectedItem() {
    return this._items.find((epg) => epg.selected);
  }

  get allNextItems(){
    const find = this._items.find((epg) => epg.selected);
    if(find){
      // const timeCost = find.timeCost
      return this._items.filter(oei=>oei.timeCost>find.timeCost && oei.isMidnight==find.isMidnight )
    }
    const timeParseItem = HMOnTime()
    return this._items.filter(oei=>oei.timeCost>timeParseItem)
  }

  get items() {
    return this._items;
  }

  get scrollRef() {
    return this._scrollRef;
  }

  setScrollRef = (ref: any) => {
    this._scrollRef = ref;
    if (this._scrollRef) {
      this._offsetWidth = this._scrollRef.offsetWidth;
    }
    this.doScrollingIfAllGood();
  };

  doScrollingIfAllGood = () => {
    if (this._offsetWidth && this._scrollRef) {
      this.findAndScroll();
    }
  };

  scrollToCurrentItem = () => {
    this.scrollToSection();
  };
}

export { EpgList };
