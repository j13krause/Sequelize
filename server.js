import express from 'express';
import db from './database/initializeDB.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

const port = process.env.port || 3000;
const newFolder = 'public';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(newFolder));

app.use('/api', apiRoutes);

async function startServer() {
  try {
    const mysql = await db.sequelizeDB;
    await mysql.sync();
    app.listen(port, () => {
      console.log(`Listening on: http//localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
