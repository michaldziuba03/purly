export enum MemberRole {
  OWNER = 0, // can manage everything
  ADMIN = 100, // can manage members
  MEMBER = 200, // can read and write
  CLIENT = 300, // readonly role
}

export enum OAuthProviders {
  GOOGLE = 'google',
  GITHUB = 'github',
}
