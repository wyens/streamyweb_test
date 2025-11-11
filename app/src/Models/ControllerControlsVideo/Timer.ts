export class Timer {
  private timeoutId: NodeJS.Timeout | null = null;
  private readonly seconds: number;
  private readonly callback: () => void;

  constructor(seconds: number, callback: () => void) {
    this.seconds = seconds;
    this.callback = callback;
  }

  start() {
    this.stop();

    this.timeoutId = setTimeout(() => {
      this.callback();
      this.timeoutId = null;
    }, this.seconds * 1000);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
