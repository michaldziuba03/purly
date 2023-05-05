import Head from 'next/head'
import { Header } from "@/common/header/Header";
import { Hero } from "@/components/sections/Hero";
import {Features} from "@/components/sections/Features";
import {Footer} from "@/common/footer/Footer";
import {Pricing} from "@/components/sections/Pricing";
import {projectName} from "@/vars";
import {Container} from "@/common/container/Container";
import {Input} from "@/common/controls/Input";
import {Button} from "@/common/controls/Button";
import {Label} from "@/common/typography/Label";
import {Title} from "@/common/typography/Title";

export default function Home() {
    return (
        <>
            <Head>
                <title>Sign In - { projectName }</title>
                <meta name="description" content="XXX is an open-source project to help you share and track your links. Shorten URLs. Generate QR Codes. Track traffic." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div className='mx-auto rounded-xl bg-white max-w-md shadow-lg p-16'>
                    <div className='text-center'>
                        <Title className='mb-10' size={3}>Log In</Title>
                    </div>
                    <form className='flex flex-col gap-3'>
                        <div>
                            <Label text='Email' for='email' />
                            <Input name='email' />
                        </div>

                        <div>
                            <Label text='Password' for='password' />
                            <Input name='password' />
                        </div>

                        <Button full>Create account</Button>
                    </form>
                </div>
            </Container>
        </>
    )
}
