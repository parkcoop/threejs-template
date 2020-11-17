var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use("/build", express.static(__dirname + '/build'));
app.use("/assets", express.static(__dirname + '/public/assde'));

app.listen(8080);