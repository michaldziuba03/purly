export function getUserKey() {
  return ['user'];
}

export function getWorkspacesKey() {
  return ['workspaces'];
}

export function getLinksKey(workspaceId: string) {
  return ['workspaces', workspaceId, 'links'];
}

export function getMembersKey(workspaceId: string) {
  return ['workspaces', workspaceId, 'members'];
}
