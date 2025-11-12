"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProdutosPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.listProducts();
        setItems(data);
      } catch {
        setErr("Falha ao carregar produtos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="pt-28">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold">Catálogo</h1>
        <p className="text-white/70 mt-2">Explore os itens disponíveis</p>
        {loading && <div className="mt-10">Carregando...</div>}
        {err && <div className="mt-10 text-red-400">{err}</div>}
        {!loading && !err && (
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}