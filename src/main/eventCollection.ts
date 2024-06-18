import { BrowserWindow } from 'electron'

export const setWindowSize = async (event, type: string) => {
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
      } else win?.maximize()
      break
    case 'maximize':
      win?.maximize()
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
}
