import { Schema, Query } from "mongoose";
import { injectable } from "inversify";

//@injectable()
class MongooseDefaultHook {
  static applyDefaultConditions(this: Query<any, any>) {
    if (!this.getOptions().noDefaultConditions) {
      this.where({ is_active: true, is_deleted: false });
    }
  }

  static preventIdUpdate(this: Query<any, any>) {
    const update = this.getUpdate();

    if (update && !(update instanceof Array)) {
      if (update.$set && update.$set._id) {
        delete update.$set._id;
      }
      if (update._id) {
        delete update._id;
      }
    }
  }

  static setupDefaultHooks(schema: Schema) {
    schema.pre("find", MongooseDefaultHook.applyDefaultConditions);
    schema.pre("findOne", MongooseDefaultHook.applyDefaultConditions);
    schema.pre("findOneAndUpdate", function () {
      MongooseDefaultHook.applyDefaultConditions.call(this);
      MongooseDefaultHook.preventIdUpdate.call(this);
    });
  }
}
export default MongooseDefaultHook;
