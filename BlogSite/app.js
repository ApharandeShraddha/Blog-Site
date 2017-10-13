//packages
var bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

//Database Connection
mongoose.connect("mongodb://localhost/restful-blog-app" , {useMongoClient: true});

//set folders
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true }));


//Database Schema configuration
var blogSchema = new mongoose.Schema({
    title :String,
    image :String,
    body : String,
    created : 
        {type: Date , default : Date.now}
});

var Blog= mongoose.model("Blog" ,blogSchema);


//ROUTES

//INDEX Route

app.get("/blogs",function(req , res){
       Blog.find({},function(err , blogs){
         if(err){
             console.log("ERROR!");
         } else{
            res.render("index" ,{blogs : blogs});
         }
      });
     
    });

//NEW Route

app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

//CREATE Route

app.post("/blogs", function(req, res){
   // req.body.blog.body = req.sanitize(req.body.blog.body);
   var formData = req.body.blog;
   Blog.create(formData, function(err, newBlog){
       console.log(newBlog);
      if(err){
          res.render("new");
      } else {
          res.redirect("/blogs");
      }
   });
});

//SHOW route
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/");
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
       if(err){
           console.log(err);
           res.redirect("/")
       } else {
           res.render("edit", {blog: blog});
       }
   });
});

//route to main page
app.get("/",function(req , res){
   
       res.redirect("/blogs");
});
    
//Listen on cloud 9 port
app.listen(process.env.PORT , process.env.IP,function(){
    console.log("SERVER IS RUNNING!")
});