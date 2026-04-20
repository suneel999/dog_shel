import { getSiteSettings } from '@/lib/cms/db';
import FooterClient from '@/components/layout/FooterClient';

export default function Footer() {
  const settings = getSiteSettings();

  return (
    <FooterClient
      phone={settings.phone}
      whatsapp={settings.whatsapp}
      email={settings.email}
      address={settings.address}
    />
  );
}
