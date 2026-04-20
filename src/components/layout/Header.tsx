import { getSiteSettings } from '@/lib/cms/db';
import PublicHeaderClient from '@/components/layout/PublicHeaderClient';

export default function Header() {
  const settings = getSiteSettings();

  return <PublicHeaderClient rescuePhone={settings.phone} whatsappPhone={settings.whatsapp} />;
}
