// import Anthropic from "@anthropic-ai/sdk";

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// async function main(imageData) {
//   const message = await anthropic.messages.create({
//     model: "claude-3-7-sonnet-20250219",
//     max_tokens: 1024,
//     messages: [
//       {
//         role: "user",
//         content: [
//           {
//             type: "image",
//             source: {
//               type: "base64",
//               media_type: "image/jpeg",
//               data: imageData, // Base64-encoded image data as string
//             },
//           },
//           {
//             type: "text",
//             text: "What is the sku and name of this image",
//           },
//         ],
//       },
//     ],
//   });

//   console.log(message);
// }

// export default main(imageData);
