'use server';
import { createAdminClient } from "../appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {
  try {
  } catch (error) {
    console.error('Error', error);
  }
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName = '', lastName = '' } = userData;

  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT || !process.env.NEXT_APPWRITE_KEY) {
    throw new Error('Missing Appwrite environment variables');
  }

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`.trim()
    );

    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
