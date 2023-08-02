'use client';

import React from 'react';

export const H1: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};

export const H2: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
};

export const H3: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export const H4: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

export const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export const Blockquote: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
};

export const TextLead: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="text-xl text-muted-foreground">{children}</p>;
};

export const TextLarge: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export const TextSmall: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};

export const TextMuted: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export const TextGradient: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">
      {children}
    </span>
  );
};
