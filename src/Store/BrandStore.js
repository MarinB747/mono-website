import { observable, action, makeObservable } from "mobx";
class BrandStore {
  constructor() {
    makeObservable(this);
  }
  @observable rowsPerPage = 5;
  @observable currentPage = 1;
  @observable pageCount = [{ pages: 5 }, { pages: 10 }, { pages: 20 }];
  @observable vehicleBrand = "";
  @observable renameBrand = "";
  @observable renameId = "";
  @observable filterBrand = 0;
  @observable showRenameForm = false;
  @observable startIndex = 0;
  @observable endIndex = 5;
  @observable submitDisabled = true;
  @observable renameSubmitDisabled = true;
  @action.bound setRowsPerPage(e) {
    this.rowsPerPage = parseInt(e);
  }
  @action.bound setPreviousPage() {
    this.currentPage = parseInt(this.currentPage - 1);
  }
  @action.bound setNextPage() {
    this.currentPage = parseInt(this.currentPage + 1);
  }
  @action.bound setVehicleBrand(e) {
    this.vehicleBrand = e;
  }
  @action.bound setRenameBrand(e) {
    this.renameBrand = e;
  }
  @action.bound setRenameId(e) {
    this.renameId = parseInt(e);
  }
  @action.bound setShowRenameForm() {
    this.showRenameForm = !this.showRenameForm;
  }
  @action.bound filterByBrand(e) {
    this.filterBrand = parseInt(e);
  }
  @action.bound filterMethod(item) {
    if (this.filterBrand !== 0) {
      return item.brand_id === this.filterBrand;
    } else {
      return true;
    }
  }

  @action.bound sortByBrand(item) {
    item.sort((b, a) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
  }

  @action.bound setPlaceholderBrand(e) {
    let placeholderName = e.find(obj => obj.id === this.renameId);
    this.renameBrand = placeholderName.name;
  }
  @action.bound
  onRename(e) {
    const objRename = e.findIndex(obj => obj.id === this.renameId);
    e[objRename].name = this.renameBrand;
  }
  @action.bound setStartIndex() {
    this.startIndex = this.currentPage * this.rowsPerPage - this.rowsPerPage;
  }
  @action.bound setEndIndex() {
    this.endIndex = this.startIndex + this.rowsPerPage;
  }
  @action.bound setSubmitDisabled(e) {
    this.submitDisabled = e;
  }
  @action.bound setRenameSubmitDisabled(e) {
    this.renameSubmitDisabled = e;
  }
}

export { BrandStore };