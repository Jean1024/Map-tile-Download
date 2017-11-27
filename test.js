var imageLinks = require('./test.json')
const fs = require('fs');
const path = require('path')
const download = require('download');
const url =require('url')
const querystring = require('querystring')
let files = require('./test.json')
files.map(function (v) {
  let query = url.parse(v).query
  let obj = querystring.parse(query)
    let savePath = path.resolve(__dirname,'img/')
        checkPath(savePath)
        checkPath(savePath + `/level${obj.l}`)
        checkPath(savePath + `/level${obj.l}` + `/x-${obj.x}/`)
        var imgUrl= `./img/level${obj.l}/x-${obj.x}/y-${obj.y}.png`
        console.log(imgUrl)
  download(v).pipe(fs.createWriteStream(imgUrl));
})


// 检查文件夹是否存在
function fsExistsSync(path) { 
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
function checkPath(path) {
  let flag = fsExistsSync(path)
  flag || (fs.mkdirSync(path))
}
