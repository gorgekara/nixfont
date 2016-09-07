import { app, BrowserWindow, screen } from 'electron';
import jetpack from 'fs-jetpack';

export default class ElectronWindow {
  constructor(name, options) {
    this.userDataDir = jetpack.cwd(app.getPath('userData'));
    this.stateStoreFile = 'window-state-' + name +'.json';
    this.defaultSize = {
      width: options.width,
      height: options.height
    };
    this.state = {};

    let state = this.ensureVisibleOnSomeDisplay(this.restore());
    this.win = new BrowserWindow(Object.assign({}, options, state));

    this.win.on('close', this.saveState.bind(this));
  }

  restore() {
    let restoredState = {};

    try {
      restoredState = this.userDataDir.read(this.stateStoreFile, 'json');
    } catch (err) {
    }

    return Object.assign({}, this.defaultSize, restoredState);
  }

  getCurrentPosition() {
    let position = this.win.getPosition();
    let size = this.win.getSize();

    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  }

  windowWithinBounds(windowState, bounds) {
    return windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height;
  }

  resetToDefaults(windowState) {
    let bounds = screen.getPrimaryDisplay().bounds;

    return Object.assign({}, this.defaultSize, {
      x: (bounds.width - this.defaultSize.width) / 2,
      y: (bounds.height - this.defaultSize.height) / 2
    });
  }

  ensureVisibleOnSomeDisplay(windowState) {
    let visible = screen.getAllDisplays().some((display) => {
      return this.windowWithinBounds(windowState, display.bounds);
    });

    if (!visible) {
      return this.resetToDefaults(windowState);
    }

    return windowState;
  }

  saveState() {
    if (!this.win.isMinimized() && !this.win.isMaximized()) {
      Object.assign(this.state, this.getCurrentPosition());
    }

    this.userDataDir.write(this.stateStoreFile, this.state, { atomic: true });
  };
}