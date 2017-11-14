const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose is going to use bluebird as the third party lib for promises within our application

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db)=>{

	console.log('Connected correctly to server');

	//adding a new document(creating a new dish)
	//this will create and then save
	Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    });

    
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();	//returning all the dishes in the database
    })//if the data is coming from the database then store it in the dishes
    .then((dishes) => {
        console.log(dishes);

        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
});