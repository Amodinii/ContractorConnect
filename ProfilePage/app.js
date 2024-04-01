const express = require('express');
const mongodb = require('mongodb');
const app = express();

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'your_database_name';

// Connect to MongoDB
mongodb.MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('MongoDB connected');

  const db = client.db(dbName);

  // Setting the view engine to EJS
  app.set('view engine', 'ejs');

  // Displaying the profile page
  app.get('/', (req, res) => {
    // Fetching data from MongoDB
    db.collection('profile_data').find({}).toArray((err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Rendering the profile page with the fetched data
      res.render('profile', { data });
    });
  });

  // Starting the server
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
});
