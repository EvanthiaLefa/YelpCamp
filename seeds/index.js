const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for( let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'636cd75a521c5007df0c093e',
            location: `${cities[random1000].city}, ${cities[random1000].state}` ,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, molestias exercitationem. Voluptas, dolore. Delectus sit est reprehenderit cum veritatis vitae, inventore optio. Odio quam fugit  distinctio deserunt commodi earum minima.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                url: 'https://res.cloudinary.com/dvxblubfq/image/upload/v1669064098/YelpCamp/wu8m3vobcchptgdeopu5.jpg',
                filename: 'YelpCamp/wu8m3vobcchptgdeopu5'
                },
                {
                    url: 'https://res.cloudinary.com/dvxblubfq/image/upload/v1669059873/uea3jydwgkvtwp4blvgh.jpg',
                    filename: 'YelpCamp/uea3jydwgkvtwp4blvgh'
                    }
            ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})