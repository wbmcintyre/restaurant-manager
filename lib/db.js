import { MongoClient } from "mongodb";
import assert from "assert";

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      process.env.DATABASE_URL.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
      ),
      { useUnifiedTopology: true }
    );

    return client;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function insertOneInCollection(collection, body) {
  const client = await connectToDatabase();
  const database = client.db();
  const value = await database.collection(collection).insertOne(body);

  client.close();

  return value;
}

export async function existsInCollection(collection, filter) {
  const client = await connectToDatabase();
  const database = client.db();
  const existingItem = await database.collection(collection).findOne(filter);
  client.close();
  if (existingItem) {
    return true;
  }
  return false;
}

export async function getOneInCollection(collection, filter) {
  const client = await connectToDatabase();
  const database = client.db();
  const value = await database.collection(collection).findOne(filter);

  client.close();
  return value;
}

export async function getAllInCollection(collection, filterFor) {
  const client = await connectToDatabase();
  const database = client.db();
  const values = await database
    .collection(collection)
    .find({})
    .project(filterFor)
    .toArray();
  return values;
}

export async function getAllInCollectionGroupBy(collection, groupBy) {
  const client = await connectToDatabase();
  const database = client.db();
  const values = database[collection].aggregate([{ $group: groupBy }]);
  return values;
}

export async function deleteOneInCollection(collection, filter) {
  if (filter && filter !== {}) {
    try {
      const client = await connectToDatabase();
      const database = client.db();
      await database.collection(collection).findOneAndDelete(filter);
      client.close();
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}

export async function updateOneInCollection(collection, filter, body) {
  const client = await connectToDatabase();
  const database = client.db();
  const value = await database
    .collection(collection)
    .findOneAndUpdate(filter, { $set: body });
  client.close();
  return value;
}
