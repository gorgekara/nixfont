import { app, Menu } from 'electron';
import request from 'request';

import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import ElectronWindow from './helpers/electron-window';
import env from './env';
import FontFetcher from './helpers/font-fetcher';

function setApplicationMenu() {
  let menus = [editMenuTemplate];

  if (env.name !== 'production') {
    menus.push(devMenuTemplate);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}

if (env.name !== 'production') {
  let userDataPath = app.getPath('userData');
  app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', () => {
  setApplicationMenu();

  let mainWindow = new ElectronWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
    maximizable: false
  })

  mainWindow.win.loadURL('file://' + __dirname + '/app.html');
});

app.on('window-all-closed', () => {
  app.quit();
});
