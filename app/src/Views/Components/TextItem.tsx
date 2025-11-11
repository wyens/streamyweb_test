import React from 'react';


export type textStyles =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'main'
  | 'secondary'
  | 'secondaryGray'
  | 'pageHead'
  | 'inputTitle'
  | 'descTitle'
  | 'descItem'
  | 'menuText'
  | 'boldText'
  | 'settingText'
  | 'settingTextHolded'
  | 'alertTitle'
  | 'alertMessage'
  | 'listTitle'
  | 'selectableButton'
  | 'status'
  | 'smallButton'
  | "instruction"
  | "orderName" 
  | "categoryItem";

type textItemProps = {
  children: any;
  style?: textStyles;
  stylesText?: any;
  center?: boolean;
  color?: string;
  customStyle?: any;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
};

class Text extends React.Component {
  props: textItemProps;
  constructor(props: textItemProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { style, center, color, customStyle, ellipsizeMode, numberOfLines } = this.props;
    const findstyle = style ? styles[style] : {};
    const stylesText = this.props.stylesText || {};
    const centerStyle = center ? { textAlign: 'center' } : {};
    const colorStyle = color ? { color } : {};
    return (
        null
      // <TextItem
      //   style={[styles.container, findstyle, centerStyle, colorStyle, customStyle, stylesText]}
      //   ellipsizeMode={ellipsizeMode}
      //   numberOfLines={numberOfLines}
      // >
      //   <LangItem for={this.props.children} />
      // </TextItem>
    );
  }
}

export { Text };

// const styles = StyleSheet.create({
//   container: {
//     color: COLORS.FONTCOLOR,
//     fontFamily: FONTS.regular,
//     fontSize: 16,
//     includeFontPadding: false,
//   },
//   pageHead: {
//     fontSize: 20,
//     fontFamily: FONTS.bold,
//     paddingBottom: WB,
//     paddingTop: WB,
//     textAlign: 'center',
//   },
//   h1: {
//     fontSize: 32,
//     fontFamily: FONTS.bold,
//     paddingBottom: WM,
//   },
//   h2: {
//     fontSize: 24,
//     fontFamily: FONTS.bold,
//     paddingBottom: WM,
//   },
//   h3: {
//     fontSize: 20,
//     fontFamily: FONTS.bold,
//     paddingBottom: WM,
//   },
//   orderName: {
//     fontSize: 16,
//     fontFamily: FONTS.bold,
//     paddingBottom: WM,
//   },
//   main: {
//     fontSize: 27,
//     fontFamily: FONTS.semi,
//   },
//   secondary: {
//     fontSize: 15,
//     fontFamily: FONTS.regular,
//   },
//   secondaryGray: {
//     fontSize: 12,
//     fontFamily: FONTS.regular,
//     color: TEXTCOLORS.secondary,
//   },
//   secondaryconfirm: {
//     color: '#F9CE00',
//   },
//   secondarygreen: {
//     color: '#84C69B',
//   },
//   inputTitle: {
//     fontSize: 10,
//     paddingVertical: WS,
//   },
//   menuText: {
//     fontSize: 10,
//     fontFamily: FONTS.bold,
//     width: '100%',
//     textAlign: 'center',
//     color: "#888"
//   },
//   boldText: {
//     fontFamily: FONTS.bold,
//     fontSize: 16,
//   },
//   settingText: {
//     fontFamily: FONTS.semi,
//     fontSize: 17,
//   },
//   settingTextHolded: {
//     fontFamily: FONTS.semi,
//     fontSize: 17,
//     color: 'rgba(238,238,238,.5)',
//   },
//   alertTitle: {
//     fontFamily: FONTS.bold,
//     fontSize: 15,
//   },
//   alertMessage: {
//     fontSize: 13,
//   },
//   descItem: {
//     fontFamily: FONTS.bold,
//     fontSize: 12,
//   },
//   descTitle: {
//     fontFamily: FONTS.thin,
//     fontSize: 12,
//   },
//   listTitle: {
//     color: TEXTCOLORS.secondary,
//     fontFamily: FONTS.bold,
//     fontSize: 13,
//   },
//   smallButton: {
//     fontSize: 9,
//   },
//   selectableButton: {
//     fontFamily: FONTS.semi,
//     fontSize: 15,
//   },
//   status: {
//     fontSize: 16,
//   },
//   instruction: {
//     fontSize: 12,
//     fontFamily: FONTS.light,
//     textAlign: "center"
//   },
//
//   categoryItem: {
//     fontWeight: 600,
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//     textTransform: "capitalize"
//   }
// });
