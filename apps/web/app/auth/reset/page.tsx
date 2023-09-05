import React from 'react';
import { ResetRequestForm } from './reset-form';
import { Card } from '../../../components/card';

const ResetPassword = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="flex max-w-md flex-col gap-3 p-9 shadow-lg">
        <ResetRequestForm />
      </Card>
    </div>
  );
};

export default ResetPassword;
