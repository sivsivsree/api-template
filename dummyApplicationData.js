const mongoDB = require('./database/enableMongo');
mongoDB.connectMongo();
require("./database/registerModels");
const mongoose = require('mongoose');

const application = mongoose.model('application');



let newap = new application({
    custNum:  "DAFTY7UYDD",                                           
    erpRefNum: "ERP223445",   
    companyName: "FedEx", 
    companyNameAr: "FedEx",
    legal:{ 
        name: "FedEx Express", 
        contactPerson:  "John Jacob",
        phoneNum: "+971503287945",
        faxNum: "+971503287948"
    },
    companyRegDate:  "11/22/2010",  
    parentCompName: "",
    parentCompActivity: "",
    countryCode:  "223", 
    city: "Dubai",    
    managerEmail: "manager@demo.com",
    proEmail: "pro@demo.com",
    companyType: { code: "2", name: "tra" },
    licenseType: { id: "4", desc: "rr" },
    license:{
        licenseNum:  "TY7UYDD", 
        firstExpDate: "11/22/2018", 
        status: "Expired",
    },
    Lease:[{
        leaseNum:  "000112", 
        officeNum: "+9714443332", 
        startDate: "11/22/2018", 
        expiryDate: "11/22/2020", 
        leaseTerm:   2, 
        tremStartDate: "11/22/2018", 
        termExpiryDate: "11/22/2020", 
        leaseStatus: "In Progress"
    },{
        leaseNum:  "000114", 
        officeNum: "+9714443338", 
        startDate: "11/22/2018", 
        expiryDate: "11/22/2020", 
        leaseTerm:   2, 
        tremStartDate: "11/22/2018", 
        termExpiryDate: "11/22/2020", 
        leaseStatus: "In Progress"
    }],
   
    state: [],
    User:"user",
    activity:[{
        id:"AS1123",
        group:"Education",
        Name:"Fire Saftey Training",
        nocIssuer:"Gernal Service Defence",
        fee:"500"
    }],
    for:"tra"
        
});
newap.save().then((err,data) =>{
    console.log("done",err,data);
});
