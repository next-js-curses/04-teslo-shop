'use server';
 
import { signIn } from '@/auth.config'
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'
    
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignin'
    }
    return 'UnknownError'
  }
}

export async function loginRegistedUser(email: string, password: string) {
  try {

    await signIn('credentials', { email, password, redirect: false });

    return {
      ok: true
    }
    
  } catch (error) {
    let msgError = 'UnknownError'
    if ((error as any).type === 'CredentialsSignin') {
      msgError = 'CredentialsSignin'
    }
    return {
      ok: false,
      message: msgError
    }
  }
}