const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           maxLength: 100
 *         type:
 *           type: string
 *           default: user
 *           enum:
 *             - admin
 *             - user
 *         email:
 *           type: string
 *           format: email
 *           unique: true
 *           required: true
 *         mobile:
 *           type: string
 *           default: null
 *         dob:
 *           type: string
 *           format: date
 *           default: null
 *         gender:
 *           type: string
 *           default: null
 *           enum:
 *             - M
 *             - F
 *             - T
 *         password:
 *           type: string
 *           default: null
 *         voter_id:
 *           type: string
 *           default: null
 
 */

const userSchema = new Schema(
  {
    name: { type: String, maxLength: 100 },
    type: { type: String, default: "user", enum: ["admin", "user"] },
    email: { type: String, lowercase: true, unique: true, required: true },
    mobile: { type: String, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, default: null, enum: ["M", "F", "T"] },
    password: { type: String, default: null },
    voter_id: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.index({ createdAt: 1, email: 1, type: 1 });

const User = mongoose.model("users", userSchema);

module.exports = User;
