import mongoose from "mongoose";
let connection = {};

async function connectDb() {
  if (connection.isConnected) {
    //???
    // Use existing database connection
    console.log("Using existing connection");
    return;
  }

  const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );

  // Use new database connection
  const db = await mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  console.log("DB Connected");
  connection.isConnected = db.connections[0].readyState; //???
}

export default connectDb;
