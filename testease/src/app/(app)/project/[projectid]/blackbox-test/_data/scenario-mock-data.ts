import { TScenario } from '@/types/scenario';

export const scenarioMockData = [
  {
    _id: 'SC-1001',
    content: [
      'User registers with a valid email and password, receiving a confirmation email.',
      'User attempts to log in with incorrect credentials three times and gets temporarily locked out.',
      'User resets their password successfully via email verification.',
      'Admin resets a user’s password from the admin panel.',
      'User logs in successfully and remains authenticated across sessions.',
      'User logs out and cannot access restricted pages without logging in again.',
      'User updates their account details, including email and password, with email verification required.',
      'User with expired session gets redirected to the login page upon attempting to access a protected resource.',
      'Admin changes user roles and permissions, restricting access to certain features.',
      'User fails to verify email within 24 hours, requiring re-registration.'
    ]
  },
  {
    _id: 'SC-1002',
    content: [
      'User adds items to cart and proceeds to checkout.',
      'User completes a successful payment using Stripe.',
      'User completes a successful payment using PayPal.',
      'User attempts payment with insufficient funds and receives a failure message.',
      'User abandons the cart before payment, and items remain saved for later.',
      'User applies a discount code at checkout, and the total price updates correctly.',
      'System generates and emails an invoice upon successful payment.',
      'User cancels an order before payment and is not charged.',
      'System handles a failed transaction by retrying payment automatically after 10 minutes.',
      'Admin issues a refund, and the user receives a refund confirmation.'
    ]
  },
  {
    _id: 'SC-1003',
    content: [
      'User updates their profile picture successfully.',
      'User edits their name and contact details, and changes reflect immediately.',
      'User deletes their account, and system marks data for deletion after 30 days.',
      'Admin assigns a user as an administrator, granting them additional privileges.',
      'A regular user attempts to access admin-only settings and is denied access.',
      'User changes their email, requiring verification before the update takes effect.',
      'User updates notification preferences and receives alerts accordingly.',
      'System automatically logs out users who have been inactive for 30 minutes.',
      'User updates their password, and the system logs them out from all devices.',
      'Admin views user access logs to monitor security activities.'
    ]
  },
  {
    _id: 'SC-2001',
    content: [
      'User registers with a valid email and password, receiving a confirmation email.',
      'User attempts to log in with incorrect credentials three times and gets temporarily locked out.',
      'User resets their password successfully via email verification.',
      'Admin resets a user’s password from the admin panel.',
      'User logs in successfully and remains authenticated across sessions.',
      'User logs out and cannot access restricted pages without logging in again.',
      'User updates their account details, including email and password, with email verification required.',
      'User with expired session gets redirected to the login page upon attempting to access a protected resource.',
      'Admin changes user roles and permissions, restricting access to certain features.',
      'User fails to verify email within 24 hours, requiring re-registration.'
    ]
  },
  {
    _id: 'SC-2002',
    content: [
      'User adds items to cart and proceeds to checkout.',
      'User completes a successful payment using Stripe.',
      'User completes a successful payment using PayPal.',
      'User attempts payment with insufficient funds and receives a failure message.',
      'User abandons the cart before payment, and items remain saved for later.',
      'User applies a discount code at checkout, and the total price updates correctly.',
      'System generates and emails an invoice upon successful payment.',
      'User cancels an order before payment and is not charged.',
      'System handles a failed transaction by retrying payment automatically after 10 minutes.',
      'Admin issues a refund, and the user receives a refund confirmation.'
    ]
  },
  {
    _id: 'SC-2003',
    content: [
      'User updates their profile picture successfully.',
      'User edits their name and contact details, and changes reflect immediately.',
      'User deletes their account, and system marks data for deletion after 30 days.',
      'Admin assigns a user as an administrator, granting them additional privileges.',
      'A regular user attempts to access admin-only settings and is denied access.',
      'User changes their email, requiring verification before the update takes effect.',
      'User updates notification preferences and receives alerts accordingly.',
      'System automatically logs out users who have been inactive for 30 minutes.',
      'User updates their password, and the system logs them out from all devices.',
      'Admin views user access logs to monitor security activities.'
    ]
  }
];
