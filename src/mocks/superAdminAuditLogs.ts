// src/mocks/superAdminAuditLogs.ts
export const mockAuditLogs = [
  {
    id: "log1",
    user: "Alice",
    action: "Created tenant",
    timestamp: "2023-09-01 10:15",
    details: "Tenant \"Acme Corp\" was created with ID t3.",
  },
  {
    id: "log2",
    user: "Bob",
    action: "Updated user role",
    timestamp: "2023-09-02 14:30",
    details: "User \"john.doe@example.com\" role changed to \"Admin\".",
  },
  {
    id: "log3",
    user: "Carol",
    action: "Deleted API key",
    timestamp: "2023-09-03 09:05",
    details: "API key \"abcd-1234\" was revoked.",
  },
];
