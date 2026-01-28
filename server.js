const app = require('./app');
const connectDB = require('./config/db');

// start db
connectDB();

app.listen(3000, () => {
  console.log('server running on localhost:3000');
});
