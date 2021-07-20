import {
  insertOneInCollection,
  existsInCollection,
  getOneInCollection,
  getAllInCollection,
  deleteOneInCollection,
  updateOneInCollection,
} from "./db";
import { ObjectID } from "mongodb";
import jimp from "jimp";
import path from "path";
import formidable from "formidable";

//** CRUD operations and responses */

export async function getOne(req, res, collection, filter) {
  try {
    filter = objectIdForFilter(filter);
    const data = await getOneInCollection(collection, filter);
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Invalid id",
    });
  }
}

export async function getOneNoResponse(collection, filter) {
  try {
    const afterFilter = objectIdForFilter(filter);
    const data = await getOneInCollection(collection, afterFilter);
    return data;
  } catch (err) {
    return false;
  }
}

export async function getAll(req, res, collection, filterFor) {
  try {
    const data = await getAllInCollection(collection, filterFor);
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to connect to database. Please try again later.",
    });
  }
}

export async function getAllGroupBy(req, res, collection, groupBy) {
  try {
    const data = await getAllInCollection(collection, groupBy);
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to connect to database. Please try again later.",
    });
  }
}

export async function createOne(
  req,
  res,
  collection,
  bodyFilterArray,
  existFilterFor
) {
  //filter out undesirable values in received request body
  const filteredBody = filterBody(req.body, bodyFilterArray);

  //if desired, don't create duplicates based on filter
  if (existFilterFor) {
    const doesExist = await existsInCollection(collection, {
      [existFilterFor]: filteredBody[existFilterFor],
    });
    if (doesExist) {
      res.status(422).json({
        message: `Cannot have duplicate value for ${existFilterFor}.`,
      });
      return;
    }
  }

  if (Object.keys(filteredBody).length !== 0) {
    const data = await insertOneInCollection(collection, filteredBody);

    //if a file was sent, upload it and add directory to body (cannot add to body prior to creating because filename is based off of id)
    if (req?.file?.path) {
      await updateOneInCollection(
        collection,
        objectIdForFilter({ _id: data.ops[0]._id }),
        {
          image: uploadPhoto(req.file.path, collection, data.ops[0]._id),
        }
      );
    }

    res.status(200).json({
      message: "Item inserted",
      data: data.ops[0],
    });
    return data.ops[0];
  } else {
    res.status(422).json({ message: "Invalid body sent" });
  }
}

export async function updateOne(req, res, id, collection, bodyFilterArray) {
  const updateFilter = objectIdForFilter({
    _id: id,
  });
  if (existsInCollection(collection, updateFilter)) {
    const updateBody = filterBody(req.body, bodyFilterArray);

    //if file exists, upload it and assign field to body
    if (req?.file?.path) {
      updateBody.image = uploadPhoto(req.file.path, collection, id);
    }

    //if the body to be updated isn't empty, update in database
    if (Object.keys(updateBody).length !== 0) {
      try {
        const { value } = await updateOneInCollection(
          collection,
          updateFilter,
          updateBody
        );

        value.password = undefined;
        res.status(200).json({
          data: value,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Unable to connect to database. Please try again later.",
        });
      }
    } else {
      res.status(422).json({ message: "Invalid body sent" });
    }
  } else {
    res.status(422).json({ message: "This user does not exist" });
  }
}

export async function deleteOne(req, res, collection, filter) {
  try {
    filter = objectIdForFilter(filter);
    const existingItem = await existsInCollection(collection, filter);
    if (existingItem) {
      const wasDeleted = await deleteOneInCollection(collection, filter);
      if (!wasDeleted) {
        res.status(500).json({
          message: "Unable to delete item. Try again later.",
        });
        return;
      }
    }

    res.status(200).json({
      message: "The item has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to connect to database. Please try again later.",
    });
  }
}

//** utility functions */

export async function setupFormDataParser(req, callback) {
  const form = formidable.IncomingForm({
    multiples: true,
  });

  await form.parse(req, async (err, fields, files) => {
    if (err) console.log(err);
    req.body = fields;
    if (files.photo) {
      req.file = files.photo;
    }
    await callback();
  });
}

export function uploadPhoto(filepath, collection, id) {
  const filename = `${collection}-${id}.jpg`;
  const updatedImagePath = path.join(".", "img", collection, filename);
  jimp.read(filepath, (err, image) => {
    if (err) throw err;
    image.resize(500, 500).quality(90).write(updatedImagePath);
  });
  const apiImagePath = path.join(
    ".",
    "api",
    "v1",
    "images",
    collection,
    filename
  );
  return apiImagePath;
}

//** filter functions to ensure proper data goes inside of the database */

export function filterBody(body, filterFor) {
  let filteredBody = {};
  for (const [key, value] of Object.entries(body)) {
    if (filterFor.includes(key) && body[key] && body[key].trim() !== "") {
      filteredBody[key] = value;
    }
  }
  return filteredBody;
}

function objectIdForFilter(oldFilter) {
  const filter = { ...oldFilter };
  if (filter._id) {
    filter._id = new ObjectID(filter._id);
  }
  return filter;
}
