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
        name: 'Uthappizza1',
        description: 'test'
    })

    
    .then((dish) => {	//think like, you have created the dish and now if everything goes perfect
    	//its going to be saved in the dish
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {	//this dish._id is of the same dish that we just inserted
        	$set: { description: 'Updated test'},
        },{	
        	new : true  //used because once the dish is updated, it will return the updated dish to us
        })
        .exec();	//returning a particular dish from the database
    })//if the data is coming from the database then store it in the dish
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });	//comment is the field inside the dish

        return dish.save();
    })
    .then((dish) => {
    	console.log(dish);
        return db.collection('dishes').drop();
    
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });
});