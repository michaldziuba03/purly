import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';
import { Button } from '../../../components/button';
import { GitHub, Google } from '../../../components/icons';
import Link from 'next/link';
import { LoginForm } from './form';

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Don&apos;t have an account yet?{' '}
            <Link
              className="text-blue-500 hover:underline"
              href="/app/register"
            >
              Create free account
            </Link>
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="flex md:w-[480px] flex-col gap-4 py-8">
          <Button variant="outline" className="w-full">
            <Google className="mr-2 w-5 h-5" /> Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <GitHub className="mr-2 w-5 h-5" /> Continue with GitHub
          </Button>

          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>

          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
