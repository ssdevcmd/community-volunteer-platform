import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col bg-[#f7faf7]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <HeartHandshake size={22} />
            </span>

            <span className="text-lg font-bold tracking-tight text-gray-900">
              Community
              <span className="text-emerald-600">Connect</span>
            </span>
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </section>

      <footer className="py-5 text-center text-sm text-gray-500">
        Together, we make a difference.
      </footer>
    </main>
  );
}