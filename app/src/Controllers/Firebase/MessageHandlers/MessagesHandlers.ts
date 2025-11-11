import { Notifications } from 'react-native-notifications';
type remoteMessage = { sEvent: string };
export enum pushEventName {
  'test' = 'test',
}
export type pushEvent = { eventType: pushEventName; data: any };
class PushMessagesHandler {
  // parse remote method and check;
  public parsePush(remoteMessage: remoteMessage): pushEvent | null {
    try {
      if (remoteMessage.hasOwnProperty('sEvent')) {
        const parseMessageData = JSON.parse(remoteMessage.sEvent);
        return parseMessageData[0];
      } else {
        return null;
      }
    } catch (ex: any) {
      return null;
    }
  }

  // method open push when app background
  public async pushBackground(remoteMessage: remoteMessage) {
    const pushData = this.parsePush(remoteMessage);
    if (pushData === null) {
      return;
    }
    switch (pushData.eventType) {
      case pushEventName.test:
        console.log('YES');
        return;
    }
  }
  // method open push when app foreground
  public async pushForeground(remoteMessage: remoteMessage) {
    const pushData = this.parsePush(remoteMessage);
    if (pushData === null) {
      return;
    }
    switch (pushData.eventType) {
      case pushEventName.test:
        console.log('YES');
        return;
    }
  }
  // method open app from push
  public async pushOpen(remoteMessage: remoteMessage) {
    const pushData = this.parsePush(remoteMessage);
    if (pushData === null) {
      return;
    }
    switch (pushData.eventType) {
      case pushEventName.test:
        console.log('YES');
        return;
    }
  }

  // events
  public pushEvents = () => {
    try {
      Notifications.registerRemoteNotifications();
      Notifications.events().registerNotificationReceivedForeground(async (notification: any) => {
        try {
          console.log('registerNotificationReceivedForeground ',notification.payload)
          this.pushForeground(notification.payload).then();
        } catch (e) {}
      });
      Notifications.events().registerNotificationOpened(async (notification: any) => {
        try {
          console.log('pushOpen ',notification.payload)
          await this.pushOpen(notification.payload).then();
        } catch (e) {}
      });
      Notifications.events().registerNotificationReceivedBackground(async (notification: any) => {
        console.log('registerNotificationReceivedBackground ',notification.payload)
        await this.pushForeground(notification.payload).then();
      });
    } catch (ex) {}
  };
}

export { PushMessagesHandler };
