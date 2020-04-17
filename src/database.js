const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerceAuth',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(db=>console.log('Database is connected'))