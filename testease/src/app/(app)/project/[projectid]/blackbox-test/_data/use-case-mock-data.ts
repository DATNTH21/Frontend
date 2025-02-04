import { UseCase } from '@/types/use-case';

export const useCaseMockData: UseCase[] = [
  {
    use_case_id: 'SC-1001',
    project_id: '67986eda816e2c15dca05886',
    content:
      'User Authentication Flow: The system allows users to register, login, and manage their accounts. The authentication process should include email verification, password encryption, and session management. If a user enters incorrect credentials more than three times, their account should be temporarily locked. Admin users should have the ability to reset passwords and manage user roles.',
    created_at: new Date('2024-02-01T10:15:00Z'),
    updated_at: new Date('2024-02-02T12:30:00Z')
  },
  {
    use_case_id: 'SC-1002',
    project_id: '67986eda816e2c15dca05886',
    content:
      'Payment Processing for E-commerce Transactions: The system should support multiple payment gateways (Stripe, PayPal). Users should be able to add items to a cart, proceed to checkout, and complete payment securely. If a payment fails, the user should be notified with an appropriate message, and the order should not be confirmed. The system should generate invoices automatically upon successful transactions.',
    created_at: new Date('2024-02-02T14:05:00Z'),
    updated_at: new Date('2024-02-03T08:20:00Z')
  },
  {
    use_case_id: 'SC-1003',
    project_id: '67986eda816e2c15dca05886',
    content:
      'User Profile Management and Permissions: Users should be able to update their profile information, including name, profile picture, and preferences. The system should enforce role-based access control (RBAC), restricting certain actions to admins only. Users should have the ability to delete their accounts, and all associated data should be removed from the system within 30 days as per GDPR compliance.',
    created_at: new Date('2024-02-03T16:45:00Z'),
    updated_at: new Date('2024-02-04T09:10:00Z')
  },
  {
    use_case_id: 'SC-2001',
    project_id: '6797c2c3816e2c15dca0581d',
    content:
      'AI-Powered Test Case Generation: The system should automatically generate test cases based on provided user scenarios. The AI model should analyze user input, generate functional and edge-case test cases, and suggest improvements. The generated test cases should be stored and retrievable for future reference. If the AI fails to generate test cases, an error log should be created with detailed failure reasons.',
    created_at: new Date('2024-02-05T11:20:00Z'),
    updated_at: new Date('2024-02-06T07:55:00Z')
  },
  {
    use_case_id: 'SC-2002',
    project_id: '6797c2c3816e2c15dca0581d',
    content:
      'Real-Time Collaboration in Document Editing: Users should be able to edit documents in real time with other collaborators. Changes should be reflected instantly without requiring page refresh. The system should support conflict resolution mechanisms, allowing users to revert to previous versions. Presence indicators should show which users are currently editing the document.',
    created_at: new Date('2024-02-06T13:30:00Z'),
    updated_at: new Date('2024-02-07T10:45:00Z')
  },
  {
    use_case_id: 'SC-2003',
    project_id: '6797c2c3816e2c15dca0581d',
    content:
      'Automated Report Generation and Distribution: The system should allow users to define custom reports, pulling data from various sources. Reports should be generated automatically at scheduled intervals and sent via email or exported as PDFs. If a report fails to generate, an alert should be sent to the system administrator. The system should support role-based access control to restrict access to certain reports.',
    created_at: new Date('2024-02-07T15:40:00Z'),
    updated_at: new Date('2024-02-08T08:15:00Z')
  }
];
