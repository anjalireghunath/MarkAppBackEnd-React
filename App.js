const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var markModel=Mongoose.model("marks",
new Mongoose.Schema(
    {
        name:String,
        admno:String,
        cgpa:String
    })
)
Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/marksDB")

app.post("/api/search",(req,res)=>{
    var getAdmno=req.body
    markModel.find(getAdmno,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send(data)
        }
    })
})

app.get("/api/viewall",(req,res)=>{
    markModel.find(
        (error,data)=>{
            if(error){
                 res.send({"status":"error"})
            }
            else{
                res.send(data)
            }
        }
    )
})

app.post("/api/addmark",(req,res)=>{
    var data=req.body
    let ob=new markModel(data)
    ob.save((error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success","data":data})
        }
    })
    
})



app.listen(4001,()=>{
    console.log("server running")
})