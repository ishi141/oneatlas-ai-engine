import { WorkflowStub } from "./workflow.types.js";

export const workflowTemplates: Record<
  string,
  WorkflowStub
> = {

  slack: {

    name: "Slack Notification",

    trigger: "entity.created",

    integration: "Slack",

    steps: [

      "Validate Payload",

      "Format Slack Message",

      "Send Slack Notification"

    ]

  },

  gmail: {

    name: "Email Notification",

    trigger: "entity.created",

    integration: "Gmail",

    steps: [

      "Generate Email",

      "Send Email"

    ]

  },

  stripe: {

    name: "Payment Workflow",

    trigger: "payment.requested",

    integration: "Stripe",

    steps: [

      "Validate Payment",

      "Create Payment",

      "Store Transaction"

    ]

  },

  supabase: {

    name: "Database Sync",

    trigger: "entity.updated",

    integration: "Supabase",

    steps: [

      "Validate Entity",

      "Insert Record"

    ]

  },

  "google-drive": {

    name: "Document Upload",

    trigger: "document.created",

    integration: "Google Drive",

    steps: [

      "Generate Document",

      "Upload File"

    ]

  }

};