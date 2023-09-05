import { Card, CardContent } from '../../../components/card';
import { Button } from '../../../components/button';
import { GitHub, Google } from '../../../components/icons';
import { RegisterForm } from './register-form';

const RegisterPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="shadow-lg py-4">
        <CardContent className="flex max-w-md flex-col gap-3 p-9">
          <Button variant="outline" className="w-full">
            <Google className="mr-2 w-5 h-5" /> Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <GitHub className="mr-2 w-5 h-5" /> Continue with GitHub
          </Button>

          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-4 bg-gray-300 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              OR
            </span>
          </div>

          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
