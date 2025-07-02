import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../libs/firebaseConfig'
import useStore from '../store';
import { useAuthState } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'
import api from '../libs/apiCall'

const SocialAuth = ({ isLoading, setLoading }) => {
  const [selectedProvider, setSelectedProvider] = useState("google")
  const { setCredentails } = useStore((state) => state)
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setSelectedProvider("google")
    
    try {
      const res = await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  }

  useEffect(() => {
    const saveUserToDb = async () => {
      try {
        const userData = {
          name: user.displayName,
          email: user.email,
          provider: selectedProvider,
          uid: user.uid,
        };
        
        setLoading(true);
        const { data: res } = await api.post('/auth/signIn', userData);
        console.log(res);
        
        if (res?.user) {
          toast.success(res?.message)
          const userInfo = {
            ...res?.user,
            token: res?.token,
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
          setCredentails(userInfo);
          
          setTimeout(() => {
            navigate('/overview')
          }, 1500);
        }
      } catch (error) {
        console.error("Something went wrong ", error);
        toast.error(error?.response?.data?.message || error?.message)
      } finally {
        setLoading(false)
      }
    };
    
    if (user) {
      saveUserToDb()
    }
  }, [user?.uid])
  
  return (
    <div className='flex items-center gap-2 justify-center'>
      <Button
        onClick={signInWithGoogle}
        disabled={isLoading}
        variant="outline"
        className='w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400'>
        <FcGoogle size={20} /> Continue with Google
      </Button>
    </div>
  )
}

export default SocialAuth