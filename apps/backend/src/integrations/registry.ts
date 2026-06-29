import { Integration } from "./types.js";

export const integrationRegistry: Integration[] = [

  {
    id: "slack",

    displayName: "Slack",

    authType: "oauth2",

    category: "communication",

    description:
      "Slack notifications",

    triggers: [
      "record.created",
      "record.updated",
      "status.changed"
    ],

    actions: [
      {
        id: "send_message",
        name: "Send Message",

        payloadSchema: {
          channel: "string",
          message: "string"
        },

        outputSchema: {
          ts: "string"
        }
      }
    ],

    workflowTemplate: [
      "Prepare Payload",
      "Send Slack Message"
    ]
  },

  {
    id: "gmail",

    displayName: "Gmail",

    authType: "oauth2",

    category: "communication",

    description:
      "Transactional Emails",

    triggers: [
      "record.created",
      "invoice.generated"
    ],

    actions: [
      {
        id: "send_email",
        name: "Send Email",

        payloadSchema: {
          to: "string",
          subject: "string",
          body: "string"
        },

        outputSchema: {
          messageId: "string"
        }
      }
    ],

    workflowTemplate: [
      "Prepare Email",
      "Send Email"
    ]
  },

  {
    id: "stripe",

    displayName: "Stripe",

    authType: "api_key",

    category: "payment",

    description:
      "Payments",

    triggers: [
      "subscription.created",
      "payment.completed"
    ],

    actions: [
      {
        id: "create_payment",

        name: "Create Payment",

        payloadSchema: {
          amount: "number",
          currency: "string"
        },

        outputSchema: {
          paymentId: "string"
        }
      }
    ],

    workflowTemplate: [
      "Create Payment",
      "Store Transaction"
    ]
  },

  {
    id: "github",

    displayName: "GitHub",

    authType: "oauth2",

    category: "developer",

    description:
      "Developer Workflow",

    triggers: [
      "bug.created"
    ],

    actions: [
      {
        id: "create_issue",

        name: "Create Issue",

        payloadSchema: {
          title: "string",
          body: "string"
        },

        outputSchema: {
          issueNumber: "number"
        }
      }
    ],

    workflowTemplate: [
      "Prepare Issue",
      "Create Issue"
    ]
  },

  {
    id: "webhook",

    displayName: "Generic Webhook",

    authType: "webhook_secret",

    category: "automation",

    description:
      "Generic Webhook",

    triggers: [
      "*"
    ],

    actions: [
      {
        id: "post",

        name: "POST Payload",

        payloadSchema: {
          url: "string",
          body: "object"
        },

        outputSchema: {
          status: "number"
        }
      }
    ],

    workflowTemplate: [
      "Create Payload",
      "POST Webhook"
    ]
  }

];