export class AppSettings {
  private static _baseUrl = 'https://menfecto.com';
  private static _endpoint = 'https://api.menfecto.com';
  // private static _endpoint = 'https://api.menfecto.com';
  // private static _testendpoint = 'http://161.35.223.140:8000';
  private static _testendpoint = 'https://api.menfecto.com';
  private static _appname = 'Streamy';
  private static _devMode = true;

  public static get endpoint() {
    return this._devMode ? this._testendpoint : this._endpoint;
  }

  public static get appname() {
    return this._appname;
  }

  public static get devMode() {
    return this._devMode;
  }

  public static get baseUrl() {
    return this._baseUrl;
  }
}

export type langs = 'en' | 'ua' | "hu";

export interface langRowType {
  [key: string]: string;
}
