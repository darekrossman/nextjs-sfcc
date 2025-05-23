// To run this code you need to install the following dependencies:
// npm install @google/genai
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai'
import { writeFile } from 'fs'

function saveBinaryFile(fileName: string, content: Buffer) {
  writeFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err)
      return
    }
    console.log(`File ${fileName} saved to file system.`)
  })
}

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })

  const response = await ai.models.generateImages({
    model: 'models/imagen-3.0-generate-002',
    prompt: `The product is a "RetroGlow Simon Game Replica."

Product Name: RetroGlow Simon Game Replica

Common Prompt Elements (to be appended to each specific prompt):
ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail.

Color Variation 1: Default / Classic Bright RGB

This corresponds to the "default" image group and the "BrightRGB" variation value ("Classic Bright RGB").

Front View (Default/BrightRGB):
"RetroGlow Simon Game Replica in Classic Bright RGB colors (vibrant red, blue, green, yellow quadrants), front view. Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Back View (Default/BrightRGB):
"RetroGlow Simon Game Replica in Classic Bright RGB colors, back view (showing battery compartment or simple back). Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Side View (Default/BrightRGB):
"RetroGlow Simon Game Replica in Classic Bright RGB colors, side profile view (showing thickness and button relief). Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Lay-flat View (Default/BrightRGB):
"RetroGlow Simon Game Replica in Classic Bright RGB colors, lay-flat view from a slightly elevated angle. Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Color Variation 2: Muted Pastel Tones

This corresponds to the "MutedPastel" variation value.

Front View (MutedPastel):
"RetroGlow Simon Game Replica in Muted Pastel Tones (soft pastel red, blue, green, yellow quadrants), front view. Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Back View (MutedPastel):
"RetroGlow Simon Game Replica in Muted Pastel Tones, back view (showing battery compartment or simple back). Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Side View (MutedPastel):
"RetroGlow Simon Game Replica in Muted Pastel Tones, side profile view (showing thickness and button relief). Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Lay-flat View (MutedPastel):
"RetroGlow Simon Game Replica in Muted Pastel Tones, lay-flat view from a slightly elevated angle. Ecommerce product photography, 1:1 aspect ratio, modern white background, studio lighting, sharp focus, high detail."

Swatches

Swatch (Default):
"Ecommerce color swatch for 'Default' RetroGlow Simon Game. Close-up texture shot of the game's iconic bright colored plastic quadrants (e.g., vibrant red, blue, green, yellow), showcasing surface finish. 1:1 aspect ratio, modern white background, studio lighting, sharp focus."
(Path example: images/swatch/10000015M_default_sw.jpg)

Swatch (BrightRGB):
"Ecommerce color swatch for 'BrightRGB' RetroGlow Simon Game. Close-up texture shot of the game's vibrant, classic RGB colored plastic quadrants (bright red, blue, green, yellow), showcasing surface finish. 1:1 aspect ratio, modern white background, studio lighting, sharp focus."
(Path example: images/swatch/10000015M_BrightRGB_sw.jpg)

Swatch (MutedPastel):
"Ecommerce color swatch for 'MutedPastel' RetroGlow Simon Game. Close-up texture shot of the game's muted pastel toned plastic quadrants (soft pastel red, blue, green, yellow), showcasing surface finish. 1:1 aspect ratio, modern white background, studio lighting, sharp focus."
(Path example: images/swatch/10000015M_MutedPastel_sw.jpg)

These prompts should give an AI image generator a good starting point to create the desired ecommerce product shots. Remember to specify the physical characteristics of a "Simon" game (circular, four colored light-up quadrants) if the AI needs more guidance on the object itself.`,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1',
    },
  })

  if (!response?.generatedImages) {
    return
  }

  if (response.generatedImages.length !== 1) {
    console.error('Number of images generated does not match the requested number.')
  }

  for (let i = 0; i < response.generatedImages.length; i++) {
    if (!response.generatedImages?.[i]?.image?.imageBytes) {
      continue
    }
    const fileName = `ENTER_FILE_NAME_${i}.jpg`
    const inlineData = response?.generatedImages?.[i]?.image?.imageBytes
    const buffer = Buffer.from(inlineData || '', 'base64')
    saveBinaryFile(fileName, buffer)
  }
}

main()
