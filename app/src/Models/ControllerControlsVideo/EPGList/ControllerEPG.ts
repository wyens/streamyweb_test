import { Animated } from 'react-native';
import { Model } from '../../../Base/Model.ts';
import { EpgModel } from '../../../Controllers/Pages/HomeStack/IptvPage/EpgModel.ts';

export class ControllerEPG extends Model {
  public isVisible = false;
  public opacity = new Animated.Value(0);
  private _epgModel: EpgModel = new EpgModel();
  constructor() {
    super();
  }

  public get epgModel() {
    return this._epgModel;
  }
  public show = (callBack?: (() => any) | undefined) => {
    this.isVisible = true;
    this.updateMe().then(() => {
      callBack && callBack();
    });

    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
    // this._epgModel.loadAllEpgs();
  };

  public hide = (callBack?: (() => any) | undefined) => {
    Animated.timing(this.opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      callBack && callBack();
      this.isVisible = false;
      this.updateMe();
    });
  };
}
