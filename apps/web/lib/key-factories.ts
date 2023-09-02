export function getUserKey() {
  return ['user'];
}

export function getWorkspacesKey() {
  return ['workspaces'];
}

export function getLinksKey(workspaceId: string) {
  return ['links', workspaceId];
}

export function getMembersKey(workspaceId: string) {
  return ['members', workspaceId];
}

export function getInvitesKey(workspaceId: string) {
  return ['invites', workspaceId];
}
