'use client'

import React, { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  initialImage?: string
  aspectRatio?: number
}

export default function ImageUpload({ onImageUpload, initialImage, aspectRatio = 16 / 9 }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [crop, setCrop] = useState<Crop>()
  const [isUploading, setIsUploading] = useState(false)
  const [showCrop, setShowCrop] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [lastCrop, setLastCrop] = useState<Crop>()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [currentBlobUrl, setCurrentBlobUrl] = useState<string | null>(null)
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspectRatio,
        width,
        height
      ),
      width,
      height
    )
    setCrop(crop)
  }, [aspectRatio])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result as string
      setOriginalImage(imageUrl)
      setImage(imageUrl)
      setShowCrop(true)
      // Reset crop when loading new image
      setLastCrop(undefined)
      setCurrentBlobUrl(null)
    }
    reader.readAsDataURL(file)
  }

  const createCroppedImage = async (croppedArea: PixelCrop): Promise<string> => {
    if (!imgRef.current || !image) throw new Error('No image to crop')

    const imgElement = imgRef.current
    const scaleX = imgElement.naturalWidth / imgElement.width
    const scaleY = imgElement.naturalHeight / imgElement.height

    // Create a canvas with the desired output size
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')

    // Set canvas size to match the crop size
    canvas.width = croppedArea.width
    canvas.height = croppedArea.height

    // Enable image smoothing
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Draw the cropped image
    ctx.drawImage(
      imgElement,
      croppedArea.x * scaleX,
      croppedArea.y * scaleY,
      croppedArea.width * scaleX,
      croppedArea.height * scaleY,
      0,
      0,
      croppedArea.width,
      croppedArea.height
    )

    return canvas.toDataURL('image/jpeg', 0.95)
  }

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current || !image) return

    try {
      setIsUploading(true)

      // Create the cropped image
      const croppedImageUrl = await createCroppedImage(completedCrop)
      setPreviewUrl(croppedImageUrl)

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)
          canvas.toBlob((blob) => {
            if (blob) resolve(blob)
          }, 'image/jpeg', 0.95)
        }
        img.src = croppedImageUrl
      })

      // Create form data
      const formData = new FormData()
      formData.append('file', blob, 'cropped-image.jpg')

      // Upload to Vercel Blob
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const { url } = await response.json()
      setCurrentBlobUrl(url)
      onImageUpload(url)
      
      // Save the current crop for future edits
      setLastCrop(crop)
      
      // Only close the crop interface after successful upload
      setShowCrop(false)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = () => {
    if (originalImage) {
      setImage(originalImage)
      setShowCrop(true)
      // Reset crop to center when editing
      const img = new Image()
      img.onload = () => {
        const crop = centerCrop(
          makeAspectCrop(
            {
              unit: '%',
              width: 90,
            },
            aspectRatio,
            img.width,
            img.height
          ),
          img.width,
          img.height
        )
        setCrop(crop)
      }
      img.src = originalImage
    }
  }

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 cursor-pointer"
        >
          Choose Image
        </label>
      </div>

      {showCrop && image && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-4 rounded-lg w-full max-w-4xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white mb-2">Crop Image</h3>
              <p className="text-gray-400 text-sm">
                Drag to move the crop area. Use the corners to resize.
              </p>
            </div>
            
            <div className="relative" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <ReactCrop
                crop={crop}
                onChange={handleCropChange}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                className="max-w-full max-h-[calc(100vh-200px)]"
              >
                <img
                  ref={imgRef}
                  src={image}
                  alt="Upload preview"
                  className="max-w-full max-h-[calc(100vh-200px)] object-contain"
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowCrop(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropComplete}
                disabled={isUploading || !completedCrop}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Apply Crop'}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewUrl && !showCrop && (
        <div className="mt-4 relative group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-w-md rounded-lg"
          />
          <button
            type="button"
            onClick={handleEdit}
            className="absolute top-2 right-2 px-3 py-1.5 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
          >
            Edit Crop
          </button>
        </div>
      )}
    </div>
  )
} 