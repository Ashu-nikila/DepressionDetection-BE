import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { BrainIcon } from "lucide-react"
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface LoginScreenProps {
  onLogin: () => void;
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    // Check for default test credentials
    if (email === 'test' && password === 'test') {
      setError('')
      localStorage.setItem('loginTimestamp', new Date().getTime().toString())
      onLogin()
      navigate('/try-me')
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if user exists and password matches
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password)

    if (user) {
      setError('')
      localStorage.setItem('loginTimestamp', new Date().getTime().toString())
      onLogin()
      navigate('/try-me')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center">
          <BrainIcon className="h-12 w-12 text-purple-500 mb-2" />
          <h2 className="text-2xl font-bold">Login to MindWay</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={handleLogin}
          >
            Login
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Login with Google
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="font-semibold text-purple-600 hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}