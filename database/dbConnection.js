const mongoose = require('mongoose')

connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log('Mogodb atlas connection successful');
}).catch(err=>{
    console.log('Mongodb atlas connection failed');
    console.log(err);
})