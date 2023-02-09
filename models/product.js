const { error } = require('console');
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
);

const getProductFromFile = (callback) => {
   

    fs.readFile(p, (err, fileContent) =>{
        if(err){
           callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }

    });
   
}

module.exports = class Product {

    constructor(titlereceived, imageUrl, description, price){
        this.title = titlereceived;
        this.imageUrl = imageUrl;
        this.description = description,
        this.price = price;
    }

    save(){
        getProductFromFile(products =>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err =>{
                console.log(err);
            });
        });
               
    }

    static fetchAll(callback){
        getProductFromFile(callback);
    }
};
