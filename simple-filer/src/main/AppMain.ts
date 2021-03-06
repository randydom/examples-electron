import { app, BrowserWindow, Menu } from 'electron'
import { InitializeIpcEvents, ReleaseIpcEvents } from './IPCEvents'
import { MainMenu } from './MainMenu'

let mainWindow: BrowserWindow | null

const createMainWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 480,
    minHeight: 320,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  window.loadFile('assets/index.html')
  return window
}

app.on('ready', () => {
  console.log('Initialize Application')
  mainWindow = createMainWindow()
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(MainMenu)

  InitializeIpcEvents()
})

app.on('quit', () => {
  console.log('Application is quit')
})

app.on('window-all-closed', () => {
  console.log('All of the window was closed.')

  ReleaseIpcEvents()
  app.quit()
})
