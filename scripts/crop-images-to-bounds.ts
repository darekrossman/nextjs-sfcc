import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import sharp from 'sharp'

interface CropResult {
  originalFile: string
  croppedFile: string
  originalDimensions: { width: number; height: number }
  croppedDimensions: { width: number; height: number }
  success: boolean
  error?: string
}

async function cropImageToBounds(inputPath: string): Promise<CropResult> {
  const originalFile = basename(inputPath)
  const nameWithoutExt = basename(inputPath, extname(inputPath))
  const extension = extname(inputPath)
  const directory = dirname(inputPath)

  try {
    // Get original image metadata
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      throw new Error('Could not read image dimensions')
    }

    const originalDimensions = { width: metadata.width, height: metadata.height }

    // Trim the image to remove transparent/white padding
    const trimmedImage = image.trim({
      background: { r: 255, g: 255, b: 255, alpha: 0 }, // Remove white and transparent pixels
      threshold: 10, // Small threshold to handle slight variations
    })

    // Get the trimmed image metadata to know the new dimensions
    const trimmedBuffer = await trimmedImage.toBuffer()
    const trimmedMetadata = await sharp(trimmedBuffer).metadata()

    if (!trimmedMetadata.width || !trimmedMetadata.height) {
      throw new Error('Could not read trimmed image dimensions')
    }

    const croppedDimensions = {
      width: trimmedMetadata.width,
      height: trimmedMetadata.height,
    }

    // Create output filename with dimensions
    const croppedFile = `${nameWithoutExt}_${croppedDimensions.width}x${croppedDimensions.height}${extension}`
    const outputPath = join(directory, croppedFile)

    // Save the cropped image
    await sharp(trimmedBuffer).toFile(outputPath)

    return {
      originalFile,
      croppedFile,
      originalDimensions,
      croppedDimensions,
      success: true,
    }
  } catch (error) {
    return {
      originalFile,
      croppedFile: '',
      originalDimensions: { width: 0, height: 0 },
      croppedDimensions: { width: 0, height: 0 },
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function cropAllImagesInDirectory(directoryPath: string): Promise<void> {
  try {
    // Check if directory exists
    if (!existsSync(directoryPath)) {
      console.error(`❌ Directory does not exist: ${directoryPath}`)
      process.exit(1)
    }

    // Read all files from directory
    const files = await readdir(directoryPath)

    // Filter for image files
    const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']
    const imageFiles = files.filter(
      (file) =>
        imageExtensions.includes(extname(file).toLowerCase()) && !file.includes('_'), // Skip files that already have dimensions (avoid re-processing)
    )

    if (imageFiles.length === 0) {
      console.log(
        '⚠️  No image files found in the directory (or all files already processed)',
      )
      return
    }

    console.log(`🔄 Found ${imageFiles.length} image files to crop...`)
    console.log(`📂 Processing directory: ${directoryPath}`)
    console.log('')

    const results: CropResult[] = []

    // Process each image
    for (const file of imageFiles) {
      const inputPath = join(directoryPath, file)
      console.log(`🖼️  Processing: ${file}`)

      const result = await cropImageToBounds(inputPath)
      results.push(result)

      if (result.success) {
        const savedSpace =
          result.originalDimensions.width * result.originalDimensions.height -
          result.croppedDimensions.width * result.croppedDimensions.height
        const percentSaved = (
          (savedSpace /
            (result.originalDimensions.width * result.originalDimensions.height)) *
          100
        ).toFixed(1)

        console.log(
          `   ✅ ${result.originalDimensions.width}x${result.originalDimensions.height} → ${result.croppedDimensions.width}x${result.croppedDimensions.height} (${percentSaved}% reduction)`,
        )
        console.log(`   💾 Saved as: ${result.croppedFile}`)
      } else {
        console.log(`   ❌ Failed: ${result.error}`)
      }
      console.log('')
    }

    // Summary
    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length

    console.log('📊 Summary:')
    console.log(`   ✅ Successfully processed: ${successful} images`)
    if (failed > 0) {
      console.log(`   ❌ Failed: ${failed} images`)
    }

    if (successful > 0) {
      const totalOriginalPixels = results
        .filter((r) => r.success)
        .reduce(
          (sum, r) => sum + r.originalDimensions.width * r.originalDimensions.height,
          0,
        )

      const totalCroppedPixels = results
        .filter((r) => r.success)
        .reduce(
          (sum, r) => sum + r.croppedDimensions.width * r.croppedDimensions.height,
          0,
        )

      const overallReduction = (
        ((totalOriginalPixels - totalCroppedPixels) / totalOriginalPixels) *
        100
      ).toFixed(1)
      console.log(`   📉 Overall size reduction: ${overallReduction}%`)
    }
  } catch (error) {
    console.error('❌ Error during cropping process:', error)
    process.exit(1)
  }
}

// Get directory path from command line arguments
const directoryPath = process.argv[2]

if (!directoryPath) {
  console.error('❌ Please provide a directory path as an argument')
  console.log('Usage: pnpm tsx scripts/crop-images-to-bounds.ts <directory-path>')
  console.log('Example: pnpm tsx scripts/crop-images-to-bounds.ts assets/images/products')
  process.exit(1)
}

// Run the cropping process
cropAllImagesInDirectory(directoryPath)
