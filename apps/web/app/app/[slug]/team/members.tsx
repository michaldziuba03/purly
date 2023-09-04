'use client';

import { useMembers } from '../../../../hooks/queries/useMembers';
import { useAuth } from '../../../../lib/auth';
import { MemberCard } from './member-card';

export function Members() {
  const { data, error, isLoading } = useMembers();
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {data.map((member: any) => {
        return (
          <MemberCard
            key={member.user.id}
            id={member.user.id}
            picture={member.user.picture}
            username={member.user.username}
            email={member.user.email}
            createdAt={member.createdAt}
            role={member.role}
            isUser={member.user.id === user.id}
          />
        );
      })}
    </>
  );
}
