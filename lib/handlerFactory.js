import {
  insertOneInCollection,
  existsInCollection,
  getOneInCollection,
  getAllInCollection,
  deleteOneInCollection,
  updateOneInCollection,
} from "./db";
import { ObjectID } from "mongodb";

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

export async function createOne(
  req,
  res,
  collection,
  bodyFilterArray,
  existFilterFor
) {
  const filteredBody = filterBody(req.body, bodyFilterArray);
  if (filteredBody) {
    try {
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

      const data = await insertOneInCollection(collection, filteredBody);

      res.status(200).json({
        message: "Item inserted",
        data: data.ops,
      });
    } catch (err) {
      res.status(500).json({
        message: "Unable to connect to database. Please try again later.",
      });
    }
  } else {
    res.status(422).json({ message: "Invalid body sent" });
  }
}

export async function updateByBody(
  req,
  res,
  collection,
  bodyFilterArray,
  updateFilter
) {
  const filteredBody = filterBody(req.body, bodyFilterArray);
  if (filteredBody) {
    updateFilter = objectIdForFilter(updateFilter);
    try {
      const { value } = await updateOneInCollection(
        collection,
        updateFilter,
        filteredBody
      );

      if (!value) {
        res.status(422).json({
          message: "Could not find in collection based on filter",
        });
        return;
      }
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
