'use server';
import { createSessionClient, createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { stringify } from "querystring";
import { parseStringify } from "../utils";



export const signIn = async ({email, password}: signInProps) => {
    try{
        const { account } = await createAdminClient();
        const response = await createEmailPasswordSession(email, password);

        return parseStringify(response);
    } catch(error) {
        console.error('Error', error);
    }

}

export const signUp = async (userData: SignUpParams) => {
    
    const {email, password, firstName, lastName} = userData;

    if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT || !process.env.NEXT_APPWRITE_KEY) {
        throw new Error('Missing Appwrite environment variables');
    }

    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession({
            email,
            password
        });

        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        return parseStringify(newUserAccount);
    } catch(error) {
        console.error('Error', error);
        throw error;
    }
}

// src/app/page.jsx
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user)
  } catch (error) {
    return null;
  }
}

async function createEmailPasswordSession(email: string, password: string) {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        const cookieStore = await cookies();
        cookieStore.set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return parseStringify(session);
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        const cookieStore = await cookies();

        cookieStore.delete('appwrite-session');
        await account.deleteSession('current');

        return true;
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}