
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';
export default function AuthLayout({  children , ...props}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <div className="flex h-screen w-full items-center justify-center">

            <div className={cn("flex flex-col gap-6",)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2  bg-green-500">
      {children}
 
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </div>
  );
}