"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const setSurname = async (surname: string) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const uuid: string = session.user.id;

    surname = surname.trim();

    await pool.query("UPDATE users SET surname = $1 WHERE id = $2", [surname, uuid]);

    return true;
};
