
export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <main className="min-h-screen bg-red-500">
      { children }
    </main>
  );
}