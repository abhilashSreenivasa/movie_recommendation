const express= require('express')
var bodyParser = require('body-parser')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./models/user.model')
const { request, response } = require('express')
const jwt= require('jsonwebtoken')
const path=require('path')

app.use(express.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json());
/*
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

mongoose.connect('mongodb+srv://asreenivasa:Appleshinigami%40321@cluster0.pxydufm.mongodb.net/?retryWrites=true&w=majority' )
app.get('/',(req,res)=>{
    res.send("hello")
})
app.post('/api/register', async(req,res)=>{
	try {
		//const newPassword = await bcrypt.hash(req.body.password, 10)
		 User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})


app.post('/api/login', async(req,res)=>{
    console.log(req.body)
	
		const user=await User.findOne({email: req.body.email,
        password: req.body.password
    })
    if(user){
        const token=jwt.sign({
            name:user.name,
            email:req.email
        },'secret',{
            expiresIn:'1d'
        })
        console.log("user is is: "+user._id)
		res.json({ status: 'ok',user:token,uid:user._id})
    }
    else
        res.json({status: 'error',user: false})
	
})

app.get('/api/data/:uname',async(req,res)=>{
    try{
    const user= await User.find({name:req.params.uname})
    res.status(200).json({userInfo:user})
    }
    catch(err){
        console.log(err)
        res.status(404)
    }
  
})



app.post('/api/add/:uname/:num',verifyjwt, async (req,res)=>{
    
    const newInvent= await User.find({name:req.params.uname})
    const newItem={
        mid: req.body.mid,
        title: req.body.title,
        desc:   req.body.desc,
        date:   req.body.date,
        rating: req.body.rating,
        imageURL:  req.body.imageURL
    }
  try{
    if(req.params.num==1 || req.params.num=='1'){
    User.findOneAndUpdate(
        { _id: newInvent[0]._id.toString() }, 
        { $push: { favourites: newItem  } },
       async function (error, success) {
             if (error) {
                console.log(error)
                 res.status(500);
             } else {
                 res.status(201);
             }
         });
     }
     else{
        User.findOneAndUpdate(
            { _id: newInvent[0]._id.toString() }, 
            { $push: { watchLater: newItem  } },
           async function (error, success) {
                 if (error) {
                    console.log(error)
                     res.status(500);
                 } else {
                     res.status(201);
                 }
             });
        
     }
    }
    catch(err){
        console.log(err)
    }
    res.sendStatus(201)
    
     
})




app.post('/api/delete/:uname/:mid',verifyjwt, async(req,res)=>{
    try{
        console.log(req.params.mid)
    await User.updateOne({ name: req.params.uname }, {
        $pull: {
            favourites: {mid:req.params.mid},
        },
        async function(err,found){
            if(err){
                response.status(500)
            }
        }
    });
   }
   catch(err){
    console.log(err)
    res.status(500)
   }
   const user=await User.find({name: req.params.uname.toString()})
   res.status(201).json({favourites:user[0].favourites})
        
})



app.listen(1337,()=>{
    console.log("Server started on port 1337")
}) 

function verifyjwt(req,res,next){
    const token = req.headers['authorization'].split(' ')[1]
    if(!token) return res.status(401).json('Unauthorize user')
   try{
        const decoded = jwt.verify(token,'secret');
        req.user = decoded
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
}