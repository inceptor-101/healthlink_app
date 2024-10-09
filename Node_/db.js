const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/new'; // Connection string
const dbName = 'new'; // Database name

async function connectToDb() {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(dbName);
    console.log('Connected to MongoDB database:', dbName);
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; // Re-throw the error to signal connection failure
  }
}

module.exports = { connectToDb };
