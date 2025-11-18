import { Model } from '../../Base/Model';
import { UserDataProvider, loadData } from '../../Base/UserDataProvider';
import { AppSettings } from '../../Constants/AppSettings';
import { controllers } from '../../Controllers/Controllers';
import { BPlayer } from './BPlayer';

class BVideo extends Model {
  private readonly _player: BPlayer;
  private _link: string | null = null;

  private _screen: any = null;

  constructor(player: BPlayer) {
    super();
    this._player = player;
  }

  get bPlayer() {
    return this._player;
  }

  get link() {
    return this._link;
  }

  get isLive() {
    return this._player.isLive;
  }

  load = (channelHash: string, episode: boolean = false) => {
    const { isLive } = this.bPlayer;

    if (isLive) {
      this.loadLive(channelHash);
    } else {
      this.loadMovie(channelHash, episode);
      try {
        this.screen.doLoading();
      } catch (e) {
        // console.error("ER", e)
      }
    }
  };

  getBalancerLink = async (liveHash: string) => {
    const response = await loadData(UserDataProvider.getBalancer, {
      userToken: controllers().auth.userToken || '',
      channelToken: liveHash || '',
    });
    return response.data.balancer;
  };

  private loadLive = async (channelHash: string) => {
    this._link = UserDataProvider.watchChannel({
      userToken: controllers().auth.userToken || '',
      channelToken: channelHash || '',
    });
    const linkBalancer = await this.getBalancerLink(channelHash);
    // alert(linkBalancer)
    // set up link to video
    this._link = linkBalancer !== '' ? linkBalancer : this._link;
    // console.error("link",this._link);
    this.updateMe();
  };

  private loadMovie = (movie_hash: string, episode: boolean = false) => {
    this._link = episode ? this.generateEpisodeLink(movie_hash) : this.generateLink(movie_hash);
    this.updateMe();
  };

  generateLink = (movie_hash: string) => {
    return `${AppSettings.endpoint}/watch/movie/${controllers().auth.userToken}/${movie_hash}`;
  };
  generateEpisodeLink = (movie_hash: string) => {
    return `${AppSettings.endpoint}/watch/episode/${controllers().auth.userToken}/${movie_hash}`;
  };

  setPlayerRef = (ref: any) => {
    this._screen = ref;
    // if(this._screen){
    //     this.bPlayer.listeners.make(ref)
    // } else {
    //     this.bPlayer.listeners.clear()
    // }
  };

  get screen() {
    return this._screen;
  }

  play = () => {
    if (!this._screen) {
      return;
    }
    if (!this._screen.current){
        return;
    }
    this._screen.current.play();
  };

  get isFullScreen() {
    return this.bPlayer.bFullScreen.enabled;
  }

  pause = () => {
    if (!this._screen) {
      return;
    }
    if (!this._screen.current){
          return;
    }
    // this._screen.pause()
    // console.error(this._screen.vlcPlayer)
    this._screen.current.pause();
  };
}

export { BVideo };
