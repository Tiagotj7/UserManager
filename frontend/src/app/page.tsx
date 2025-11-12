"use client";
import Hero from "../components/Hero";
import CrudTable from "../components/CrudTable";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#1e1f22] min-h-screen text-white">
      <Navbar />
      <Hero />
      <section className="p-10">
        <h2 className="text-3xl font-bold mb-6">Gerenciar Usuários</h2>
        <CrudTable />
      </section>
    </main>
  );
}
