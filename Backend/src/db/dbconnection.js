import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME,});
        console.log(`\n MongoDB connected !! DB HOST: ${connection.connection.host}`);
    } catch (error) {
        console.log('Get Error while connecting to Database:', error);
        process.exit(1);
    }
};
``
export default connectDB;
