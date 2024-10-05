import { Link } from 'react-router-dom'
import { Button } from "./ui/button"
import { BrainIcon } from "lucide-react"

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <BrainIcon className="h-24 w-24 text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to MindWay</h1>
          <p className="text-center text-gray-600 mb-8">
            MindWay: Your mental health tracker—detecting depression through data analysis and user insights.
          </p>
          <div className="space-y-4">
            <Link to="/register" className="block w-full">
              <Button className="w-full">Create account</Button>
            </Link>
            <Link to="/login" className="block w-full">
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}