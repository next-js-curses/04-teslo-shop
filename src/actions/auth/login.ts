'use server';
 
import { signIn } from '@/auth.config'
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(Object.fromEntries(formData))
    await signIn('credentials', formData);
  } catch (error) {
    return 'CredentialsSignin'
  }
}