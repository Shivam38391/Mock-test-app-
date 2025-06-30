"use client";

import { Button } from '@/components/ui/button';
import React from 'react'

import { useGoogleLogin } from "@react-oauth/google"
import axios from 'axios';


const GoogleLogin = () => {

          
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);

    console.log("Button clicled")

    const data = {
      grant_type: 'convert_token',
      client_id: 'FEtBSZFR8vDfPGWqgJeKyqjxQ8gaH4mzVH0nuuX6',
      backend: 'google-oauth2',
      token: tokenResponse.access_token,
    };

    const SignINwithaccesToken = await axios.post('https://dashboard.render.com/auth/convert-token', data);


    console.log("SignINwithaccesToken  info",SignINwithaccesToken);

    if(SignINwithaccesToken?.status === 200){

      alert(` Login succes ${JSON.stringify(SignINwithaccesToken.data)}`);
    }else{

      alert(`error ${SignINwithaccesToken.statusText}` )

    }




  },
  onError: errorResponse => console.log(errorResponse),
});




  return (
    <>
                         <Button 
                
                onClick={() => googleLogin()}

                variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>


    </>
  )
}

export default GoogleLogin