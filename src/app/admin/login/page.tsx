'use client';

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  CardFooter,
  Button,
} from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Architects_Daughter } from 'next/font/google';

const architects_Daughter = Architects_Daughter({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {};
  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl"></div>
      <Card className="shadow-2xl bg-opacity-20 w-[480px]">
        <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
          <div className="flex flex-col gap-1 capitalize text-3xl items-center">
            <Image
              src="/logo.png"
              alt="logo"
              height={80}
              width={80}
              className="cursor-pointer"
            />
            <span className="text-3xl uppercase font-medium text-white">
              <p className={architects_Daughter.className}>
                Admin Login
              </p>
            </span>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col items-center w-full justify-center">
          <div className="flex flex-col gap-2 w-full ">
            <Input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelPlacement="outside"
            />
            <Input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelPlacement="outside"
            />
          </div>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 items-center justify-center">
          <Button
            variant="shadow"
            className="w-full capitalize"
            size="lg"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
