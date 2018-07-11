/* eslint-disable */
const {app, Menu, Tray, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let primaryWindow = null;
const primaryWindowURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`
const primaryWindowWidth = 1200;
const primaryWindowHeight = 800;

let tray = null;
let trayWindow = null;
const trayWindowURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`
const trayWindowWidth = 600;
const trayWindowHeight = 400;
const trayIconPath = path.join(__dirname, 'menubar-icon.png');

function positionTrayWindow(trayIconBounds) {
  const middleOfTrayIconX = trayIconBounds.x + trayIconBounds.width/2;
  const trayWindowPosX = middleOfTrayIconX - trayWindowWidth/2;
  const trayWindowPosY = trayIconBounds.height;

  trayWindow.setPosition(trayWindowPosX, trayWindowPosY);
}

function setupTray() {
  tray = new Tray(trayIconPath)
  trayWindow = new BrowserWindow({width: trayWindowWidth, height: trayWindowHeight, frame: false, show:false})
  trayWindow.loadURL(trayWindowURL);
  trayWindow.on('blur', trayWindow.hide);
  tray.on('click', (event, bounds, position)=>{
    if(trayWindow.isVisible()){
      trayWindow.hide();
    } else {
      positionTrayWindow(bounds);
      trayWindow.setVisibleOnAllWorkspaces(true);
      trayWindow.show();
      trayWindow.setVisibleOnAllWorkspaces(false);
    }
  })
}

function setupPrimaryWindow() {
  primaryWindow = new BrowserWindow({width: primaryWindowWidth, height: primaryWindowHeight, titleBarStyle: 'hiddenInset'})
  primaryWindow.loadURL(primaryWindowURL);
}

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});

app.on('ready', () => {
  setupPrimaryWindow();
  setupTray();
})
