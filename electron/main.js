const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  if (isDev) {
    // 开发环境下加载开发服务器地址
    win.loadURL('http://localhost:8080/#/overview')
    // 打开开发者工具
    win.webContents.openDevTools()
  } else {
    // 生产环境下加载本地文件
    win.loadFile(path.join(__dirname, '../dist/index.html'))
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