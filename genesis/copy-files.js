const fs = require('fs')
const path = require('path')

const sourceList = [
  './assets',
  './inc-functions',
  './parts',
  './patterns',
  './templates',
  './functions.php',
  './screenshot.png',
  './style.css',
  './customize.css',
  './customize.js',
  './theme.json',
]

const targetFolder = './dist'

// Function to delete all files and folders inside a directory
function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const currentPath = path.join(directory, file)
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursively delete folder contents
        clearDirectory(currentPath)
        // Remove the empty folder
        fs.rmdirSync(currentPath)
      } else {
        // Delete the file
        fs.unlinkSync(currentPath)
      }
    })
  }
}

function copyFileSync(source, target) {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync(source, target) {
  let files = []

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

// Create target folder if it doesn't exist
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder)
} else {
  // Clear the contents of the target folder
  clearDirectory(targetFolder)
}

sourceList.forEach((source) => {
  if (fs.existsSync(source)) {
    if (fs.lstatSync(source).isDirectory()) {
      copyFolderRecursiveSync(source, targetFolder)
    } else {
      copyFileSync(source, targetFolder)
    }
    console.log(`${source} を ${targetFolder} に正常にコピーしました。`)
  } else {
    console.log(`コピー元 ${source} が存在しません。`)
  }
})
