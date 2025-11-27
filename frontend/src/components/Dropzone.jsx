import { useState, useRef } from 'react'

const Dropzone = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [previews, setPreviews] = useState([])
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    if (files.length > 3) {
      alert('You can only upload up to 3 images')
      return
    }

    const validFiles = files.filter(file => file.type.startsWith('image/'))

    if (validFiles.length !== files.length) {
      alert('Please select only image files')
      return
    }

    if (validFiles.length > 0) {
      const newPreviews = []
      validFiles.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result)
          if (newPreviews.length === validFiles.length) {
            setPreviews(newPreviews)
            onImageSelect(validFiles)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging
            ? 'border-medical-blue-500 bg-medical-blue-50'
            : 'border-gray-300 hover:border-medical-blue-400 hover:bg-gray-50'
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {previews.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Click to change images (Max 3)</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-medical-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-medical-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drag and drop up to 3 skin images here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                or click to browse
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Supported formats: JPG, PNG, JPEG
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropzone

