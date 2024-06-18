import { BrowserWindow } from 'electron'

export const setWindowSize = async (event, type: string) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  switch (type) {
    case 'min':
      win?.minimize()
      break
    case 'max':
      win?.isMaximized() ? win?.unmaximize() : win?.maximize()
      break
    case 'maximize':
      win?.maximize()
      break
    case 'unmaximize':
      win?.unmaximize()
      break
    case 'close':
      win?.close()
      break
    default:
      break
  }
}
