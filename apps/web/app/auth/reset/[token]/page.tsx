import { ChangePasswordForm } from './change-password-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/card';

const ChangePasswordPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Change password</CardTitle>
        </CardHeader>
        <CardContent className="flex max-w-md flex-col gap-3 py-4">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
