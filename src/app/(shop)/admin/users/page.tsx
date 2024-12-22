export const revalidate = 0

import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function Orders() {

  const { ok, orders: users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />
      </div>
    </>
  );
}