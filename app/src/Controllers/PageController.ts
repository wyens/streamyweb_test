import { PageModel } from '../Base/PageModel';
import { PageScroll } from '../Models/PageScroll';
import { navigator } from './Navigation';

class PageController {
  private _pages: Array<PageModel>;
  private readonly _scroll: PageScroll;

  constructor() {
    this._pages = [];
    this._scroll = new PageScroll();
  }

  get scroll() {
    return this._scroll;
  }

  get list() {
    return this._pages;
  }
  go = (pageName: string) => {
    const find = this._pages.find((p) => p.pageName === pageName);
    if (find) {
      navigator().navigate(find.pageName);
    } else {
      console.error("Page don't exist");
    }
  };
  get pages() {
    return this._pages;
  }
  set pages(arr) {
    this._pages = arr;
  }
}

export { PageController };
