// const http = require("http");
import http from "http";
import fs from "fs";


const server = http.createServer((req,res)=>{

    if(req.url === "/about"){
        res.end("<h1>About Page</h1>");
    }
    else if(req.url === "/"){

        fs.readFile("./index.html",(err,data)=>{
            
            res.end(data);
         });

    }
    else if(req.url === "/contact"){
        res.end("<h1>Contact Page</h1>");
    }
    else{
        res.end("<h1>Page Not found</h1>"); 
    }
 
});

server.listen(5000,()=>{

    console.log("Server is working");

})