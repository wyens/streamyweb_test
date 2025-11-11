import { AppState, AppStateStatus } from 'react-native';

export enum AppStateEventType {
  Active = 'active',
  Background = 'background',
  Inactive = 'inactive',
}

type AppStateCallback = (state: AppStateEventType) => void;

export class AppStateControls {
  private subscription?: { remove: () => void };
  private onAppStateChangeCallback: AppStateCallback | null = null;

  constructor() {}

  public startListening() {
    if (this.subscription) {
      return;
    }

    this.subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      console.log('[AppStateControls] state:', nextState);

      const state = nextState as AppStateEventType;

      this.onAppStateChangeCallback && this.onAppStateChangeCallback(state);
    });
  }

  public stopListening() {
    this.subscription?.remove();
    this.subscription = undefined;
  }

  public setOnAppStateChange(listener: AppStateCallback | null) {
    this.onAppStateChangeCallback = listener;
  }
}
