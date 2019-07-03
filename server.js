const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res){
    console.log('ROOT PATH!');
});

app.get('/react-components/named-day-delivery', function(req,res){
    res.sendFile(path.join(__dirname+'/dist/bundle.js'));
});

// add the router
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
