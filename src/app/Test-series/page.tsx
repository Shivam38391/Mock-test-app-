"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Users,
  Trophy,
  AlertTriangle,
  Timer,
} from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface TestSeries {
  id: string
  name: string
  description: string
  duration: number // in minutes
  totalQuestions: number
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  questions: Question[]
}

const testSeriesData: TestSeries[] = [
  {
    id: "general-knowledge",
    name: "General Knowledge Quiz",
    description:
      "Test your knowledge across various topics including geography, history, science, and current affairs.",
    duration: 15,
    totalQuestions: 8,
    difficulty: "Medium",
    category: "General Knowledge",
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "Which programming language is known for its use in web development and has a coffee-related name?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "What is the smallest unit of matter?",
        options: ["Molecule", "Atom", "Electron", "Proton"],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "science-basics",
    name: "Science Fundamentals",
    description:
      "Explore basic concepts in physics, chemistry, and biology. Perfect for students and science enthusiasts.",
    duration: 20,
    totalQuestions: 10,
    difficulty: "Easy",
    category: "Science",
    questions: [
      {
        id: 1,
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "What is the speed of light in vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "Which organ in the human body produces insulin?",
        options: ["Liver", "Kidney", "Pancreas", "Heart"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "Which force keeps planets in orbit around the sun?",
        options: ["Magnetic force", "Gravitational force", "Electric force", "Nuclear force"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "What is the pH value of pure water?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "Which blood type is known as the universal donor?",
        options: ["A", "B", "AB", "O"],
        correctAnswer: 3,
      },
      {
        id: 9,
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: "How many chambers does a human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "advanced-math",
    name: "Advanced Mathematics",
    description: "Challenge yourself with complex mathematical problems covering algebra, calculus, and geometry.",
    duration: 30,
    totalQuestions: 12,
    difficulty: "Hard",
    category: "Mathematics",
    questions: [
      {
        id: 1,
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2x²"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What is the value of π (pi) to 3 decimal places?",
        options: ["3.141", "3.142", "3.143", "3.144"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "In a right triangle, if one angle is 30°, what is the other acute angle?",
        options: ["45°", "60°", "90°", "120°"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "What is the integral of 1/x?",
        options: ["ln(x)", "x²/2", "1/x²", "e^x"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "What is the sum of interior angles in a pentagon?",
        options: ["360°", "540°", "720°", "900°"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "What is the quadratic formula?",
        options: ["x = -b ± √(b²-4ac)/2a", "x = b ± √(b²+4ac)/2a", "x = -b ± √(b²+4ac)/2a", "x = b ± √(b²-4ac)/2a"],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "What is the limit of (sin x)/x as x approaches 0?",
        options: ["0", "1", "∞", "undefined"],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: "What is the area of a circle with radius r?",
        options: ["πr", "2πr", "πr²", "2πr²"],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: "What is the factorial of 5?",
        options: ["60", "100", "120", "150"],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: "What is the slope of a line perpendicular to y = 2x + 3?",
        options: ["2", "-2", "1/2", "-1/2"],
        correctAnswer: 3,
      },
      {
        id: 11,
        question: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
        options: ["ad + bc", "ad - bc", "ac - bd", "ac + bd"],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: "What is the sum of the first 10 natural numbers?",
        options: ["45", "50", "55", "60"],
        correctAnswer: 2,
      },
    ],
  },
]

export default function TestPlatform() {
  const [currentPage, setCurrentPage] = useState<"home" | "quiz" | "results">("home")
  const [selectedTestSeries, setSelectedTestSeries] = useState<TestSeries | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsTimerActive(false)
            handleTimeUp()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerActive, timeLeft])

  const handleTimeUp = () => {
    setIsCompleted(true)
    setCurrentPage("results")
  }

  const startTest = (testSeries: TestSeries) => {
    setSelectedTestSeries(testSeries)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setIsCompleted(false)
    setTimeLeft(testSeries.duration * 60) // Convert minutes to seconds
    setIsTimerActive(true)
    setCurrentPage("quiz")
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getTimeWarningLevel = () => {
    if (!selectedTestSeries) return "normal"
    const totalTime = selectedTestSeries.duration * 60
    const timePercentage = (timeLeft / totalTime) * 100

    if (timePercentage <= 10) return "critical"
    if (timePercentage <= 25) return "warning"
    return "normal"
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedTestSeries) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [selectedTestSeries.questions[currentQuestionIndex].id]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (!selectedTestSeries) return
    if (currentQuestionIndex < selectedTestSeries.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
      setIsTimerActive(false)
      setCurrentPage("results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    if (!selectedTestSeries) return 0
    let correct = 0
    selectedTestSeries.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const handleRestart = () => {
    setCurrentPage("home")
    setSelectedTestSeries(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setIsCompleted(false)
    setTimeLeft(0)
    setIsTimerActive(false)
  }

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Home Page
  if (currentPage === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Test Series Platform</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of test series to challenge your knowledge and skills
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{testSeriesData.length}</h3>
                <p className="text-gray-600">Test Series Available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
                <p className="text-gray-600">Students Tested</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Test Series Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testSeriesData.map((testSeries) => (
              <Card key={testSeries.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">{testSeries.name}</CardTitle>
                    <Badge className={getDifficultyColor(testSeries.difficulty)}>{testSeries.difficulty}</Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {testSeries.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{testSeries.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{testSeries.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{testSeries.totalQuestions} questions</span>
                    </div>
                  </div>

                  <Button onClick={() => startTest(testSeries)} className="w-full" size="lg">
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Results Page
  if (currentPage === "results") {
    if (!selectedTestSeries) return null

    const score = calculateScore()
    const percentage = Math.round((score / selectedTestSeries.questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Test Results</CardTitle>
            <p className="text-gray-600">{selectedTestSeries.name}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{selectedTestSeries.questions.length}
              </div>
              <div className="text-xl text-gray-600 mb-4">Score: {percentage}%</div>
              <div className="flex justify-center mb-6">
                {percentage >= 80 ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : percentage >= 60 ? (
                  <CheckCircle className="w-16 h-16 text-yellow-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500" />
                )}
              </div>
              <p className="text-lg text-gray-700 mb-6">
                {percentage >= 80 ? "Excellent work! 🎉" : percentage >= 60 ? "Good job! 👍" : "Keep practicing! 💪"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Review Your Answers:</h3>
              <div className="max-h-96 overflow-y-auto space-y-4">
                {selectedTestSeries.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            Your answer:{" "}
                            <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                              {userAnswer !== undefined ? question.options[userAnswer] : "Not answered"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Back to Home
              </Button>
              <Button
                onClick={() => startTest(selectedTestSeries)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Timer className="w-4 h-4" />
                Retake Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Page
  if (!selectedTestSeries) return null

  const currentQuestion = selectedTestSeries.questions[currentQuestionIndex]
  const totalQuestions = selectedTestSeries.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const warningLevel = getTimeWarningLevel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{selectedTestSeries.name}</h1>
            <p className="text-gray-600">
              {selectedTestSeries.category} • {selectedTestSeries.difficulty}
            </p>
          </div>

          {/* Timer */}
          <Card
            className={`${
              warningLevel === "critical"
                ? "border-red-500 bg-red-50"
                : warningLevel === "warning"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-blue-500 bg-blue-50"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {warningLevel === "critical" ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-600" />
                )}
                <span
                  className={`text-lg font-bold ${
                    warningLevel === "critical"
                      ? "text-red-600"
                      : warningLevel === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Time Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {getAnsweredCount()}/{totalQuestions} answered
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-lg font-medium text-gray-800 leading-relaxed">{currentQuestion.question}</h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion.id]?.toString() || ""}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-blue-50 ${
                    selectedAnswers[currentQuestion.id] === index ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-gray-700 font-medium">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {selectedTestSeries.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? "bg-blue-600 text-white"
                    : selectedAnswers[selectedTestSeries.questions[index].id] !== undefined
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            className="flex items-center gap-2"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
