const electron = require("electron");
const url = require("url");
const path = require("path");

const {
  app, BrowserWindow, Menu, ipcMain
} = electron;

let mainWindow;

// Listen for the app to be ready
app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });
  // Load html into the window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file',
    slashes: true
  }));

  // Build menu from the template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  // Quit application when quitting main window
  mainWindow.on('closed', function(){
    app.quit();
  })
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : "Crtl+Q",
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Language',
    submenu: [
      {
        label: 'Français',
        click(){
          mainWindow.webContents.send('languageChange', 'french');
          
        }
      },
      {
        label: 'English',
        click(){
          mainWindow.webContents.send('languageChange', 'english');
        }
      }
    ]
  }
]

// Add an extra menu item if in MacOS
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({});
}

// Change language from menu


// Add developer tool if not in production
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : "Crtl+I",
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}