require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
app.use(express.json());
const bankCustomerModel = require("./models/bankCustomer");

mongoose.connect(process.env.MONGOURL).then(() => console.log("MongoDB connected"));

app.post("/addBankCustomer", (req,res)=>{
    const {addBankCustomer} = req.body;
    const addData = bankCustomerModel.create(addBankCustomer);
    if(addData){
        return res.json({data:"Bank customer details added successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

app.get("/bankCustomerDetails/:cId", async (req,res) => {
    const cId = req.params.cId;
    const details = await bankCustomerModel.findOne(
        {customer_id:cId}
    );
    if(details){
        const cDetail = await bankCustomerModel.find({customer_id:details["customer_id"]});
        return res.json({data:cDetail});
    }
    return res.json({data:"No data found"});
});

app.get("/allBankCustomerDetails", async (req,res)=>{
    const details = await bankCustomerModel.find();

    if(details === 0){
        return res.json({data:"No data found"});
    }

    return res.json({data:details});
});

app.put("/updateAddress", async (req,res)=>{
    const id = req.body.customer_id;
    const address = req.body.address;
    const updateData = await bankCustomerModel.findOneAndUpdate(
        {customer_id: id},
        {address : address},
        {new:true}
    ); 
    if(updateData){
        return res.json({data:"Custoer address updated successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

app.put("/updateContactNo", async (req,res)=>{
    const id = req.body.customer_id;
    const contactNo = req.body.contactNo;
    const updateData = await bankCustomerModel.findOneAndUpdate(
        {customer_id: id},
        {contactNo : contactNo},
        {new:true}
    ); 
    if(updateData){
        return res.json({data:"Customer contact Number updated successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

app.delete("/idOfCustomer/:cId", async (req,res)=>{
    const cId = req.params.cId;
    const deleteData = await bankCustomerModel.findOneAndDelete(
        {customer_id : cId}
    );
    if(deleteData){
        return res.json({data:"Customer deleted Successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

app.delete("/nameOfCustomer/:name", async (req,res)=>{
    const name = req.params.name;
    const deleteData = await bankCustomerModel.findOneAndDelete(
        {name : name}
    );
    if(deleteData){
        return res.json({data:"Customer deleted Successfully"});
    }
    return res.json({data:"Something is wrong please try again"});
});

app.listen(port , () => {console.log(`App Run On ${port}`);});