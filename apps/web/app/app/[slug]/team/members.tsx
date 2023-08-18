'use client';

import { useMembers } from '../../../../hooks/queries/useMembers';
import { MemberCard } from './member-card';

export function Members() {
  const { data, error, isFetching } = useMembers();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  console.log(data);

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
          />
        );
      })}
    </>
  );
}
