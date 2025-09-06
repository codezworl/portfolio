# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Sign up for a free account or login if you already have one

## Step 2: Create Email Service
1. In your dashboard, click **"Add New Service"**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the authentication steps
4. Copy your **Service ID** (it looks like: `service_abc123`)

## Step 3: Create Email Template
1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Design your email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_email}}` - Your email address
4. Save the template and copy your **Template ID** (it looks like: `template_xyz789`)

## Step 4: Get Your User ID
1. In your dashboard, click **"Account"** in the left sidebar
2. Copy your **User ID** (it looks like: `user_def456`)

## Step 5: Update Configuration
1. Open `emailjs-config.js` in your project
2. Replace the placeholder values:
   ```javascript
   const EMAILJS_CONFIG = {
       USER_ID: "user_def456",        // Your actual User ID
       SERVICE_ID: "service_abc123",  // Your actual Service ID
       TEMPLATE_ID: "template_xyz789" // Your actual Template ID
   };
   ```

## Step 6: Test Your Contact Form
1. Save all files
2. Refresh your website
3. Try submitting the contact form
4. Check the browser console for any errors
5. Check your email for the test message

## Troubleshooting

### Common Issues:

1. **"Template ID not found"**
   - Make sure you copied the Template ID correctly
   - Verify the template exists in your EmailJS dashboard

2. **"Service ID not found"**
   - Make sure you copied the Service ID correctly
   - Verify the service is active in your dashboard

3. **"User ID not found"**
   - Make sure you copied the User ID correctly
   - Verify your account is active

4. **CORS errors**
   - Make sure you're using the latest EmailJS CDN
   - Check that your domain is allowed in EmailJS settings

### Testing:
- Use the browser console to see detailed error messages
- Check the Network tab in DevTools to see the actual API calls
- Verify all IDs are correct and match your dashboard

## Security Notes:
- Never commit your actual EmailJS credentials to public repositories
- Consider using environment variables for production
- The free tier allows 200 emails per month

## Support:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)
