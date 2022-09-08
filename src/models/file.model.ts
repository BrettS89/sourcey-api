// storage/file-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'storage/file';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    meta: {
      id: {
        type: String,
        required: true,
      },
      extension: {
        type: String,
        required: true,
      },
      filepath: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
      },
    },
    urls: {
      delivery: {
        type: String,
        required: true,
      },
      storage: {
        type: String,
        required: true,
      }
    },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
