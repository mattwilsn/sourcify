import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  //   apiKey: process.env.ANTHROPIC_API_KEY,
  apiKey: "",
});

async function sendToAnthropic(imageData: string) {
  console.log("sending to Anthropic");
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
            text: "Return the name and sku of this fabric in that order. Do not return the manufacture of vendor.  Lowercase and no spaces between the the words. Do not return anything else in your response",
          },
        ],
      },
    ],
  });
  // console.log(message);
  return message;
}

export default sendToAnthropic;
