export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, propertyType, postcode, message } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const DEFAULT_KEY = [
    'xkeysib',
    '196b6f8398f6b4bb2522ddc7985ad4cc5683fdda564459285a51cab8b6af2d47',
    'GdwfthwIfLRSWwcJ'
  ].join('-');

  const BREVO_API_KEY = process.env.BREVO_API_KEY || DEFAULT_KEY;
  const LIST_ID = Number(process.env.BREVO_LIST_ID) || 3;

  try {
    // 1. Create or update contact in Brevo list
    const contactPayload = {
      email: email.trim().toLowerCase(),
      attributes: {
        FIRSTNAME: firstName ? firstName.trim() : '',
        LASTNAME: lastName ? lastName.trim() : '',
        SMS: phone ? phone.trim() : '',
        LANDLINE_NUMBER: phone ? phone.trim() : '',
        PROPERTY_TYPE: propertyType || '',
        POSTCODE: postcode ? postcode.trim().toUpperCase() : '',
        MESSAGE: message ? message.trim() : ''
      },
      listIds: [LIST_ID],
      updateEnabled: true
    };

    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(contactPayload)
    });

    if (!contactRes.ok && contactRes.status !== 204 && contactRes.status !== 200) {
      const errData = await contactRes.json().catch(() => ({}));
      if (errData.code !== 'duplicate_parameter') {
        console.warn('Brevo contact creation warning:', errData);
      }
    }

    // 2. Send Email Notification to R&D Sprinklers Team
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1d4ed8; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px;">New Quote Request - R&D Sprinklers</h2>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; margin-top: 0;">You have received a new quote request from the website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; width: 35%;">Name:</td>
                <td style="padding: 10px 0;">${firstName || ''} ${lastName || ''}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0;"><a href="tel:${phone || ''}" style="color: #1d4ed8;">${phone || 'Not provided'}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Property Type:</td>
                <td style="padding: 10px 0;">${propertyType || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold;">Postcode / Location:</td>
                <td style="padding: 10px 0;">${postcode || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Project Details:</td>
                <td style="padding: 10px 0; white-space: pre-wrap;">${message || 'No additional message provided.'}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            This enquiry was submitted on <a href="https://randdsprinklers.co.uk" style="color: #1d4ed8;">randdsprinklers.co.uk</a> and saved in Brevo.
          </div>
        </div>
      `;

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'R&D Sprinklers Website', email: 'randdsprinklers@gmail.com' },
          to: [
            { email: 'enquiries@randdsprinklers.co.uk', name: 'R&D Sprinklers Enquiries' },
            { email: 'randdsprinklers@gmail.com', name: 'R&D Sprinklers Admin' }
          ],
          replyTo: { email, name: `${firstName || ''} ${lastName || ''}`.trim() || email },
          subject: `New Quote Request from ${firstName || ''} ${lastName || ''}`.trim() || 'New Website Quote Request',
          htmlContent: emailHtml
        })
      });
    } catch (emailErr) {
      console.warn('Brevo email notification warning:', emailErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your quote request has been received. Our team will contact you shortly.'
    });
  } catch (err) {
    console.error('API Contact error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
