import React from 'react';
import { UpdateComponent } from '../Base/UpdateComponent';
import { UPDATE } from './constants';
import { RW } from './LangHelper';

type langProps = {
  for: string;
  c?: boolean;
};

class LangItem extends UpdateComponent {
  props: langProps;
  constructor(props: langProps) {
    super(props);
    this.type = UPDATE.LANG;
    this.props = props;
  }
  render() {
    return <>{typeof RW(this.props.for) === 'string' ? RW(this.props.for) : this.props.for}</>;
  }
}

export { LangItem };
