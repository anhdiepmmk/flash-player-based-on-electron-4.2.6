const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')

app.commandLine.appendSwitch('--enable-npapi');

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, 'plugins', pluginName))

app.on('ready', function () {
  var size = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: { plugins: true, webgl: true, webSecurity: false },
    minWidth: 800,
    minHeight: 600,
    frame: true,
  })

  mainWindow.loadURL('http://tamquoctruyenky.vn/')
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
      app.quit()
    }
  })
})