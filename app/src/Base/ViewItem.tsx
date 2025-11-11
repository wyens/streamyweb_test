import React from 'react';

export type viewItemProps = {
  component?: any;
  children?: any;
  RightComponent?: any;
  controller?: any;
  navigation?: any;
  addStyles?: any;
};

class ViewItem extends React.Component {
  props: viewItemProps;
  constructor(props: viewItemProps) {
    super(props);
    this.props = props;
  }
  update = () => {
    this.forceUpdate();
  };
}

export { ViewItem };
