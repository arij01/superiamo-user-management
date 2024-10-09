"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const setDob = async (dob: string) => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid: string = session.user.id;

  // Validate the date of birth format (ISO format YYYY-MM-DD)
  const dateRegExp: RegExp = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof dob !== "string" || !dateRegExp.test(dob)) {
    throw new Error("Invalid Date of Birth format. Use YYYY-MM-DD.");
  }

  // Update the user's date of birth in the database
  await pool.query("UPDATE users SET dob = $1 WHERE id = $2", [dob, uuid]);

  return true;
};
