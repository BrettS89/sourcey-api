import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (data: { to: string, subject: string, text: string }) => {
  const msg = {
    from: 'blsodie@gmail.com',
    ...data,
  };

  sgMail.send(msg);
};
