var express = require('express'),
    app= express(),
    mongoose= require('mongoose'),
    bodyParser=require('body-parser'),
    cors=require('cors')
    jwt=require('jsonwebtoken');

app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.Promise=require('q').Promise;
mongoose.connect('mongodb://localhost:27017/blogdb',{useNewUrlParser:true});
var db=mongoose.connection;

db.on ('error',function(){
    console.log('error');
});

db.on ('open',function(){
    console.log('connection established');
});
// connection with mongo to save userdata
var user_Schema=mongoose.Schema({
    username:String,
    password:String
    });

var user_model= mongoose.model('userdata',user_Schema);

app.post('/save',function(req,res){
    var regdata={username:req.body.username,password:req.body.password};
    user_model.create(regdata,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
            console.log(" registration success ");
        }
    })
})

//to authenticate for login
app.post('/authenticate',function(req,res){
   
    var token=jwt.sign({'uname':req.body.username},'secret-key',{expiresIn:'1h'});
    
    var username=req.body.username;
    var password=req.body.password;
    var loginContent={username:username,password:password};
    user_model.findOne(loginContent,function(err,data){
        if(data){
            res.send({isLoggedIn:true,
            token:token})   
        } 
        else{
            res.send({isLoggedIn:false,
            msg:"login failed"})
        }
    })     
});


app.use(function(req,res,next){
    var token=req.body.authtoken||req.query.authtoken||req.headers['authtoken'];
    jwt.verify(token,'secret-key',function(err,decoded){
        if(err){
            res.send({
                err:true,
                msg:'invalid req'
            });
        }else{
            req.decoded=decoded;
            next();
        }
    });
});
// to save posts
var post_schema=mongoose.Schema({
    Post_title : String,
    Post_description: String,
    createdby:String,
    Comments:[{comment:String,
        commentator:String 
    }],
    likedby:[]
});

var post_model= mongoose.model('post',post_schema);

app.post('/cpost',function(req,res){
    var postContent={Post_title:req.body.title,Post_description:req.body.description,
        createdby:req.decoded.uname};
    post_model.create(postContent,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);
            console.log("post saved");
        }
    })
});
//to list all the posts available in db
app.get("/lpost",function(req,res){
    post_model.find({},function(err,data){
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(data);   
        }
    })
})
// for viewing specific post
app.post('/specific',function(req,res){
    var id_details ={_id: req.body.pid} ;
    post_model.findOne(id_details,function(err,data){
        if(data){
            res.send(data); 
        } 
        else{
            res.send("error");
        }
    })     
});
//to save comments
app.post('/savecomm',function(req,res){
    var id_details ={_id: req.body.pid};
    post_model.findByIdAndUpdate(id_details,{$push:{Comments:
        [{comment:req.body.comment,
        commentator:req.decoded.uname}]
    }},function(err,data){
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send({msg:"comment saved"});
        }
    })

});

//to view comments
app.post('/vcomm',function(req,res){
    var id_details ={_id: req.body.cid};
    post_model.findOne(id_details,function(err,data){
        if(data){
            res.send(data); 
        } 
        else{
            res.send("error");
        }
    })     
});

// to view number of likes

app.post('/likeno',function(req,res){
    var id_details ={_id: req.body.lid};
    var uname=req.decoded.uname;
    post_model.findById(id_details,function(err,data){
        if(err)
        {
            console.log(err)
        }
        else if(!data.likedby.includes(uname)){
            post_model.findByIdAndUpdate(id_details,{$push:{likedby:uname}},function(err,data){
                if(err){
                    console.log(err);
                }
                else{
                    post_model.findById(id_details,function(err,data){
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                            res.send(data);
                        }
                    })
                        
                }
            })
        }
        else{
            res.send(data);
        }
    }) 
});

//to delete
app.post('/del',function(req,res){
    var id_details ={_id: req.body.did};
    var uname=req.decoded.uname;
    post_model.findById(id_details,function(err,data){
         if(err)
         {
             console.log(err);
         }
        else if(data.createdby==uname){
            post_model.findByIdAndRemove(id_details,function(err,data){
                if(err){
                    console.log(err);
                }else{
                    res.send({msg:"successfully deleted"});

                }
            })
        }

        else{
            res.send({msg:"sorry cannot del others posts"});
        }
    }) 
});
// to update
app.post('/update',function(req,res){
    var id_details ={_id: req.body.uid};
    var uname=req.decoded.uname;
    var updateContent={Post_title:req.body.title,Post_description:req.body.des};
    post_model.findById(id_details,function(err,data){
         if(err)
         {
             console.log(err);
         }
        else if(data.createdby==uname){
            post_model.findByIdAndUpdate(id_details,updateContent,function(err,data){
                if(err){
                    res.send({msg:"error"});
                }else{
                    res.send({msg:"successfully updated"});
                }
            })
        }

        else{
            res.send({msg:"sorry cannot update others posts"});
        }
    }) 
});



app.listen(3000,function(){
    console.log('server running @localhost:3000');
});