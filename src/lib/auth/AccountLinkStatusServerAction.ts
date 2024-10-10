"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const getAccountLinkStatus = async () => {
  
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid: string = session.user?.id;

  
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("UUID invalide");
  }

  
  try {
    const result = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM accounts WHERE provider = 'google' AND \"userId\" = $1)",
      [uuid]
    );

    if (!result.rows[0].exists) {
      return false;
    }
  } catch (error) {
    console.error("Échec de la vérification de la liaison du compte Google de l'utilisateur :", error);
  }

  return true;
};