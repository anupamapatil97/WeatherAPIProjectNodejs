const fs=require("fs");
const http=require("http");
const requests=require("requests");

const homeFile=fs.readFileSync("index.html" ,"utf-8");
const replaceVal=(tempVal,oriVal)=>{
let temprature=tempVal.replace("{%tempval%}",oriVal.main.temp);
temprature=temprature.replace("{%tempmin%}",oriVal.main.temp_min);
temprature=temprature.replace("{%tempmax%}",oriVal.main.temp_max);
temprature=temprature.replace("{%location%}",oriVal.name);
temprature=temprature.replace("{%country%}",oriVal.sys.country);

// temprature=temprature.replace("{%tempstatus%}",oriVal.weather[1].main);

return temprature;
}

const server=http.createServer((req,res)=>{
if(req.url=="/"){
    requests('http://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=1aaa5d0903fb685fc7264e513d9bdd15')
.on('data', function (chunk) {
    const objdata=JSON.parse(chunk);
    const arrData=[objdata]
//   console.log(arrData);
  let realTimeDate=arrData.map((val)=>{
     return replaceVal(homeFile,val)
  }).join("");
res.write(realTimeDate);
// console.log(realTimeDate)
})
.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
  res.end()
});
}
});
server.listen(5400,(err)=>{
    if(err)throw err;
    console.log("successfully created server")
})