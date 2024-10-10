"use client";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const updateUserInfo = async ({
  name,
  surname,
  dob,
  address,
  phone,
}) => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Sanitize and validate the input
  const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof userId !== "string" || !uuidRegExp.test(userId)) {
    throw new Error("Invalid UUID");
  }

  // Trim input data to remove accidental spaces
  name = name?.trim();
  surname = surname?.trim();
  address = address?.trim();
  phone = phone?.trim();
  dob = dob ? new Date(dob) : null; // Handle the date conversion

  // Update the user's information in the database
  try {
    await pool.query(
      `UPDATE users 
       SET name = $1, surname = $2, dob = $3, address = $4, phone = $5 
       WHERE id = $6`,
      [name, surname, dob, address, phone, userId]
    );

    return true;
  } catch (error) {
    console.error("Database update error:", error);
    throw new Error("Failed to update user information.");
  }
};
