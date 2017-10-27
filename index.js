const fs = require('fs')
const http = require('http')
const path =  require('path')
const tMapUrl = 'http://t0.tianditu.com/DataServer?T=vec_c&'
// 最大缩放 
const level = 5
const levelStart = 5
let xRange = null
let yRange = null
// var server = http.createServer(function(req, res){}).listen(50066);
// console.log("http start");

// var url = "http://t0.tianditu.com/DataServer?T=vec_c&x=7&y=2&l=3";
function getImg(i,x,y) {
  http.get(`${tMapUrl}x=${x}&y=${y}&l=${i}`, function(res){
    var imgData = "";
    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    res.on("data", function(chunk){
        imgData+=chunk;
    });
    res.on("end", function(){

        let savePath = path.resolve(__dirname,'imgs/')
        checkPath(savePath)
        checkPath(savePath + `/level${i}`)
        checkPath(savePath + `/level${i}` + `/x-${x}/`)
        console.log(`./imgs/level${i}/x-${x}/y-${y}.png`)
        fs.writeFileSync(`./imgs/level${i}/x-${x}/y-${y}.png`, imgData, "binary");
        
        
    });
  });
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
      // console.log(`${tMapUrl}x=${x}&y=${y}&l=${i}`)
    }
  }
}
