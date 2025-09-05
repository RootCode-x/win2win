"use server";

import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { User } from "@/lib/model/user";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    //revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    //revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { user_id, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      user_id,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { regtype } = Object.fromEntries(formData);
  console.log(Object.fromEntries(formData));

  if (regtype == "byself") {
    const {
      email,
      regtype,
      password,
      passwordRepeat,
      mobile,
      country,
      currency_name,
      full_name,
      sponsor,
      agentid,
    } = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }

    try {
      connectToDb();
      if (
        !regtype ||
        !password ||
        !passwordRepeat ||
        !mobile ||
        !country ||
        !currency_name ||
        !full_name ||
        !agentid
      ) {
        return { error: "All fields are required" };
      }

      const existingUser_id = await User.findOne({ user_id: full_name });
      if (existingUser_id) {
        return { error: "A user has already registered with this USER ID" };
      }

      if (email) {
        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
          return {
            error: "A user has already registered with this Email address",
          };
        }
      }

      if (sponsor) {
        if (sponsor === full_name) {
          return { error: "USER ID and Refer id can not be same..." };
        }
        const existingSponsor = await User.findOne({ user_id: sponsor });
        if (!existingSponsor) {
          return { error: "Refer ID is invalid" };
        }
      }

      const validMobilePattern = /^(013|014|015|016|017|018|019)\d{8}$/;
      if (!validMobilePattern.test(mobile)) {
        return { error: "Invalid mobile number" };
      }

      const existingUserMobile = await User.findOne({ mobile });
      if (existingUserMobile) {
        return { error: "A user has already registered with this Mobile No" };
      }

      let finalAgentId = agentid;
      const existingAgent = await User.findOne({
        user_id: agentid,
        role_as: 4,
      });
      if (!existingAgent) {
        finalAgentId = "MA1212";
      }

      // Generate a unique user ID
      const lastUser = await User.findOne({ role_as: 3 }).sort({ _id: -1 });
      let newUserId;
      if (lastUser) {
        const lastId = parseInt(lastUser.user_id.slice(1));
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        newUserId = "U" + (lastId + randomNumber);
      } else {
        newUserId = "U100"; // If no previous user found, start with U100
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        handle: newUserId,
        email,
        user_id: full_name,
        agent_id: finalAgentId,
        refferer: sponsor,
        password: hashedPassword,
        tpin: hashedPassword, // Is this intended?
        role_as: 3,
        mobile,
        country,
        first_name: full_name,
        last_name: full_name,
        currency: 0,
        exposure: 0,
        ref_percentage: 0,
        account_status: 1,
      });

      // Save the user to the database
      await newUser.save();

      await User.updateMany(
        {
          $or: [{ exposure: { $exists: false } }, { exposure: 0 }],
        },
        {
          $set: { exposure: 0 },
        }
      );

      const responseData = {
        userid: full_name,
        password: password,
        regtype: regtype,
      };

      return {
        success: true,
        message: "User registered successfully",
        responseData,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: "Something went wrong!" };
    }
  }

  if (regtype == "onclick") {
    try {
      connectToDb();

      const { country, currency_name, regtype } = Object.fromEntries(formData);

      const last_user = await User.findOne({ role_as: 3 }).sort({ _id: -1 });
      let new_user_id;
      if (last_user) {
        const lastId = last_user.user_id;
        const newStr = lastId.replace(/^./, "");

        const newRandomNumber = () => {
          const min = 100; // Minimum 3-digit number
          const max = 999; // Maximum 3-digit number
          const randomNumber = Math.floor(
            Math.random() * (max - min + 1) + min
          );
          return randomNumber;
        };
        const latestId = Number(newStr);
        const Randomuser_id = Number(newRandomNumber());
        const IdAdd = latestId + Randomuser_id;
        new_user_id = "U" + IdAdd;
      } else {
        const newStr = 1;
        const newRandomNumber = () => {
          const min = 100; // Minimum 3-digit number
          const max = 999; // Maximum 3-digit number
          const randomNumber = Math.floor(
            Math.random() * (max - min + 1) + min
          );
          return randomNumber;
        };

        const latestId = Number(newStr);
        const Randomuser_id = Number(newRandomNumber());
        const IdAdd = latestId + Randomuser_id;
        new_user_id = "U" + IdAdd;
      }

      const generated_password =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        generated_password.toString(),
        salt
      ); // Convert to string before hashing

      const newUser = new User({
        handle: new_user_id,
        user_id: new_user_id,
        password: hashedPassword,
        tpin: hashedPassword,
        country: country,
        curr_sign: currency_name,
        role_as: 3,
        currency: 0,
        exposure: 0,
        account_status: 1,
      });
      //   console.log('user detials', newUser);
      await newUser.save();
      //     await newUser.save().catch(err => console.error(err));

      await User.updateMany(
        {
          $or: [{ exposure: { $exists: false } }, { exposure: 0 }],
        },
        {
          $set: { exposure: 0 },
        }
      );

      const responseData = {
        userid: new_user_id,
        password: generated_password,
        regtype: regtype,
      };

      return {
        success: true,
        message: "User registered successfully",
        responseData,
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: "Something went wrong!" };
    }
  }
};

export const login = async (prevState, formData) => {
  const { user_id, password } = Object.fromEntries(formData);

  connectToDb();

  let user = await User.findOne({ user_id: user_id }); // Search by user_id

  // If not found by user_id, search by mobile
  if (!user) {
    user = await User.findOne({ mobile: user_id }); // Search by mobile
  }

  if (!user) return { error: "User does not exist!" };
  if (user.account_status == 2)
    return { error: "You have been blocked. Please contact with us." };
  if (user.role_as != 3) return { error: "You are not an user." };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) return { error: "Password does not match!" };

  try {
    await signIn("credentials", { user_id, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid user_id or password" };
    }
    throw err;
  }
};

export const profileUpdate = async (previousState, formData) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      mobile,
      address,
      country,
      country_currency,
      city,
      user_id,
    } = Object.fromEntries(formData);

    connectToDb();

    if (
      !first_name ||
      !last_name ||
      !dob ||
      !mobile ||
      !address ||
      !country ||
      !country_currency ||
      !city
    ) {
      return { error: "... All fields are required" };
    }

    const existingUser = await User.findOne({ user_id });

    if (!existingUser) {
      return { error: "User not found" };
    }
    // Check if the mobile number is already registered by another user
    const userWithSameMobile = await User.findOne({ mobile });
    if (userWithSameMobile && userWithSameMobile.user_id !== user_id) {
      return { error: "A user has already registered with this Mobile No" };
    }

    // Update user information
    existingUser.first_name = first_name;
    existingUser.last_name = last_name;
    existingUser.dob = dob;
    existingUser.mobile = mobile;
    existingUser.address = address;
    existingUser.country = country;
    existingUser.country_currency = country_currency;
    existingUser.city = city;

    // Save the updated user information
    await existingUser.save();
    return { success: true, message: "User information updated successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Something went wrong!" };
  }
};

export const passwordUpdate = async (previousState, formData) => {
  try {
    const { oldPassword, newPassword, user_id } = Object.fromEntries(formData);
    connectToDb();
    if (!oldPassword || !newPassword) {
      return { error: "... All fields are required" };
    }

    const existingUser = await User.findOne({ user_id });

    if (!existingUser) {
      return { error: "User not found" };
    }

    const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isMatch) {
      return { error: "Incorrect old password" };
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    existingUser.password = hashedNewPassword;

    // Save the updated user information
    await existingUser.save();

    return { success: true, message: "User password updated successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Something went wrong!" };
  }
};

export const tppasswordUpdate = async (previousState, formData) => {
  try {
    const { oldPassword, newPassword, user_id } = Object.fromEntries(formData);
    connectToDb();
    if (!oldPassword || !newPassword) {
      return { error: "... All fields are required" };
    }
    const existingUser = await User.findOne({ user_id });
    if (!existingUser) {
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(oldPassword, existingUser.tpin);
    if (!isMatch) {
      return { error: "Incorrect old password" };
    }
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    // Update the user's password
    existingUser.tpin = hashedNewPassword;
    // Save the updated user information
    await existingUser.save();
    return {
      success: true,
      message: "User transaction password updated successfully",
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Something went wrong!" };
  }
};
