const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('electron-reload')(path.join(__dirname, "dist"));

let win;
let background;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, "dist/assets/logo.ico" )
  })

  


  win.loadURL(`file://${__dirname}/dist/index.html`)

  background = new BrowserWindow({show: false, width: 600, height: 600});
  background.loadURL(`file://${__dirname}/processes/background.db.html`);
  background.webContents.openDevTools();




  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
    background = null;
    app.quit();
  })

  background.on('closed', function () {
    win = null
    background = null;
    app.quit();
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

ipcMain.on("port", function(event, args){
  win.webContents.send('port', args);
})

ipcMain.on("portready", function(event, args){
  win.show();
})

ipcMain.on('ready-for-item', (event, arg) => {
  background.webContents.send('ready-for-item', arg);
})

ipcMain.on('inventory-item', (event, arg) => {
  win.webContents.send('inventory-item', arg);
})