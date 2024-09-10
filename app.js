const express=require('express');
const path = require('path');
const app=express();
const userModel=require('./model/user');
const { name } = require('ejs');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public'))
)


app.get('/',(req,res)=>{
    res.render('index')
})



app.get('/read', async(req,res)=>{
    let alluser=await userModel.find();
    res.render('read',{user:alluser})
})

app.get('/delete/:id', async(req,res)=>{
    let alluser=await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read')
})


app.get('/edit/:userid', async(req,res)=>{
 
 let user=await userModel.findOne({_id:req.params.userid});
 res.render('edit' ,{user})

})
app.post('/update/:id', async(req,res)=>{
 let {image,name,email}=req.body;
    let user=await userModel.findOneAndUpdate({_id:req.params.id},{name,image,email},{new:true});
    res.redirect('/read' )
   
   })


app.post('/create', async(req,res)=>{
let useCreated=await  userModel.create({
    name:req.body.name,
    email:req.body.email,
    image:req.body.image
})
res.redirect('/read')
})


app.listen(3000);