pc.js 代码
```
var http=require ("http");
var url="http://sports.sina.com.cn/nba/1.shtml";
 http.get(url,(res)=>{

     var html="";
     res.on("data",function (chunk) {
         html+=chunk;
     });
     res.on("end",function () {
         console.log(html);
     });
 //    后台返回的数据,携带chunk数据
 }).on("error",(e)=>{
     console.log(e.message);
 //    如果在访问过程中有错误,输出错误信息
 });
```
爬取 [新浪nba球明星](http://sports.sina.com.cn/nba/1.shtml)
**运行:**
```node  pc.js```
只能爬出来 网页的源代码
此处需要一个npm 库
[cheerio](https://www.npmjs.com/package/cheerio)

这是一个用正则来筛选信息的库
```npm install cheerio```
pc1.js 代码
```
var http=require ("http");
var cheerio=require("cheerio");
var url="http://sports.sina.com.cn/nba/1.shtml";
 http.get(url,(res)=>{

     var html="";
     res.on("data",function (chunk) {
         html+=chunk;
     });
     res.on("end",function () {
         // console.log(html);
         var $=cheerio.load(html);
         console.log($("#right a").html());
         $("#right a").each(function () {
             console.log($(this).attr("href"));
         });
     });
 //    后台返回的数据,携带chunk数据
 }).on("error",(e)=>{
     console.log(e.message);
 //    如果在访问过程中有错误,输出错误信息
 });
```
**运行:**
```node  pc.js```

能获取到网页的href标签内容
pc2.js
```
var http=require ("http");
var cheerio=require("cheerio");
var fs=require("fs");
var url="http://sports.sina.com.cn/nba/1.shtml";

function httpGet(url,cb) {
    var html="";
    http.get(url,function (res) {
        res.on("data",function (chunk) {
            html+=chunk;
        });
        res.on("end",function () {
            cb(html);
        })
    }).on("error",function (e) {
        console.log(e.message);
    });
    return html;
}
httpGet(url,function (html) {
    var $=cheerio.load(html);
    $("#right a").each(function (index) {
        var newUrl=$(this).attr("href");
        httpGet(newUrl,function (body) {
            var jq=cheerio.load(body);
            fs.writeFile(`./news/${index}.txt`,jq("#artibody").text(),function (err) {
                //用node.js 把获取到的text放入一个news文件夹
                if(err){
                    return console.log(err.message);
                }
                console.log("完成");
            })
        })

    })

});
```
**运行:**
```node  pc.js```

一个封装好的httpGet函数 并且用 node.js 里边的 fs.writeFile函数 将获取到的数据 放在一个new的文件夹中
