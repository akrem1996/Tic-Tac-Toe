import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';


declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
  
}

// Um diese Datei als Modul zu behandeln, exportiere etwas
export {};