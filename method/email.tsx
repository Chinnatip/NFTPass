import * as sendgrid from '@sendgrid/mail';

export const sendnotify = async (parcel: any) => {
  const msg = {
    from: 'support@kohlife.com',
    to: 'chin@kohlife.com',
    cc: ['tryn@kohlife.com','thanon.von@gmail.com','mikephul@gmail.com'],
    templateId: 'd-02ff3eb188ee43f99485b7d957d5f8a6',
    dynamic_template_data: { ...parcel , "subject": "[Galleryst] New creator submit notify!"},
  }
  const sendgrid_part_0 = 'SG'
  const sendgrid_part_1 = '2qOSgGikSqWcq1gnocw_gg'
  const sendgrid_part_2 = '2sfqo4Yf2w8oIDgSaE2VuSd8yx9RmzkXCejtcd9kJG8'
  const sendgrid_env = `${sendgrid_part_0}.${sendgrid_part_1}.${sendgrid_part_2}`
  sendgrid.setApiKey(sendgrid_env);
  await sendgrid.send(msg)
  return { status: 'success' }
}
