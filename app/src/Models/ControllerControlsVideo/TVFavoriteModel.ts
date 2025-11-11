import { Model } from '../../Base/Model';
import type {favoriteBody} from '../../DataTypes/BaseResponse.ts';
import type {IptvChannel} from "~/src/Controllers/Pages/HomeStack/IptvPage/IptvChannel";
import {controllers} from "~/src/Controllers/Controllers";
import {loadData, UserDataProvider} from "~/src/Base/UserDataProvider";

type TVFavoriteInit = {
  isFavorite?: boolean;
  channel_id?: string;
  channel?: IptvChannel;
};

export class TVFavoriteModel extends Model {
  private _focused = false;
  private _isFavorite = false;
  private _channel_id: string = "";
  private _channel: IptvChannel | undefined = undefined;
  private _isLoading = false;

  public init = (opts?: TVFavoriteInit) => {
    if (!opts) {
      return;
    }

    if (typeof opts.isFavorite === 'boolean') {
      this._isFavorite = opts.isFavorite;
    }
    if (opts.channel_id !== undefined) {
      this._channel_id = opts.channel_id;
    }
    this._channel = opts.channel;

    this.updateMe();
  };

  public reset = () => {
    this._focused = false;
    this._isFavorite = false;
    this._isLoading = false;
    this._channel_id = '';
    this.updateMe();
  };

  get focused() {
    return this._focused;
  }
  setFocused = (v: boolean) => {
    if (this._focused !== v) {
      this._focused = v;
      this.updateMe();
    }
  };

  get isFavorite() {
    return this._isFavorite;
  }

  get isLoading() {
    return this._isLoading;
  }

  setFavorite = async (v: boolean) => {
    if (this._isFavorite === v || !this._channel_id) {
      this._isFavorite = v;
      this.updateMe();
      return;
    }

    const prev = this._isFavorite;
    this._isFavorite = v;
    this._isLoading = true;
    this.updateMe();

    try {
      let response = { statusCode: 500 };
      if (v) {
        response = await this.favoritesAdd();
      } else {
        response = await this.favoritesRemove();
      }
      if (response.statusCode !== 200) {
        throw 500;
      }
      this._isLoading = false;
      this.updateMe();
    } catch (e) {
      this._isFavorite = prev;
      this._isLoading = false;
      this.updateMe();
    }
    try {
      this.updateChannelsFavorite(this._isFavorite);
    } catch (e) {}
  };
  updateChannelsFavorite = (favoriteStatus: boolean) => {
    const findCh = controllers().main.mainListPage.iptvPage.iptvList.localitems.find((oc) => oc.id === this._channel?.id);
    if (findCh) {
      findCh.setFavoriteSelected(favoriteStatus);
    }
  };
  toggleFavorite = () => {
    this.setFavorite(!this._isFavorite);
  };

  public favoritesAdd = async () => {
    const userToken = controllers().auth.userToken;
    const tokenBody: favoriteBody = {
      userToken: userToken || '',
      channel_id: this._channel_id,
    };
    console.log('response tokenBody', tokenBody);
    return await loadData(UserDataProvider.favoritesAdd, tokenBody);
  };
  public favoritesRemove = async () => {
    const userToken = controllers().auth.userToken;
    const tokenBody: favoriteBody = {
      userToken: userToken || '',
      channel_id: this._channel_id,
    };
    console.log('response tokenBody', tokenBody);
    return await loadData(UserDataProvider.favoritesRemove, tokenBody);
  };
}

