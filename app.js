const express=require("express"),
    bodyParser=require("body-parser"),
    request=require("request-promise");

    var app=express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.get("/",function(req,res)
    {
        res.redirect("/postDatatoFlask");
    })
    app.get("/getData",async function(req,res)
    {
        res.render("getData.ejs");

    })
    app.get("/postDatatoFlask",async function(req,res)
    {
        var movie_name=req.body.movie_name;
        var data={movie:"Fargo"};
        var options={
            method: "POST",
            url: "http://127.0.0.1:5000/postdata",
            body: data,
            json: true
        };

        var returndata;
        var sendrequest=await request(options)
        .then(function(parsedBody)
        {
            console.log(parsedBody);
            return data=parsedBody;
        }).then(function()
        {
            console.log("movie recommendations was succesfull");
            res.send(data);
        })
        .catch(function(err)
        {
            console.log(err);
        });
    });

    app.listen(3000,'127.0.0.2',function()
    {
        console.log("Node server started at port 3000");
    })