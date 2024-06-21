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
  './theme.json',
]

const targetFolder = './dist'

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
