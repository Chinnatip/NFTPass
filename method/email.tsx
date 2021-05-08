import * as sendgrid from '@sendgrid/mail';

export const sendnotify = async (parcel: any) => {
  const msg = {
    from: 'support@kohlife.com',
    to: 'chin@kohlife.com',
    cc: ['tryn@kohlife.com','thanon.von@gmail.com','mikephul@gmail.com'],
    templateId: 'd-02ff3eb188ee43f99485b7d957d5f8a6',
    dynamic_template_data: { ...parcel , "subject": "[Galleryst] New creator submit notify!"},
  }
  const sendgrid_env = process.env.NEXT_PUBLIC_SENDGRID_KEY ? process.env.NEXT_PUBLIC_SENDGRID_KEY : ''
  sendgrid.setApiKey(sendgrid_env);
  await sendgrid.send(msg)
}
