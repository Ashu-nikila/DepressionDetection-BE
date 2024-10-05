import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ArrowLeft, BrainIcon } from "lucide-react"

interface AnalysisResult {
  stressLevel: number;
  depressionLevel: number;
  reasoning: string;
  imageDescription: string;
}

export default function ResultsScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const analysisResult = location.state?.analysisResult as AnalysisResult

  // ... other handlers ...

  const handleGoBack = () => {
    navigate(-1) // This navigates to the previous page in the history
  }

  if (!analysisResult) {
    return <div>No analysis results available. Please go back and try again.</div>
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <div className="max-w-md mx-auto px-4 py-8">
        <header className="flex items-center mb-6">
          <Button variant="ghost" className="p-0 mr-4" onClick={handleGoBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold flex-grow text-center">Results</h1>
          <BrainIcon className="ml-auto h-6 w-6 text-purple-500" />
        </header>
  
        <p className="text-sm text-gray-600 mb-6">
          Your stress and depression levels identified from the given images and texts
        </p>
  
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-blue-100" style={{backgroundColor: '#EBF8FF'}}>
            <CardContent className="p-4 flex flex-col items-center">
              {/* ... (stress level content) ... */}
              <h2 className="text-lg font-semibold mb-1">Stress Level</h2>
              <div className="text-4xl font-bold text-blue-600" style={{color: '#2563EB'}}>{analysisResult.stressLevel}</div>
              <p className="text-sm text-blue-600" style={{color: '#2563EB'}}>{analysisResult.stressLevel <= 5 ? 'Low' : 'High'}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-100">
            <CardContent className="p-4 flex flex-col items-center">
              {/* ... (depression level content) ... */}
              <h2 className="text-lg font-semibold mb-1">Depression Level</h2>
              <div className="text-4xl font-bold text-purple-600">{analysisResult.depressionLevel}</div>
              <p className="text-sm text-purple-600">{analysisResult.depressionLevel <= 5 ? 'Low' : 'High'}</p>
            </CardContent>
          </Card>
        </div>
  
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Analysis</h2>
            <p className="text-sm text-gray-600">{analysisResult.reasoning}</p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Image Description</h2>
            <p className="text-sm text-gray-600">{analysisResult.imageDescription}</p>
          </CardContent>
        </Card>
      </div>
  
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-200 rounded-t-[100%] z-0"></div>
    </div>
  )
}