require("dotenv").config();
const mongoose = require("mongoose");
const Validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const security = process.env.KEY;
const Cryptr = require("cryptr");
const cryptr = new Cryptr(security);
const jwt = require("jsonwebtoken");
const appRoot = require("app-root-path").path;
const fileUploadAbsolutePath = `${appRoot}/`;

/* utility */
const fileUpload = require("../utility/File");
const commonMethod = require("../utility/common");

/*  models */
const User = require("../models/User");
const OTP = require("../models/OTP");

exports.Registration = async (req, res) => {
  try {
    const userInfo = req.body;
    console.log(userInfo);
    let rules = {
      type: "required",
      name: "required",
      email: "required|email",
      mobile: "required|min:8|max:15",
      dob: "required",
      password: "required",
      gender: "required",
      voterid: "required",
    };

    let validation = new Validator(userInfo, rules);

    const isValid = validation.passes();

    if (!isValid) {
      res.status(400).send({
        isSuccess: false,
        message: validation.errors.errors,
      });
    } else {
      let isMatch = await User.findOne({
        email: userInfo.email,
      });

      if (isMatch !== null) {
        res.status(400).send({
          isSuccess: false,
          message: "Your Email is already registered.",
        });
      } else {
        // Generate hash password
        let hashPassword = null;

        if (userInfo.password) {
          hashPassword = await bcrypt.hashSync(userInfo.password, 10);
        }

        let dobDate = null;
        if (userInfo.dob) {
          dobDate = moment(userInfo.dob, "DD-MM-YYYY").toDate(); // Assuming dob format is 'DD-MM-YYYY'
        }

        // Convert dobDate to IST
        let dobIST = null;
        if (dobDate) {
          dobIST = moment.tz(dobDate, "Asia/Kolkata");
        }

        const data = {
          type: userInfo.type,
          name: userInfo.name ? userInfo.name : null,
          email: userInfo.email,
          mobile: userInfo.mobile ? userInfo.mobile : null,
          dob: dobIST ? dobIST : null,
          gender: userInfo.gender,
          password: hashPassword,
        };

        const userInsertResponse = await User.create(data);

        if (userInsertResponse) {
          res.status(200).send({
            isSuccess: true,
            message: "User registered successfully.",
            data: userInsertResponse,
          });
        } else {
          res.status(500).send({
            isSuccess: false,
            message: "Failed to register user.",
            data: "",
          });
        }
      }
    }
  } catch (err) {
    res.status(500).send({
      isSuccess: false,
      message: "Internal server error.",
      data: "",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const rules = {
      email: "required|email",
      type: "required",
      password: "required",
    };
    const validation = new Validator(userInfo, rules);

    if (validation.fails()) {
      return res.status(400).json({
        isSuccess: false,
        message: validation.errors.all(),
      });
    }

    const isMatch = await User.findOne({
      email: userInfo.email,
      type: userInfo.type,
    });

    if (!isMatch) {
      return res.status(200).json({
        isSuccess: false,
        message: "User not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      userInfo.password,
      isMatch.password
    );

    if (!isPasswordMatch) {
      return res.status(200).json({
        isSuccess: false,
        message: "Incorrect password.",
      });
    }

    const payload = {
      id: isMatch._id,
      email: isMatch.email,
    };

    const generateToken = jwt.sign(payload, security, {
      expiresIn: "30d",
    });

    if (!generateToken) {
      return res.status(500).json({
        isSuccess: false,
        message: "Failed to generate token.",
      });
    }

    let status = "offline";
    if (isMatch.type === "doctor") {
      status = "offline";
    } else {
      status = "online";
    }

    await User.findByIdAndUpdate(
      { _id: isMatch._id },
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );
    // Remove the password field from the isMatch object
    const { password, ...userDetails } = isMatch.toObject();
    res.status(200).json({
      isSuccess: true,
      token: "Bearer " + generateToken,
      userDetails: userDetails,
      message: "You have logged in successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      isSuccess: false,
      message: "An error occurred.",
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const rules = {
      email: "required|email",
    };
    const validation = new Validator(userInfo, rules);

    if (validation.fails()) {
      return res.status(400).json({
        isSuccess: false,
        message: validation.errors.all(),
      });
    }

    const email = req.body.email;
    const userDetail = await User.findOne({ email: email });
    if (!userDetail) {
      return res.status(404).json({
        isSuccess: false,
        message: "No user found or account not activated",
      });
    }

    const userId = cryptr.encrypt(userDetail._id);
    const otp = await commonMethod.genOTP();
    var html = await fileUpload.getFileContent(
      fileUploadAbsolutePath + "/public/email/forgotPassword.html"
    );
    html = html.replace(
      /{linkHref}/g,
      `${
        process.env.HOST
      }user/reset-password-link-check?otp=${otp}${"&userId="}${userId}`
    );

    const mailSent = await commonMethod.mail(
      userDetail.email,
      "OPS set password Link",
      html
    );
    const seveOtp = await OTP.create({
      user_id: userDetail._id,
      otp: otp,
      usedFor: "forgot password",
      status: 1,
    });
    // Activity Log
    res.status(200).json({
      isSuccess: true,
      message:
        "Link sent successfully to email. Please click on the link to reset your password.",
      userId: userDetail._id,
    });
  } catch (err) {
    res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const otp = req.query.otp;
    const userIdenc = req.query.userId;
    if (!otp || !userIdenc) {
      return res.status(400).json({
        isSuccess: false,
        message: "Please provide otp and user id",
        data: "",
      });
    }

    const userId = cryptr.decrypt(userIdenc);
    const otpVerify = await OTP.findOne({
      user_id: userId,
      otp: otp,
    });
    if (!otpVerify) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not verified",
        data: "",
      });
    }

    if (otpVerify.status === 2) {
      const userInfo = await User.findOne({ _id: userId });
      if (!userInfo) {
        return res.status(404).json({
          isSuccess: false,
          message: "User record not found",
          data: "",
        });
      }

      return res.redirect(
        301,
        process.env.FRONTENDURL + "confirm-password/" + userId
      );
    }

    const updateOtpStatus = await OTP.updateOne(
      { otp: otp },
      { $set: { status: 2 } }
    );

    return res.redirect(
      301,
      process.env.FRONTENDURL + "confirm-password/" + userIdenc
    );
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    if (!userId || !newPassword || !oldPassword) {
      return res.status(400).json({
        isSuccess: false,
        message: "Please provide user id and new & old password",
      });
    }

    const userDetail = await User.findOne({ _id: userId });

    if (!userDetail) {
      return res.status(404).json({
        isSuccess: false,
        message: "No user found",
        data: {},
      });
    }

    const isOldPassword = await bcrypt.compare(
      oldPassword,
      userDetail.password
    );

    if (!isOldPassword) {
      return res.status(401).json({
        isSuccess: false,
        message: "Old password is wrong",
      });
    }

    const hashPassword = await bcrypt.hashSync(newPassword, 10);
    const updateResponse = await User.updateOne(
      { _id: userId },
      { $set: { password: hashPassword } }
    );

    if (updateResponse) {
      return res.status(200).json({
        isSuccess: true,
        message: "Password updated successfully",
      });
    } else {
      return res.status(500).json({
        isSuccess: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.createPassword = async (req, res, next) => {
  try {
    const userIdenc = req.body.userId;
    const newPassword = req.body.password;

    if (!userIdenc || !newPassword) {
      return res.status(400).json({
        isSuccess: false,
        message: "Please provide user id and password",
      });
    }

    const userDetail = await User.findOne({
      _id: new mongoose.Types.ObjectId(userIdenc),
    });

    if (!userDetail) {
      return res.status(404).json({
        isSuccess: false,
        message: "No user found",
        data: {},
      });
    }

    const hashPassword = await bcrypt.hashSync(newPassword, 10);
    const updateResponse = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userIdenc) },
      { $set: { password: hashPassword } }
    );

    if (updateResponse) {
      return res.status(200).json({
        isSuccess: true,
        message: "Password updated successfully",
        userType: userDetail.type,
      });
    } else {
      return res.status(500).json({
        isSuccess: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.isEmail = async (req, res, next) => {
  try {
    //console.log("email");
    const userInfo = req.body;
    const email = req.body.email;
    let rules = {
      email: "required|email",
    };
    let validation = new Validator(userInfo, rules);

    const isValid = validation.passes();
    if (!isValid) {
      res.send({
        isSuccess: false,
        message: validation.errors.errors,
      });
    } else {
      let isMatch = await User.findOne({
        email: email,
      });

      if (isMatch) {
        res.send({
          isSuccess: true,
          message: "Your Email address already exists!!",
        });
      } else {
        res.send({
          isSuccess: false,
          message: "Your Email address not exists.",
        });
      }
    }
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    var decoded = await commonMethod.userTokenValidate(token);
    if ("isSuccess" in decoded) {
      res.send(decoded);
      return;
    }
    const user_id = decoded.id;

    const userOTPupdate = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(user_id) },
      {
        $set: {
          status: "offline",
          assign_doctor: false,
          otp_time: "",
          login_attempts: 0,
          token: null,
        },
      }
    );
    if (userOTPupdate) {
      res.send({
        isSuccess: true,
        message: "You have logout Successfully",
      });
    } else {
      res.send({
        isSuccess: false,
        message: "You have not logout Successfully",
      });
    }
  } catch (err) {
    res.send({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.Getuser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    var decoded = await commonMethod.userTokenValidate(token);
    if ("isSuccess" in decoded) {
      res.send(decoded);
      return;
    }
    const user_id = decoded.id;

    let isMatch = await User.findOne({
      _id: new mongoose.Types.ObjectId(user_id),
    });

    if (isMatch) {
      return res.send({
        isSuccess: true,
        message: "User info found Successfully!!",
        data: isMatch,
      });
    } else {
      return res.send({
        isSuccess: false,
        message: "User info not found!!",
      });
    }
  } catch (err) {
    return res.send({
      isSuccess: false,
      message: err,
    });
  }
};
