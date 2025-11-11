import { AppLangModal } from "./Modals/AppLangModal";
import { TrailerModal } from "./Modals/TrailerModal";


class Modals {
  private readonly _appLang: AppLangModal;
  private readonly _trailerModal: TrailerModal
  constructor() {
    this._appLang = new AppLangModal();
    this._trailerModal = new TrailerModal("Trailer")
  }

  get appLang() {
    return this._appLang;
  }

  get trailer(){
    return this._trailerModal
  }
}

export { Modals };
