'use client';

import { usePathname } from 'next/navigation';

export default function WhatsAppButtonClient({ whatsappPhone }: { whatsappPhone: string }) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/91${whatsappPhone}?text=Hi, I need help regarding an animal rescue.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 hidden rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-green-600 md:inline-flex"
      aria-label="Contact us on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
