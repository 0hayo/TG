import { app, shell, BrowserWindow, ipcMain, BrowserView } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { setWindowSize } from './eventCollection'
import { SET_WINDOW_SIZE } from './constants'
import { electronStore } from './store'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 810,
    minWidth: 1440,
    minHeight: 810,
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

  // mainWindow.webContents.openDevTools({ mode: 'right' })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 创建一个新的BrowserWindow实例
  // const win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   show: false,
  //   autoHideMenuBar: true,
  //   frame: false,
  //   ...(process.platform === 'linux' ? { icon } : {}),
  //   webPreferences: {
  //     preload: join(__dirname, '../preload/index.js'),
  //     sandbox: false,
  //     webviewTag: true
  //   }
  // })

  // win.loadURL(
  //   'https://web.telegram.org/k/#?tgaddr=tg%3A%2F%2Fresolve%3Fdomain%3DEG521%26post%3D44479982'
  // )
  // win.on('ready-to-show', () => {
  //   win.show()
  // })

  // ipcMain.on('capture-webview-screenshot', (event, data) => {
  //   console.log(123, event, data)

  //   // 加载与webview相同的内容
  //   win.loadURL(data)

  //   // 等待内容加载完成（这里只是一个示例，你可能需要更精确的加载完成检测）
  //   win.webContents.on('did-finish-load', () => {
  //     // 捕获截图
  //     win
  //       .capturePage()
  //       .then((image) => {
  //         // image 是一个NativeImage实例，你可以将其转换为Base64或保存到文件
  //         // 例如，转换为Base64字符串
  //         const base64Image = image.toDataURL()
  //         console.log(base64Image) // 打印Base64字符串到控制台

  //         // 关闭窗口（可选）
  //         // win.close()
  //       })
  //       .catch((error) => {
  //         console.error('Failed to capture page', error)
  //       })
  //   })
  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
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
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const win = new BrowserWindow({ width: 800, height: 600 })

  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  view.webContents.loadURL('https://electronjs.org')
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
