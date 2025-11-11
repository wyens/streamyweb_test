import { TVEventHandler, EventSubscription, Platform, BackHandler } from 'react-native';

export enum RemoteEventType {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  PlayPause = 'playPause',
  Select = 'select',
  Menu = 'menu',
  Back = 'back',
}

type RemoteEventCallback = (eventType: RemoteEventType) => void;
type TVRemoteEvent = { eventType?: string };

const ALLOWED_EVENTS = new Set(Object.values(RemoteEventType));

export class RemoteControls {
  private subscription: EventSubscription | undefined;
  private backSub?: { remove: () => void };
  private onRemoteEventCallback: RemoteEventCallback | null = null;

  constructor() {}

  public startListening() {
    this.subscription = TVEventHandler.addListener((evt: TVRemoteEvent) => {
      const eventType = evt?.eventType;
      if (!eventType || !ALLOWED_EVENTS.has(eventType as RemoteEventType)) {
        return;
      }

      const type = eventType as RemoteEventType;

      this.onRemoteEventCallback && this.onRemoteEventCallback(type);
    });

    this.backSub = BackHandler.addEventListener('hardwareBackPress', () => {
      this.onRemoteEventCallback && this.onRemoteEventCallback(RemoteEventType.Back);
      return true;
    });
  }

  public stopListening() {
    this.subscription?.remove();
    this.subscription = undefined;

    this.backSub?.remove?.();
    this.backSub = undefined;
  }

  public setOnRemoteEvent(listener: RemoteEventCallback | null) {
    this.onRemoteEventCallback = listener;
    this.stopListening();
    this.startListening();
  }
}
