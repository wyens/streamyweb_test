import React from 'react';
// import { SelectorItem, selectorItemProps } from './SelectorItem';

type selectorOptionsProps = {
  options?: Array<selectorItemProps>;
  onChoose?: (item: selectorItemProps) => void;
  defaultSelected?: string;
  visible: boolean;
};
type selectorOptionsState = {
  // visible: boolean,
  selectedItem: selectorItemProps | null;
};
class SelectorOptions extends React.Component {
  props: selectorOptionsProps;
  state: selectorOptionsState;

  constructor(props: selectorOptionsProps) {
    super(props);
    this.props = props;
    this.state = {
      // visible: false,
      selectedItem: this.props.options ? this.props.options.find((o) => o.selected || o.value === props.defaultSelected) || null : null,
    };
  }

  componentDidMount() {
    if (this.props.defaultSelected && this.props.options) {
      this.chooseDefaultItem();
    }
  }

  chooseDefaultItem = () => {
    const findItem = this.props.options?.find((o) => o.selected || o.value === this.props.defaultSelected);
    this.setState({ selectedItem: findItem });
    if (this.props.onChoose && findItem) {
      this.props.onChoose(findItem);
    }
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.options?.length !== prevProps.options?.length) {
      this.chooseDefaultItem();
    }
    if (this.props.defaultSelected !== prevProps.defaultSelected) {
      this.chooseDefaultItem();
    }
  }

  chooseItem = (selectedItem: selectorItemProps) => {
    this.setState({ selectedItem });
    if (this.props.onChoose) {
      this.props.onChoose(selectedItem);
    }
  };

  get selectedItem() {
    return this.state.selectedItem;
  }

  render() {
    const { options, visible } = this.props;
    const visibleType = visible ? [styles.container, styles.visible] : styles.hidden;

    return (
        null
      // <View style={[visibleType]}>
      //   {options &&
      //     options.map((option) => (
      //       <SelectorItem
      //         key={option.value}
      //         value={option.value}
      //         label={option.label}
      //         onPress={this.chooseItem}
      //         selected={this.selectedItem?.value === option.value}
      //       />
      //     ))}
      // </View>
    );
  }
}
export { SelectorOptions };
//
// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     right: 0,
//     marginTop: WS,
//     backgroundColor: inputBG,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: COLORS.BORDERCOLOR,
//     zIndex: 11,
//   },
//   visible: {},
//   hidden: {
//     display: 'none',
//   },
// });
