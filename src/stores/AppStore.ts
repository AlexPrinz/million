import { action, observable } from 'mobx';

export class AppStore {
  @observable currentPage: DownloadCenter.PageType = 'downloads';

  @action
  setCurrentPage(page : DownloadCenter.PageType) {
    this.currentPage = page;
    history.pushState(null, null, page);
  }
}

export const appStore = new AppStore();
export default appStore as AppStore;
