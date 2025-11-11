import React from 'react';
import { StyleSheet, Image, Pressable, TVFocusGuideView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_ICONS } from '../../../Constants/icons.ts';
import { HEADER_HEIGHT } from './HeaderPage.tsx';
import { UserShortNameView } from '../../Design/UserShortNameView.tsx';
import { BORDERCOLOR } from '../../../assets/styles/colors.ts';
import { ViewLogoutApp } from '../../ViewControlsVideo/ViewLogoutApp.tsx';
import { ControllerLogout } from '../../../Models/ControllerControlsVideo/ControllerLogout.ts';
import { Text } from '../TextItem.tsx';
import { ViewItem, viewItemProps } from '../../../Base/ViewItem.tsx';

export type HeaderPageProps = viewItemProps & {};

export class HeaderPageWithName extends ViewItem {
  props: HeaderPageProps;

  state = {
    focused: false,
  };
  constructor(props: HeaderPageProps) {
    super(props);
    this.props = props;
  }

  get controller(): ControllerLogout{
    return this.props.controller
  }

  public onLogout = async () => {
    this.controller.showControllers();
  };
  public get controllerLogout() {
    return this.controller;
  }

  public setFocused = (value: boolean) => {
    this.setState({ focused: value });
  };

  render() {
    const { focused } = this.state;

    return (
      <>
        <View style={styles.container}>
          <LinearGradient colors={['#1C1E2C', '#17181E']} style={StyleSheet.absoluteFill} />

          <Image source={BASE_ICONS.sttechlogo} style={styles.sttechlogo} />

          <Pressable
            onPress={this.onLogout}
            focusable={true}
            isTVSelectable={true}
            hasTVPreferredFocus={true}
            onFocus={() => this.setFocused(true)}
            onBlur={() => this.setFocused(false)}
            style={[styles.userName, focused && styles.userNameFocused]}
          >
            <Text customStyle={styles.shortName}>
              <UserShortNameView />
            </Text>
          </Pressable>
        </View>
        {/* <ViewLogoutApp ref={this._controllerLogout.set} controller={this._controllerLogout} /> */}
      </>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    // height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
    // marginBottom: 10,
    // backgroundColor: "red",
  },
  sttechlogo: {
    width: 43,
    height: 13,
    resizeMode: 'contain',
  },
  userName: {
    width: 26,
    height: 26,
    borderWidth: 1.5,
    borderColor: BORDERCOLOR,
    borderStyle: 'solid',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameFocused: {
    borderColor: '#00C2FF',
    transform: [{ scale: 1.1 }],
  },
  shortName: {
    fontSize: 10
  }
});
