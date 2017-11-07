const fs = require('fs')
const http = require('http')
const path =  require('path')
const tMapUrl = 'http://t0.tianditu.com/DataServer?T=vec_c&'
const download = require('download');
// 最大缩放 
const level = 5
const levelStart = 1
let xRange = null
let yRange = null
let arr = []
// var url = "http://t0.tianditu.com/DataServer?T=vec_c&x=7&y=2&l=3";
function getImg(i,x,y) {

        let savePath = path.resolve(__dirname,'images/')
        checkPath(savePath)
        checkPath(savePath + `/level${i}`)
        checkPath(savePath + `/level${i}` + `/x-${x}/`)
        var imgUrl = `./images/level${i}/x-${x}/y-${y}.png`
        download(`${tMapUrl}x=${x}&y=${y}&l=${i}`).pipe(fs.createWriteStream(imgUrl));
}
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

for (let i = levelStart; i <= level; i++) {
  xRange = Math.pow(2,i) - 1
  yRange = Math.pow(2,i- 1) - 1
  for (let x = 0; x <= xRange ; x++) {
    for (let y = 0; y <= yRange; y++) {
      getImg(i,x,y)
    }
  }
}
