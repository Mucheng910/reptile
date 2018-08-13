var http=require ("http");
var cheerio=require("cheerio");
var fs=require("fs");
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

 // function httpGet(url,cb) {
 //     var html="";
 //     http.get(url,function (res) {
 //         res.on("data",function (chunk) {
 //             html+=chunk;
 //         });
 //         res.on("end",function () {
 //             cb(html);
 //         })
 //     }).on("error",function (e) {
 //         console.log(e.message);
 //     });
 //     return html;
 // }
 //  httpGet(url,function (html) {
 //      var $=cheerio.load(html);
 //     $("#right a").each(function (index) {
 //         var newUrl=$(this).attr("href");
 //         httpGet(newUrl,function (body) {
 //             var jq=cheerio.load(body);
 //             fs.writeFile(`./news/${index}.txt`,jq("#artibody").text(),function (err) {
 //                 if(err){
 //                     return console.log(err.message);
 //                 }
 //                 console.log("完成");
 //             })
 //         })
 //
 //     })
 //
 //  });