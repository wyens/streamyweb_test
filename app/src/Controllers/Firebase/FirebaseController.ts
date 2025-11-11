import { PermissionsPush } from './Permissions/PermissionsPush';
import { DeviceToken } from './DeviceToken/DeviceToken';
import { PushMessagesHandler } from './MessageHandlers/MessagesHandlers';

class FirebaseController {
  private readonly _deviceToken: DeviceToken;
  private readonly _permissionsPush: PermissionsPush;
  private readonly _messagesHandlers: PushMessagesHandler;
  constructor() {
    this._deviceToken = new DeviceToken();
    this._permissionsPush = new PermissionsPush();
    this._messagesHandlers = new PushMessagesHandler();
  }
  public get permissionsPush() {
    return this._permissionsPush;
  }
  public get deviceToken() {
    return this._deviceToken;
  }
  public get messagesHandlers() {
    return this._messagesHandlers;
  }
}

export { FirebaseController };
