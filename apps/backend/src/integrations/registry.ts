import { Integration } from "./types.js";

export const integrationRegistry: Integration[] = [

  {
    id: "slack",

    name: "Slack",

    category: "communication",

    description:
      "Send notifications to Slack channels.",

    triggers: [
      "lead.created",
      "user.created",
      "invoice.generated"
    ],

    actions: [
      "Send Message"
    ],

    workflowTemplate: [
      "Create Payload",
      "Send Slack Message"
    ]
  },

  {
    id: "gmail",

    name: "Gmail",

    category: "communication",

    description:
      "Send transactional emails.",

    triggers: [
      "lead.created",
      "invoice.generated"
    ],

    actions: [
      "Send Email"
    ],

    workflowTemplate: [
      "Prepare Email",
      "Send Email"
    ]
  },

  {
    id: "stripe",

    name: "Stripe",

    category: "payment",

    description:
      "Payment gateway.",

    triggers: [
      "payment.requested"
    ],

    actions: [
      "Create Payment",
      "Refund"
    ],

    workflowTemplate: [
      "Create Payment",
      "Store Transaction"
    ]
  },

  {
    id: "supabase",

    name: "Supabase",

    category: "database",

    description:
      "Cloud Postgres database.",

    triggers: [
      "entity.created"
    ],

    actions: [
      "Insert Record",
      "Update Record"
    ],

    workflowTemplate: [
      "Validate",
      "Insert"
    ]
  },

  {
    id: "google-drive",

    name: "Google Drive",

    category: "storage",

    description:
      "Cloud storage integration.",

    triggers: [
      "document.generated"
    ],

    actions: [
      "Upload File"
    ],

    workflowTemplate: [
      "Generate File",
      "Upload"
    ]
  }

];