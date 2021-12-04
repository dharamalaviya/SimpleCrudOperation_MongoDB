const mongoose = require("mongoose");

const bankCustomerSchema = mongoose.Schema({
    customer_id : String,
    name : String,
    address : String,
    contactNo : Number,
    bankName : String,
    branchCode : String

});

const bankCustomerModel = mongoose.model("bankCustomerDetails",bankCustomerSchema,"bankCustomerDetails");

module.exports = bankCustomerModel;