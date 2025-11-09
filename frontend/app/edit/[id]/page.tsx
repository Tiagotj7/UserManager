import React from 'react'

import UserForm from '@/components/UserForm'

interface EditUserProps {
  params: { id: string }
}

export default function EditUser({ params }: EditUserProps) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Usuário</h1>
      <UserForm id={parseInt(params.id)} />
    </main>
  )
}
