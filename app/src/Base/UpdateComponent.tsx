import React from 'react';
import store from '../redux';

class UpdateComponent extends React.Component {
  unsubscribe: () => void = () => {};
  type: any = null;
  lastVersion = 0;

  constructor(props: any) {
    super(props);
    this.selectType = this.selectType.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    // set listener to store
    this.unsubscribe = store.subscribe(this.handleUpdate);
  }

  selectType(store: any) {
    // select current type
    return store[this.type];
  }

  handleUpdate() {
    // if state updated force update
    const newVersion = this.selectType(store.getState());
    if (newVersion !== this.lastVersion) {
      this.lastVersion = newVersion;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    // remove listener
    this.unsubscribe();
  }
}

export { UpdateComponent };
