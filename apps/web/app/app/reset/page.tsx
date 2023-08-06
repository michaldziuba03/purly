import React from 'react';
import { ResetRequestForm } from './reset-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';

const ResetPassword = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email and we will send you instructions on how to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 py-4">
          <ResetRequestForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
