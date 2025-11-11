import { Model } from '../../../../Base/Model';
import { Timeout } from '../../../../Base/Timeout';
import { controllers } from '../../../Controllers';

class EpgModel extends Model {
  private _timeout: Timeout = new Timeout(1000);
  private _visible: boolean = false;
  private _addonsOnUpdate: any = null
  private _currentTimeStamp: any = 0;
  constructor() {
    super();
  }

  addonsOnUpdate = (_func:any) =>{ 
    this._addonsOnUpdate = _func
  }

  get visible() {
    return this._visible;
  }

  get selectedItem() {
    console.log('loadAllEpgs selectedItem ', controllers().main.mainListPage.iptvPage.selectedChannel)
    return controllers().main.mainListPage.iptvPage.selectedChannel;
  }

  triggerOnUpdate = () =>{ 
    if(this._addonsOnUpdate){
      this._addonsOnUpdate(this._currentTimeStamp)
    }
  }

  loadAllEpgs = () => {
    controllers().main.mainListPage.iptvPage.iptvList.localitems.forEach((channel) => {
      const selected = channel.epg.selectedItem?.betweens;
      channel.epg.findSelectedTime();
      const newSelected = channel.epg.selectedItem?.betweens;
      if (selected !== newSelected) {
        channel.updateMe();
      }
    });
  };

  checkTime = () => {
    const currentTimeStamp = Math.round(new Date().getTime() / 1000);
    if (currentTimeStamp % 60 === 0) {
      this._currentTimeStamp = currentTimeStamp
      this.loadAllEpgs();
      this.triggerOnUpdate()
      this.updateMe();
    }
    this._timeout.set(this.checkTime);
  };

  mount = () => {
    this._timeout.set(this.checkTime);
  };
  unmount = () => {
    this._timeout.clear();
  };

  setVisible = (bool: boolean) => {
    if (this._visible === bool) {
      return;
    }
    this._visible = bool;
    this.updateMe();
  };
  show = () => {
    this.setVisible(true);
  };
  hide = () => {
    this.setVisible(false);
  };
}

export { EpgModel };
