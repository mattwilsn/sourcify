import Anthropic from "@anthropic-ai/sdk";
import { getToken } from "../services/token";

async function createAnthropicClient() {
  const apiKey = await getToken("anthropicKey");
  if (!apiKey) throw new Error("Anthropic API key is missing");
  return new Anthropic({ apiKey });
}

async function sendToAnthropic(imageData: string) {
  console.log("sending to Anthropic");

  const anthropic = await createAnthropicClient(); // Wait for API key retrieval

  const message = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: imageData, // Base64-encoded image data as string
            },
          },
          {
            type: "text",
            text: "Return the name and sku of this fabric in that order. Do not return the manufacture of vendor. Lowercase and no spaces between the words. Do not return anything else in your response.",
          },
        ],
      },
    ],
  });

  return message;
}

export default sendToAnthropic;
