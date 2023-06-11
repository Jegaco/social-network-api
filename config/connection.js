const mongoose = require('mongoose');

mongoose.connect(process.env.MONOGDB_URI || 'mongodb://localhost:27017/social-network-db',{
    useNewUrlParser: true, useUnifiedTopology: true,
}, (err) => {
    if(err) 
    {
        console.log(err)
    } else {
        console.log('Successfully connected!')
    }
});

module.exports = mongoose.connection