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
  id: "github",

  name: "GitHub",

  category: "developer",

  description:
    "Developer workflow integration.",

  triggers: [
    "issue.created",
    "pull_request.opened"
  ],

  actions: [
    "Create Issue",
    "Comment on PR",
    "Trigger Workflow"
  ],

  workflowTemplate: [
    "Prepare Payload",
    "Call GitHub API"
  ]
},

  {
  id: "webhook",

  name: "Webhook",

  category: "automation",

  description:
    "Generic outbound webhook.",

  triggers: [
    "entity.created",
    "entity.updated",
    "status.changed"
  ],

  actions: [
    "POST JSON Payload"
  ],

  workflowTemplate: [
    "Create Payload",
    "POST Webhook"
  ]
}

];