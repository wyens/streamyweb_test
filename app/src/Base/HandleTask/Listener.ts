type listenerModel = {
  name?: string;
  priority?: number;
  doing: () => void;
};

class Listener {
  private _model: listenerModel;

  constructor(model: listenerModel) {
    this._model = model;
  }

  do = () => {
    this._model.doing();
  };

  get name() {
    return this._model.name;
  }

  get priority() {
    return this._model.priority;
  }
}

export { Listener };
