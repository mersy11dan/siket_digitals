import { FloatingWhatsApp } from '@digicroz/react-floating-whatsapp'
import { studio } from '../data/content'

export function WhatsAppWidget() {
  const waNumber = studio.whatsapp?.number || '251978695556'
  const waMessage =
    studio.whatsapp?.defaultMessage ||
    'Hello Siket Digitals! I found your website and would like to discuss a project.'

  return (
    <FloatingWhatsApp
      phoneNumber={waNumber}
      accountName="Siket Digitals"
      avatar="/favicon.png"
      statusMessage="Typically replies within 1 hour"
      chatMessage={waMessage}
      placeholder="Type a message..."
      darkMode={false}
      allowClickAway
      allowEsc
      notification
      notificationSound
      style={{ zIndex: 9999 }}
      buttonStyle={{
        backgroundColor: 'var(--logo-green)',
        color: '#ffffff',
      }}
      chatboxStyle={{
        backgroundColor: '#e6e0d1',
        borderRadius: '12px',
        border: '1px solid rgba(26, 25, 23, 0.16)',
      }}
    />
  )
}
