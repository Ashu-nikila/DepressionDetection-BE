import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, BrainIcon, Upload, Camera, X } from "lucide-react"

export default function TryMeScreen({ onLogout }: { onLogout: () => void }) {
  const [text, setText] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (showCamera) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [showCamera])

  const [cameraError, setCameraError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraError(null)
    } catch (err) {
      console.error("Error accessing the camera", err)
      setCameraError("Unable to access the camera. Please ensure you've granted camera permissions and are using a secure connection (HTTPS).")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      console.log('Image selected:', file.name)
    }
  }

  const handleSelfie = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Your browser doesn't support accessing the camera.")
      return
    }
    setShowCamera(true)
  }

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "selfie.jpg", { type: "image/jpeg" })
            setSelectedImage(file)
            setShowCamera(false)
          }
        }, 'image/jpeg')
      }
    }
  }

  const handleDetect = () => {
    console.log('Detecting stress and depression levels')
    navigate('/results')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 relative overflow-hidden">
      <div className="max-w-md mx-auto px-4 py-8 relative z-10">
        <header className="flex items-center mb-6">
          <Button onClick={onLogout}>Logout</Button>
          <h1 className="text-2xl font-semibold flex-grow text-center">Try Me</h1>
          <BrainIcon className="ml-auto h-6 w-6 text-purple-500" />
        </header>

        <p className="text-sm text-gray-600 mb-6">
          Identify your stress and depression levels through images and texts using our multi-modal LLM model
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="post-text" className="block text-sm font-medium text-gray-700 mb-2">
              Post Text
            </label>
            <Textarea
              id="post-text"
              placeholder="Type here..."
              value={text}
              onChange={handleTextChange}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleUpload} className="flex-1 mr-2">
              <Upload className="h-4 w-4 mr-2" />
              Upload image
            </Button>
            <Button variant="outline" onClick={handleSelfie} className="flex-1 ml-2">
              <Camera className="h-4 w-4 mr-2" />
              Take a Selfie
            </Button>
          </div>

          {selectedImage && (
            <p className="text-sm text-gray-600">Selected image: {selectedImage.name}</p>
          )}

          <Button onClick={handleDetect} className="w-full bg-purple-500 hover:bg-purple-600">
            Detect
          </Button>
        </div>
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <div className="relative">
              {cameraError ? (
                <p className="text-red-500 text-center">{cameraError}</p>
              ) : (
                <>
                  <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                  <Button 
                    onClick={handleCapture} 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-500 hover:bg-purple-600"
                  >
                    Capture
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                onClick={() => setShowCamera(false)} 
                className="absolute top-2 right-2 text-black"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-200 rounded-t-[100%] z-0"></div>
    </div>
  )
}