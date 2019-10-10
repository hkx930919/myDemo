const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const moment = require('moment')
const FILE_PATH=path.join(__dirname,'../js')

const getFilePath = fileName=>{
    const date = moment().format('YYYY-MM-DD')
    return path.join(FILE_PATH,`${date} ${fileName}.js`)
}
const isFileExists = (fileName)=>{
    return fileName && fs.pathExistsSync(getFilePath(fileName))
}

const promptList =[
    {
        type:'input',
        message:'即将在js目录创建文件，请输入文件名称',
        name:'name',
        validate(val = '') {
            val = val.trim().toLowerCase()
            if (!val) {
              return '请输入有效的文件名称'
            }
            if (isFileExists(val)) {
              return '该文件已经存在'
            }
            return true
          }
    },
]

inquirer.prompt(promptList).then(async res=>{
    await fs.writeFile(getFilePath(res.name),
    `// ${res.name}`)
    console.log(chalk.green('创建成功'));
})