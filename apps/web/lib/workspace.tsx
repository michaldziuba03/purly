'use client';
import { useParams, useRouter, usePathname } from 'next/navigation';
import React, { useState, createContext, useContext } from 'react';

export const WorkspaceContext = createContext<any>(undefined);

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider: React.FC<
  React.PropsWithChildren & { workspaces?: any }
> = ({ children, workspaces }) => {
  const { slug } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [userWorkspaces, setWorkspaces] = useState(workspaces);
  const currentWorkspace =
    workspaces.find((workspace: any) => workspace.slug === slug) ||
    workspaces[0];

  if (!userWorkspaces.length) {
    return <div>Create new workspace.</div>;
  }

  const hasWorkspace = userWorkspaces.some(
    (workspace: any) => workspace.slug === slug
  );
  if (!hasWorkspace) {
    const firstWorkspace = userWorkspaces[0];
    const newPathname = slug
      ? pathname.replace(`/app/${slug}`, `/app/${firstWorkspace.slug}`)
      : `/app/${firstWorkspace.slug}`;
    router.push(newPathname);
    return null;
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces: userWorkspaces,
        setWorkspaces,
        currentWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
