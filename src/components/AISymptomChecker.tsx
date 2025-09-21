import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ArrowLeft, Brain, AlertTriangle, CheckCircle, Clock, Stethoscope, Phone, MessageSquare } from "lucide-react";

interface AISymptomCheckerProps {
  onBack: () => void;
}

export function AISymptomChecker({ onBack }: AISymptomCheckerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [duration, setDuration] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const symptoms = [
    { id: "fever", name: "Fever", category: "general" },
    { id: "headache", name: "Headache", category: "head" },
    { id: "cough", name: "Cough", category: "respiratory" },
    { id: "sore_throat", name: "Sore Throat", category: "respiratory" },
    { id: "runny_nose", name: "Runny Nose", category: "respiratory" },
    { id: "shortness_breath", name: "Shortness of Breath", category: "respiratory" },
    { id: "chest_pain", name: "Chest Pain", category: "cardiac" },
    { id: "fatigue", name: "Fatigue", category: "general" },
    { id: "body_aches", name: "Body Aches", category: "general" },
    { id: "nausea", name: "Nausea", category: "digestive" },
    { id: "stomach_pain", name: "Stomach Pain", category: "digestive" },
    { id: "diarrhea", name: "Diarrhea", category: "digestive" }
  ];

  const analysisResults = {
    primaryCondition: "Upper Respiratory Tract Infection",
    probability: 85,
    secondaryConditions: [
      { name: "Common Cold", probability: 70 },
      { name: "Viral Fever", probability: 60 }
    ],
    recommendations: [
      "Get plenty of rest and stay hydrated",
      "Consider over-the-counter fever reducers if needed",
      "Monitor symptoms for 24-48 hours",
      "Consult a doctor if symptoms worsen or persist beyond 7 days"
    ],
    urgency: "low",
    followUp: "Schedule a consultation if symptoms persist for more than 3 days"
  };

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      // Simulate API call
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSymptoms.length > 0;
      case 2: return severity !== "";
      case 3: return duration !== "";
      case 4: return true;
      default: return false;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Brain className="w-16 h-16 text-blue-600 mx-auto animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Symptoms</h3>
            <p className="text-gray-600 mb-6">Our AI is processing your information to provide personalized insights...</p>
            <Progress value={75} className="mb-4" />
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Symptom Analysis Results</h1>
              <p className="text-gray-600">Based on AI analysis of your symptoms</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Primary Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Primary Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{analysisResults.primaryCondition}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">Confidence Level:</span>
                      <Badge variant={analysisResults.probability > 80 ? "default" : "secondary"}>
                        {analysisResults.probability}%
                      </Badge>
                    </div>
                    <Progress value={analysisResults.probability} className="mb-4" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Other Possible Conditions:</h4>
                    <div className="space-y-2">
                      {analysisResults.secondaryConditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700">{condition.name}</span>
                          <Badge variant="outline">{condition.probability}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-1">Important Disclaimer</h4>
                      <p className="text-sm text-orange-800">
                        This AI analysis is for informational purposes only and should not replace professional medical advice. 
                        Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Actions */}
            <div className="space-y-6">
              {/* Urgency Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Urgency Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      analysisResults.urgency === "high" ? "bg-red-100" :
                      analysisResults.urgency === "medium" ? "bg-orange-100" : "bg-green-100"
                    }`}>
                      <Clock className={`w-8 h-8 ${
                        analysisResults.urgency === "high" ? "text-red-600" :
                        analysisResults.urgency === "medium" ? "text-orange-600" : "text-green-600"
                      }`} />
                    </div>
                    <Badge variant={analysisResults.urgency === "high" ? "destructive" : "secondary"} className="mb-2">
                      {analysisResults.urgency.toUpperCase()} PRIORITY
                    </Badge>
                    <p className="text-sm text-gray-600">{analysisResults.followUp}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Book Doctor Consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Health Helpline
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with Doctor
                  </Button>
                </CardContent>
              </Card>

              {/* Retry Analysis */}
              <Card>
                <CardContent className="p-4">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setCurrentStep(1);
                    setSelectedSymptoms([]);
                    setSeverity("");
                    setDuration("");
                    setShowResults(false);
                  }}>
                    Start New Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Symptom Checker</h1>
            <p className="text-gray-600">Get personalized health insights in minutes</p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </CardContent>
        </Card>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "What symptoms are you experiencing?"}
                {currentStep === 2 && "How severe are your symptoms?"}
                {currentStep === 3 && "How long have you had these symptoms?"}
                {currentStep === 4 && "Any additional information?"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Select all symptoms that apply to you"}
                {currentStep === 2 && "Rate the overall severity of your symptoms"}
                {currentStep === 3 && "When did your symptoms start?"}
                {currentStep === 4 && "Review your information before analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Symptom Selection */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={selectedSymptoms.includes(symptom.id)}
                          onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        />
                        <Label htmlFor={symptom.id} className="cursor-pointer">
                          {symptom.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Severity */}
              {currentStep === 2 && (
                <RadioGroup value={severity} onValueChange={setSeverity}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="mild" />
                      <Label htmlFor="mild">Mild - Noticeable but doesn't interfere with daily activities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Moderate - Somewhat interferes with daily activities</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severe" id="severe" />
                      <Label htmlFor="severe">Severe - Significantly interferes with daily activities</Label>
                    </div>
                  </div>
                </RadioGroup>
              )}

              {/* Step 3: Duration */}
              {currentStep === 3 && (
                <RadioGroup value={duration} onValueChange={setDuration}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hours" id="hours" />
                      <Label htmlFor="hours">A few hours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2days" id="1-2days" />
                      <Label htmlFor="1-2days">1-2 days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-7days" id="3-7days" />
                      <Label htmlFor="3-7days">3-7 days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="week+" id="week+" />
                      <Label htmlFor="week+">More than a week</Label>
                    </div>
                  </div>
                </RadioGroup>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Selected Symptoms:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSymptoms.map(symptomId => {
                        const symptom = symptoms.find(s => s.id === symptomId);
                        return (
                          <Badge key={symptomId} variant="secondary">
                            {symptom?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Severity:</h4>
                    <Badge variant="outline">{severity}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration:</h4>
                    <Badge variant="outline">{duration}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === totalSteps ? "Analyze Symptoms" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}