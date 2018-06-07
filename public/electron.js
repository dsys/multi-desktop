/* eslint-disable */
const electron = require('electron');
//const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const menubar = require('menubar');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

var mb = menubar({
  icon: path.join(__dirname, 'MenubarIcon.png')
});

mb.on('ready', function ready() {
  console.log('app is ready');
});

mb.on('after-create-window', function window() {
  mb.window.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
});

/*
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
*/
