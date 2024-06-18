import { app, shell, BrowserWindow, ipcMain, webContents } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { setWindowSize } from './eventCollection'
import { SET_WINDOW_SIZE } from './constants'
import { electronStore } from './store'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 450,
    minWidth: 800,
    minHeight: 450,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webviewTag: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('setProxy', (_, data: string) => {
    mainWindow.webContents.session.setProxy({
      proxyRules: data
    })
  })

  ipcMain.on('setProxyWebview', (_, data: string) => {
    webContents.getAllWebContents().forEach((win) => {
      if (win.getType() == 'webview') {
        win.session.setProxy({
          proxyRules: data
        })
      }
    })
  })

  ipcMain.on('capture-webview-screenshot', () => {
    webContents.getAllWebContents().forEach((win) => {
      if (win.getType() == 'webview') {
        win
          .capturePage()
          .then((image) => {
            // 将截图转换为 Buffer 并发送回渲染进程
            // event.returnValue = image.toPNG().buffer
            mainWindow.webContents.send('screenshot-data', image.toPNG().buffer)
          })
          .catch((err) => {
            console.error('Error capturing screenshot:', err)
          })
      }
    })
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on(SET_WINDOW_SIZE, setWindowSize)

  // 监听设置的改变并发送消息给渲染进程
  ipcMain.on('getConfig', (event) => {
    event.returnValue = electronStore.getAllSettings()
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
