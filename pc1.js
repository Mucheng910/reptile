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