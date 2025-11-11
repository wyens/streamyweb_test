import React from 'react';
import { ScrollView, TVEventHandler } from 'react-native';

type Props = {
  children: React.ReactNode;
  itemHeight?: number;
  paddingTop?: number;
  enabled?: boolean;
  scrollRef?: (ref: ScrollView | null) => void;
  style?: any;
  contentContainerStyle?: any;
  showsVerticalScrollIndicator?: boolean;
};

export class TVStepScrollView extends React.Component<Props> {
  static defaultProps = { itemHeight: 48, paddingTop: 0, enabled: true };

  private scrollRef = React.createRef<ScrollView>();
  private tvSub: any = null;
  private currentY = 0;

  componentDidMount() {
    this.props.scrollRef?.(this.scrollRef.current);
    this.enableTVEvents();
  }
  componentWillUnmount() {
    this.disableTVEvents();
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.enabled !== this.props.enabled) {
      this.disableTVEvents();
      this.enableTVEvents();
    }
    if (prevProps.scrollRef !== this.props.scrollRef) {
      this.props.scrollRef?.(this.scrollRef.current);
    }
  }

  enableTVEvents() {
    if (!this.props.enabled) {
      return;
    }
    this.tvSub = TVEventHandler.addListener((evt: any) => {
      if (!evt) {
        return;
      }
      if (evt.eventType === 'up') {
        this.step(-1);
      }
      if (evt.eventType === 'down') {
        this.step(1);
      }
    });
  }
  disableTVEvents() {
    if (this.tvSub) {
      this.tvSub.remove?.();
      this.tvSub = null;
    }
  }

  step(dir: -1 | 1) {
    const { itemHeight = 48, paddingTop = 0 } = this.props;
    this.currentY = Math.max(0, this.currentY + dir * itemHeight);
    this.scrollRef.current?.scrollTo({ y: Math.max(0, this.currentY - paddingTop), animated: true });
  }

  onScroll = (e: any) => {
    this.currentY = e.nativeEvent.contentOffset.y || 0;
  };

  render() {
    const { children, style, contentContainerStyle, showsVerticalScrollIndicator } = this.props;
    return (
      <ScrollView
        ref={this.scrollRef}
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        style={style}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </ScrollView>
    );
  }
}
