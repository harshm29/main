const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user associated with the OTP.
 *         otp:
 *           type: integer
 *           description: The OTP value.
 *         usedFor:
 *           type: string
 *           description: The purpose for which the OTP is used.
 *         status:
 *           type: integer
 *           description: The status of the OTP (1 for verified, 2 for unverified).
 *           default: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the OTP was created.
 *           default: "current date and time"
 */

const otpSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    otp: { type: Number, required: true },
    usedFor: { type: String, required: true },
    status: { type: Number, default: 1 }, // 1- verified, 2-unverified
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const OTP = mongoose.model("otp", otpSchema);

module.exports = OTP;
