import { BrowserWindow } from 'electron'
import Store from 'electron-store'
const store = new Store()

export const setWindowSize = async (event, type: string) => {
  const windowState = store.get('windowState') as Electron.Rectangle

  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  switch (type) {
    case 'min':
      win?.minimize()
      break
    case 'max':
      if (win?.isMaximized()) {
        win?.setSize(1440, 820)
        win?.center()
      } else {
        win?.maximize()
      }
      break
    case 'maximize':
      win?.setSize(windowState.width, windowState.height)
      win?.center()
      break
    case 'loginmaximize':
      win?.setSize(1440, 820)
      win?.center()
      break
    case 'unmaximize':
      win?.setSize(800, 450)
      win?.center()
      break
    case 'close':
      win?.close()
      break
    default:
      break
  }

  win?.on('close', () => {
    if (win) {
      const bounds = win.getBounds()
      // 保存窗口的大小和位置
      store.set('windowState', {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y
      })
    }
  })
}
