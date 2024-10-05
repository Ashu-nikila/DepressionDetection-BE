import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { BrainIcon } from "lucide-react"

interface RegisterScreenProps {
  onRegister: () => void;
}

export default function RegisterScreen({ onRegister }: RegisterScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    
    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push({ email, password })
    localStorage.setItem('users', JSON.stringify(users))

    onRegister()
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center">
          <BrainIcon className="h-12 w-12 text-purple-500 mb-2" />
          <h2 className="text-2xl font-bold">Create MindWay Account</h2>
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
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={handleRegister}
          >
            Create Account
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="font-semibold text-purple-600 hover:underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}