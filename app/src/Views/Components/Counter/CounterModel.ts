import { Model } from '../../../Base/Model';

type counterModelProps = {
  onPress?: () => void | undefined;
  count?: number;
};

class CounterModel extends Model {
  private readonly _onPress: (() => (void | undefined)) | undefined;
  private _count: number;
  constructor(props: counterModelProps) {
    super();
    this._onPress = props.onPress || undefined;
    this._count = props.count || 0;
  }
  get count() {
    return this._count;
  }

  set count(value: number) {
    this._count = value <= 0 ? 0 : value;
    this.updateMe();
  }
  public onPress = () => {
    this._onPress && this._onPress();
  };
}

export { CounterModel };
