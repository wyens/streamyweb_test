import { Model } from '../../Base/Model';

class ScrollRefresh extends Model {
  private _refreshing: boolean;
  private readonly _onRefresh: (callback: () => void) => Promise<any>;
  constructor(refresh: (callback: () => void) => Promise<any>) {
    super();
    this._refreshing = false;
    this._onRefresh = refresh;
  }

  get refreshing() {
    return this._refreshing;
  }

  setRefreshing = (bool: boolean) => {
    if (this._refreshing === bool) {
      return;
    }
    this._refreshing = bool;
    this.updateMe();
  };

  onRefresh = async () => {
    this.setRefreshing(true);
    await this._onRefresh(this.hideRefreshing);
  };

  hideRefreshing = () => {
    this.setRefreshing(false);
  };
}

export { ScrollRefresh };
