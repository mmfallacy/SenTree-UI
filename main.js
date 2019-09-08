const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const esplash = require("@trodi/electron-splashscreen")
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = esplash.initSplashScreen({
        windowOpts:{
            width: 1200,
            height: 1000,
            resizable:false,
            autoHideMenuBar:true,
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
                }
            },
        templateUrl: path.join(__dirname, 'splash.html'),
        delay:0,
        minVisible: 1500,
        splashScreenOpts: {
            width: 400, 
            height: 200
            },
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on("ready",createWindow)
app.on('window-all-closed', () => {
    app.quit()
})
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})