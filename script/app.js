/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')

// 读取 router 文件夹里的所有文件
const dir = path.join(process.cwd(), './src/router')

const allFiles = []
function readDir(dir) {
  if (fs.statSync(dir).isDirectory()) {
    const pathArr = fs.readdirSync(dir)
    pathArr.forEach((item) => {
      const tempPath = path.join(dir, item)
      const info = fs.statSync(tempPath)
      if (info.isFile()) {
        allFiles.push(tempPath)
      } else if (info.isDirectory()) {
        readDir(tempPath)
      }
    })
  }
}

readDir(dir)
// 读取 router 文件夹里的所有文件 end

// 读取文件里指定的views 文件路径

const viewFiles = []

function readFile(dir) {
  if (fs.statSync(dir).isFile()) {
    const content = fs.readFileSync(dir)
    const files = content.toString().match(/@\/views\/.+?\.vue/gi)
    files.forEach((item) => {
      viewFiles.push(item)
    })
  }
}

allFiles.forEach((item) => {
  readFile(item)
})

// 读取文件里指定的views 文件路径 end

// 生成 views 里的view 文件
const viewPath = path.join(process.cwd(), './src/')
const templatePath = path.join(process.cwd(), './template/vue.ejs')

viewFiles.forEach((item) => {
  const file = item.replace('@/', './')
  const targetPath = path.join(viewPath, file)

  if (!fs.existsSync(targetPath)) {
    ejs.renderFile(templatePath, {}, (err, str) => {
      if (!err) {
        fse.outputFileSync(targetPath, str)
        console.log(`生成文件: ${targetPath} 成功`)
      }
    })
  }
})
