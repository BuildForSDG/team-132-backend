import app from '../app';
import dbConnect from './dbConfig';

// START THE SERVER
const startServer = () => {
  dbConnect();
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
};

export default startServer;
