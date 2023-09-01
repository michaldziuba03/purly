'use client';
import { useParams, useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext } from 'react';
import { CreateFirstWorkspace } from './create-first-workspace';
import { Loader } from '../../components/loader';
import { getBasePath } from '../../hooks/useWorkspaceRouter';
import { useUserWorkspaces } from '../../hooks/queries/useWorkspace';

export const WorkspaceContext = createContext<any>(undefined);

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { slug } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const userWorkspaces = useUserWorkspaces();

  const currentWorkspace =
    userWorkspaces.find((workspace: any) => workspace.slug === slug) ||
    userWorkspaces[0];

  if (!userWorkspaces.length) {
    return (
      <WorkspaceContext.Provider
        value={{
          workspaces: userWorkspaces,
          currentWorkspace,
        }}
      >
        <CreateFirstWorkspace />
      </WorkspaceContext.Provider>
    );
  }

  const hasWorkspace = userWorkspaces.some(
    (workspace: any) => workspace.slug === slug
  );
  if (!hasWorkspace) {
    const firstWorkspace = userWorkspaces[0];
    const newPathname = slug
      ? pathname.replace(getBasePath(slug), getBasePath(firstWorkspace.slug))
      : getBasePath(`${firstWorkspace.slug}/dashboard`);

    router.push(newPathname);

    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces: userWorkspaces,
        currentWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
