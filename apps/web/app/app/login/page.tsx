import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { GitHub, Google } from '../../../components/icons';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center pattern">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to continue
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="mail@example.com" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
            <Link
              className="text-xs hover:underline text-gray-700"
              href="/app/reset"
            >
              Forgot password?
            </Link>
          </div>

          <Button className="w-full">Sign In</Button>

          <span className="text-gray-400 mt-6 text-xs text-center">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              className="text-blue-400 hover:underline"
              href="https://policies.google.com/privacy"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              className="text-blue-400 hover:underline"
              href="https://policies.google.com/terms"
            >
              Terms of Service
            </a>{' '}
            apply.
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
