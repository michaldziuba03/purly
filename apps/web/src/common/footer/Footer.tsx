import React from "react";
import {Container} from "@/common/container/Container";
import {Logo} from "@/common/Logo";
import {GitHubIcon} from "@/common/icons/GitHub";
import {MastodonIcon} from "@/common/icons/Mastodon";
import {TwitterIcon} from "@/common/icons/Twitter";

interface ILinksColumnProps extends React.PropsWithChildren {
    title: string;
}

const LinksColumn: React.FC<ILinksColumnProps> = (props) => {
    return (
        <div className='flex flex-col text-sm gap-2'>
            <span className='font-semibold text-base text-black mb-1'>{ props.title }</span>
            { props.children }
        </div>
    )
}

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className='w-full'>
            <Container>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-10 pt-16 pb-8'>
                    <div className='col-span-2 md:col-span-1'>
                        <Logo />
                        <div className='mt-3 flex gap-6 text-slate-600'>
                            <GitHubIcon />
                            <TwitterIcon />
                            <MastodonIcon />
                        </div>
                    </div>

                    <LinksColumn title='Follow us'>
                        <a>GitHub</a>
                        <a>Twitter</a>
                        <a>Mastodon</a>
                    </LinksColumn>

                    <LinksColumn title='Project'>
                        <a>About</a>
                        <a>Source code</a>
                        <a>Security policy</a>
                    </LinksColumn>

                    <LinksColumn title='Legal'>
                        <a>Privacy policy</a>
                        <a>Terms of Service</a>
                        <a>Code of Conduct</a>
                        <a>License</a>
                    </LinksColumn>

                </div>
                <hr className="border-gray-200 mx-auto"/>
            </Container>
            <div className='text-sm w-full text-center py-8'>
                © {year} Michał Dziuba. All rights reserved.
            </div>
        </footer>
    )
}