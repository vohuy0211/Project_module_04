import app from './app/app';
import { connectMysql } from './lib/db/mysql.connect';

const port = 8000;
app.listen(port, async () => {
  console.log(`listening on port http://localhost:${port}`);
  try {
    await connectMysql.authenticate();
    console.log('connect mysql successfully');
  } catch (error) {
    console.log('err', error);
  }
});