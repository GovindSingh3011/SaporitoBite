const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200);
    res.send(`<title>SpioonSage Server</title> Welcome to root URL of SpoonSage Server`);
});

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server running on http://localhost:${PORT}`);
    else
        console.log("Error occurred, server can't start", error);
});