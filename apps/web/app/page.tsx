import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';
import { Alert, AlertDescription, AlertTitle } from '../components/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Switch } from '../components/switch';
import { H1, H2, H3, H4 } from '../components/typography';
import RootLayout from './layout';

import { Link } from 'lucide-react';

export default async function Index() {
  return (
    <RootLayout>
      <div className="px-32 py-16">
        <H1>Hello world</H1>
        <H2>Hello world</H2>
        <H3>Hello world</H3>
        <H4>Hello world</H4>

        <div className="my-5 flex gap-3 items-center">
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/43048524?v=4"
              alt="@michaldziuba03"
            />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>

          <b>Michał Dziuba</b>
        </div>
        <Button>Hello</Button>

        <Switch className="m-4" />

        <div className="grid my-10 max-w-sm items-center gap-1.5">
          <Alert className="my-4">
            <Link className="h-4 w-4" />
            <AlertTitle>Purly!</AlertTitle>
            <AlertDescription>
              Create shortened links, generate QR codes and track traffic.
            </AlertDescription>
          </Alert>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </RootLayout>
  );
}
