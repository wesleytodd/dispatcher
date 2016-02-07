var app = require('nighthawk')();
require('./routes')(app);
app.listen();
