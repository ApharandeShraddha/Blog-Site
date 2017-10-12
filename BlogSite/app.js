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

var blog= mongoose.model("Blog" ,blogSchema);

//ROUTES



//Listen on cloud 9 port
app.listen(process.env.PORT , process.env.IP,function(){
    console.log("SERVER IS RUNNING!")
});