"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const getUserInfo = async () => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Non autorisé");
  }

  const uuid: string = session.user.id;

  // Query to fetch user information
  const result = await pool.query(
    "SELECT name, role, surname, dob, addresse, phone FROM users WHERE id = $1",
    [uuid]
  );

  // Check if user exists
  if (result.rows.length === 0) {
    throw new Error("Utilisateur non trouvé");
  }

 
  return result.rows[0];
};
