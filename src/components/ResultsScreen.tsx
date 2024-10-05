import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ArrowLeft, BrainIcon } from "lucide-react"

interface AnalysisResult {
  stressLevel: number;
  depressionLevel: number;
  reasoning: string;
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
              <div className="text-blue-500 mb-2" style={{color: '#3B82F6'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-1">Stress Level</h2>
              <div className="text-4xl font-bold text-blue-600" style={{color: '#2563EB'}}>{analysisResult.stressLevel}</div>
              <p className="text-sm text-blue-600" style={{color: '#2563EB'}}>{analysisResult.stressLevel <= 5 ? 'Low' : 'High'}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-100">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="text-purple-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z"/>
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-1">Depression Level</h2>
              <div className="text-4xl font-bold text-purple-600">{analysisResult.depressionLevel}</div>
              <p className="text-sm text-purple-600">{analysisResult.depressionLevel <= 5 ? 'Low' : 'High'}</p>
            </CardContent>
          </Card>
        </div>
  
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Reasoning</h2>
            <p className="text-sm text-gray-600">{analysisResult.reasoning}</p>
          </CardContent>
        </Card>
      </div>
  
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-200 rounded-t-[100%] z-0"></div>
    </div>
  )
}