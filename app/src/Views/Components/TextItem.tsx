import React from 'react';
import {LangItem} from "~/src/Helpers/LangItem";
import {COLORS} from "~/src/assets/styles/colors";
import {makeClampStyle} from "~/src/Helpers/Helpers";


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

class TextItem extends React.Component {
  props: textItemProps;
  constructor(props: textItemProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { style, center, color, customStyle, ellipsizeMode, numberOfLines } = this.props;
      const base = styles.container;
      const stylesText = this.props.stylesText || {};
      const named = style ? (styles as any)[style] || {} : {};
      const centerStyle: React.CSSProperties = center ? { textAlign: 'center' } : {};
      const colorStyle: React.CSSProperties = color ? { color } : {};
      const clampStyle = makeClampStyle(numberOfLines, ellipsizeMode);

      const merged: React.CSSProperties = {
          ...base,
          ...named,
          ...centerStyle,
          ...colorStyle,
          ...clampStyle,
          ...customStyle,
          ...stylesText,
      };

      return (
        <span style={merged} >
         <LangItem for={this.props.children} />
      </span>
    );
  }
}

export { TextItem };
const styles: Record<string, React.CSSProperties> & Partial<Record<textStyles, React.CSSProperties>> = {
    container: {
        color: COLORS.FONTCOLOR,
        fontSize: 16,
    },
    pageHead: { fontSize: 20, fontWeight: 700, paddingBottom: 8, paddingTop: 8, textAlign: 'center' },
    h1: { fontSize: 32, fontWeight: 700, paddingBottom: 8 },
    h2: { fontSize: 24, fontWeight: 700, paddingBottom: 8 },
    h3: { fontSize: 20, fontWeight: 700, paddingBottom: 8 },
    orderName: { fontSize: 16, fontWeight: 700, paddingBottom: 8 },
    main: { fontSize: 27, fontWeight: 600 },
    secondary: { fontSize: 15 },
    secondaryGray: { fontSize: 12, color: '#9AA0A6' },
    inputTitle: { fontSize: 10, paddingTop: 6, paddingBottom: 6 },
    menuText: { fontSize: 10, fontWeight: 700, width: '100%', textAlign: 'center', color: '#888' },
    boldText: { fontWeight: 700, fontSize: 16 },
    settingText: { fontWeight: 600, fontSize: 17 },
    settingTextHolded: { fontWeight: 600, fontSize: 17, color: 'rgba(238,238,238,.5)' },
    alertTitle: { fontWeight: 700, fontSize: 15 },
    alertMessage: { fontSize: 13 },
    descItem: { fontWeight: 700, fontSize: 12 },
    descTitle: { fontWeight: 300, fontSize: 12 },
    listTitle: { color: '#9AA0A6', fontWeight: 700, fontSize: 13 },
    smallButton: { fontSize: 9 },
    selectableButton: { fontWeight: 600, fontSize: 15 },
    status: { fontSize: 16 },
    instruction: { fontSize: 12, fontWeight: 300, textAlign: 'center' },
    categoryItem: { fontWeight: 600, fontSize: 14, textTransform: 'capitalize' },
};