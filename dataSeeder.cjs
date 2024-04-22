const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URI
const uri = 'mongodb+srv://meenakshi03jha:MjYgjlQHAFc2zAzV@cluster.kxajnlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';


async function seedData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const carsCollection = db.collection('cars');

    
    const dummyData = [];
    for (let i = 0; i < 10; i++) {
      const car = {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past().getFullYear(),
      };
      dummyData.push(car);
    }

    
    await carsCollection.insertMany(dummyData);
    console.log('Dummy data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedData();
