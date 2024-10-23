const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 5000;

app.use(express.static('public'))


app.get('/', (req,res)=>{
    res.sendFile('/index', {root: __dirname});
})

app.get('/tracker', (req,res)=>{
    res.sendFile('/tracker', {root: __dirname});
})
app.get('/sic', (req,res)=>{
    res.sendFile('/sic', {root: __dirname});
})

app.use((req, res) => {
    res.status(404).send('<h1 style="margin:auto; color: darkorange; font-family:Sans-serif;font-size:5rem ">404 - Page Not Found</h1>');
});


app.listen(port, ()=>{
    console.log(`Server is listening at http://${hostname}:${port}`)
})