const express = require('express'); 
const uuid = require('uuid'); 
const app = express(); 
const port = 3000; 

app.use(express.json()); 
//bank-data
let bankData = []; 

app.get('/products', (req, res) => {
    res.send(bankData);
})

app.post('/add-product', (req, res) => {
    const {name, price} = req.body; 

    const user = {id: uuid.v4(),name, price }

    bankData.push(user); 

    res.json(user); 
})

app.put('/consult/:id', (req, res) => {
    const { id } = req.params; 
    const {name, price} = req.body;

    const consultProduct = {id ,name, price}; 

    const indexId = bankData.findIndex(user => user.id === id); 
        if (indexId < 0) {
            res.status(404).send('id find failed');
        }
    
    bankData[indexId] = consultProduct; 
    res.json(consultProduct); 
}) 

app.delete('/delete-product/:id', (req, res) => {
    const {id} = req.params; 

    const indexDelete = bankData.findIndex(data => data.id === id); 
        if (indexDelete < 0) {
            res.status(404).send('Not find id'); 
        }

    bankData.splice(indexDelete, 1); 
    res.json('Product deleted successfully!');
})

app.listen(port, () => {
    console.log('Server ok!')
})