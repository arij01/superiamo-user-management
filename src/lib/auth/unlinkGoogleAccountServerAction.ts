"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

// Deletes the user's Google account record from the database
export const unlinkGoogleAccount = async () => {
  
  const session = await auth();
  if (!session) {
    throw new Error("Non autorisé");
  }

  const uuid: string = session.user.id;

  // Sanitize input
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("UUID invalide");
  }

  // Remove the Google account from the database
  try {
    await pool.query(
      "DELETE FROM accounts WHERE provider = 'google' AND \"userId\" = $1",
      [uuid]
    );
    return true;
  } catch (error) {
    console.error("Échec de la dissociation du compte Google:", error);
  }
};