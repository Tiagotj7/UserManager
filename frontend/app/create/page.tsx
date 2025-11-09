import React from "react";

import UserForm from '@/components/UserForm'

export default function CreateUser() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>
      <UserForm />
    </main>
  )
}
