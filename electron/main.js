const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // 自动隐藏菜单栏
    resizable: false, // 禁止窗口缩放
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  // 模拟全屏效果
  win.maximize()

  // 监听 Esc 键退出全屏
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      win.unmaximize()
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:8080')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools()
    })
  }
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})