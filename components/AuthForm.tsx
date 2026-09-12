'use client';
import Link from 'next/link'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from '@/lib/utils';
import CustomInput from './CustomInput';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import link from 'next/link';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: {type:string}) => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      dateOfBirth: '',
      ssn: '',
      email: '',
      password: ''
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    setIsLoading(true);
    try {
        // sign up with Appwrite
        if(type === 'sign-up') {
          await signUp(data);
          setUser(true);
        } 
        if(type === 'sign-in') {
            const response = await signIn({
            email: data.email,
            password: data.password,
            })
           if (response) router.push('/') // On pousse vers la page d'acceuil
        }
    } catch(error)  {
      console.log(error);
    } finally {

      setIsLoading(false);
    }
  
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
                        
          />
          <h1 className="text-26 font-ibm-plex-serif  font-bold text-black-1">Horizon</h1>
        </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              
              {user
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className="text-16 font-normal text-gray-600">
                {user
                  ? 'Link your account to get started'
                  : 'Please enter your details'

                }
              </p>
            </h1>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-6">

          <Button className="form-btn" type="button" onClick={() => router.push('/')}>
            Continue
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          {type === 'sign-up' && (
            <>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control} name='firstName' 
                  placeholder='Enter your first name' 
                  label= 'First Name'/>

                <CustomInput
                  control={form.control} name='lastName' 
                  placeholder='Enter your last name' 
                  label= 'Last Name'/>
              </div>
              <CustomInput
                control={form.control} name='address1' 
                placeholder='Enter your specific addresse' 
                label= 'Addresse'/>
              <CustomInput
                control={form.control} name='city' 
                placeholder='Enter your city' 
                label= 'City'/>

              <div className="flex gap-4">
                <CustomInput
                  control={form.control} name='state' 
                  placeholder='Ex: Senegal' 
                  label= 'State'/>

                <CustomInput
                  control={form.control} name='postalCode' 
                  placeholder='Ex: 1234' 
                  label= 'Postal Code'/>
              </div>

              <div className="flex gap-4">
                <CustomInput
                  control={form.control} name='dateOfBirth' 
                  placeholder='YYYY-mm-dd' 
                  label= 'Date of Birth'/>

                <CustomInput
                  control={form.control} name='ssn' 
                  placeholder='ex: 1234' 
                  label= 'SSN'/>
              </div>
            </>
          )}
          <CustomInput
            control={form.control} name='email' 
            placeholder='Enter your email' 
            label= 'Email'/>


          <CustomInput
            control={form.control} name='password' 
            placeholder='Enter your password' 
            label= 'Password'/> 

          <div className="flex flex-col gap-4"> 
              <Button className="form-btn " type="submit" disabled = {isLoading}>
                { isLoading ? (
                  <>
                    <Loader2 size={20}
                    className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ): type === 'sign-in' ? 'Sign In' : 'Sign Up'}
              </Button>
          </div>

          </form>
        </Form>
      )}
      {!user && <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === 'sign-in'
            ? "Dont have a account?"
            : "Already have a account?"
          }
        </p>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                  {type === 'sign-in' ? '/Sign up' : '/Sign in'}  
        </Link>

      </footer>}
    </section>
  )
}
export default AuthForm