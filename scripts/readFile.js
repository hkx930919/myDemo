const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const FILE_PATH=path.join(__dirname,'../')
const promptList =[
    {
        type:'list',
        message:'请选择读取文件还是文件夹',
        name:'fileType',
        choices:[
            'File',
            'Directory'
        ],
        filter(v){
            console.log(v);
            return v.toLowerCase()
        }
    },
]
inquirer.prompt(promptList).then(async res=>{
    const fileType = res.fileType
    const dirs= await fs.readdir(FILE_PATH)
    let content
    switch (fileType) {
        case 'file':
            content = dirs.filter(f=>{
                const stat = fs.statSync(path.join(FILE_PATH,f))
                return !stat.isDirectory()
            })
            break;
            
        case 'directory':
                content = dirs.filter(f=>{
                    const stat = fs.statSync(path.join(FILE_PATH,f))
                    return stat.isDirectory()
                })
            break;
    }
    console.log(chalk.yellow('res',JSON.stringify(res)));
    console.log(chalk.yellow('content',JSON.stringify(content)));
    console.log(chalk.green(process.cwd()));
    
})