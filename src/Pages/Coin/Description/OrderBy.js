import { makeAutoObservable } from "mobx";

class OrderBy {
  order = "";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setOrder(order) {
    this.order = order;
    this.counter = this.counter + 1;
  }
}

export default OrderBy;
