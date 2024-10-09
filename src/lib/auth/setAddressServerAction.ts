"use server";

import { auth } from "@/src/lib/auth/authConfig";
import { pool } from "@/src/lib/postgres";

export const setAddress = async (address: string) => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const uuid: string = session.user.id;

    address = address.trim();

    await pool.query("UPDATE users SET addresse = $1 WHERE id = $2", [address, uuid]);

    return true;
};
