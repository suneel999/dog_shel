import { getSiteSettings } from '@/lib/cms/db';
import WhatsAppButtonClient from '@/components/ui/WhatsAppButtonClient';

export default function WhatsAppButton() {
  const settings = getSiteSettings();
  const whatsapp = settings.whatsapp.replace(/\s+/g, '');

  return <WhatsAppButtonClient whatsappPhone={whatsapp} />;
}
