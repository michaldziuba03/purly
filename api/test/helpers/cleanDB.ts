import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export async function cleanDB(app: INestApplication) {
  const connection = app.get<Connection>(getConnectionToken());
  const collections = await connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
}
