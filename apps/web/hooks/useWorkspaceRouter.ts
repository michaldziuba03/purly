import { usePathname, useRouter } from 'next/navigation';
import { useWorkspace } from '../app/app/workspace';

export function getBasePath(slug: string) {
  return `/app/${slug}`;
}

export function useWorkspaceRouter() {
  const pathname = usePathname();
  const { currentWorkspace } = useWorkspace();
  const router = useRouter();

  function switchTo(workspace: any) {
    const newPathname = pathname.replace(
      getBasePath(currentWorkspace ? currentWorkspace.slug : ''),
      getBasePath(workspace.slug)
    );

    return router.push(newPathname);
  }

  function redirectTo(workspace: any) {
    return router.push(`${getBasePath(workspace.slug)}/dashboard`);
  }

  function getPath(href: string) {
    return `${getBasePath(currentWorkspace.slug)}${href}`;
  }

  return { switchTo, redirectTo, getPath };
}
