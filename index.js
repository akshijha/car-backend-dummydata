import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'; 
import { registerUser, loginUser, verifyToken, protectedRoute } from './auth.js';
import otherRoutes from './routes/index.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());



const uri = 'mongodb+srv://meenakshi03jha:MjYgjlQHAFc2zAzV@cluster.kxajnlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
   try {
      await client.connect();
       console.log('Connected to MongoDB');
   } catch (err) {
        console.error(err);
        throw err; 
   }
}

connectDB();
app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);
app.get('/auth/protected', verifyToken, protectedRoute);



app.use('/api/v1', routes);

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
