const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
     const fname=(req.body.fname);
     const lname=(req.body.lname);
     const email=req.body.email;

     const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }

                
            }
            



        ]
     };
     const jsonData=JSON.stringify(data);
     

     const url="https://us21.api.mailchimp.com/3.0/lists/541a2adb89";
     const options={
        method:"POST",
        auth: "sujith:8ed9b6f8b039de18f37d73c06dcb20be-us21"

     }
     const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");

        }
        else{
            res.sendFile(__dirname+"/failure.html");

        }
        

     });
     request.write(jsonData);
     request.end();
     
     
     
     

});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.POST || 3000);
//b6b42fc6714342e958ba2870fc572120-us21
//541a2adb89
//4b58868ce21c4e705aadb00c6ce2bbc8-us21