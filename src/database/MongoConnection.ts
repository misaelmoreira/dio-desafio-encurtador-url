import mongoose, { ConnectOptions } from 'mongoose';
import { config } from "../config/constants";

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
            
            console.log('Database connected');

        } catch (err) {
            console.error()
            process.exit(1);
        }
    }
}