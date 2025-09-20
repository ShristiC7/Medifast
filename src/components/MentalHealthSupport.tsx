import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  Brain, 
  Heart, 
  Smile, 
  Frown,
  Meh,
  Calendar,
  Clock,
  Star,
  Play,
  Pause,
  BookOpen,
  MessageCircle,
  Phone,
  Video,
  Headphones,
  Sun,
  Moon,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MentalHealthSupportProps {
  onBack: () => void;
}

export function MentalHealthSupport({ onBack }: MentalHealthSupportProps) {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  const moodOptions = [
    { value: 1, label: "Very Sad", icon: Frown, color: "text-red-500" },
    { value: 2, label: "Sad", icon: Frown, color: "text-orange-500" },
    { value: 3, label: "Neutral", icon: Meh, color: "text-yellow-500" },
    { value: 4, label: "Happy", icon: Smile, color: "text-green-500" },
    { value: 5, label: "Very Happy", icon: Smile, color: "text-green-600" }
  ];

  const therapists = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialization: "Clinical Psychologist",
      experience: "8 years",
      rating: 4.9,
      sessions: 1200,
      languages: ["English", "Hindi"],
      price: 800,
      nextSlot: "Today 3:00 PM",
      image: "https://images.unsplash.com/photo-1635373390303-cc78167278ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4MTkwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      name: "Dr. Amit Kumar",
      specialization: "Psychiatrist",
      experience: "12 years",
      rating: 4.8,
      sessions: 2100,
      languages: ["English", "Hindi", "Bengali"],
      price: 1200,
      nextSlot: "Tomorrow 10:00 AM",
      image: "https://images.unsplash.com/photo-1635373390303-cc78167278ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4MTkwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      name: "Dr. Meera Singh",
      specialization: "Counseling Psychologist",
      experience: "6 years",
      rating: 4.7,
      sessions: 850,
      languages: ["English", "Hindi", "Marathi"],
      price: 600,
      nextSlot: "Today 6:00 PM",
      image: "https://images.unsplash.com/photo-1635373390303-cc78167278ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4MTkwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const meditationSessions = [
    {
      id: "1",
      title: "Stress Relief Meditation",
      description: "15-minute guided session to reduce stress and anxiety",
      duration: "15 min",
      category: "Stress",
      instructor: "Sarah Johnson",
      plays: 12400,
      rating: 4.8
    },
    {
      id: "2",
      title: "Sleep Meditation",
      description: "Calming meditation to help you fall asleep peacefully",
      duration: "20 min",
      category: "Sleep",
      instructor: "Michael Chen",
      plays: 8900,
      rating: 4.9
    },
    {
      id: "3",
      title: "Morning Mindfulness",
      description: "Start your day with positive energy and focus",
      duration: "10 min",
      category: "Energy",
      instructor: "Lisa Anderson",
      plays: 15600,
      rating: 4.7
    },
    {
      id: "4",
      title: "Anxiety Management",
      description: "Techniques to manage anxiety and panic attacks",
      duration: "18 min",
      category: "Anxiety",
      instructor: "Dr. James Wilson",
      plays: 9800,
      rating: 4.8
    }
  ];

  const selfHelpArticles = [
    {
      title: "Understanding Depression: Signs and Symptoms",
      category: "Depression",
      readTime: "5 min read",
      author: "Dr. Priya Sharma"
    },
    {
      title: "Coping with Anxiety in Daily Life",
      category: "Anxiety",
      readTime: "7 min read",
      author: "Dr. Amit Kumar"
    },
    {
      title: "Building Healthy Sleep Habits",
      category: "Sleep",
      readTime: "4 min read",
      author: "Dr. Meera Singh"
    },
    {
      title: "Stress Management Techniques for Professionals",
      category: "Stress",
      readTime: "8 min read",
      author: "Dr. Priya Sharma"
    }
  ];

  const handlePlayPause = (sessionId: string) => {
    if (activeSession === sessionId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSession(sessionId);
      setIsPlaying(true);
    }
  };

  const renderMoodTracker = () => (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
      <div className="flex justify-between items-center mb-6">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentMood(mood.value)}
            className={`p-3 rounded-full transition-all ${
              currentMood === mood.value 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <mood.icon className={`w-8 h-8 ${mood.color}`} />
          </motion.button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          You're feeling {moodOptions.find(m => m.value === currentMood)?.label.toLowerCase()}
        </p>
        <Button className="w-full">
          Save Mood Entry
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="border-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Mental Health Support</h1>
              <p className="text-sm text-gray-600">Your wellness journey starts here</p>
            </div>
          </div>
          
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Heart className="w-3 h-3 mr-1" />
            Safe Space
          </Badge>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="therapy">Therapy</TabsTrigger>
              <TabsTrigger value="meditation">Meditation</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Mood Tracker */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {renderMoodTracker()}
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Support</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <Phone className="w-5 h-5 text-red-500" />
                          <span>Crisis Helpline</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <MessageCircle className="w-5 h-5 text-blue-500" />
                          <span>Chat Support</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <Headphones className="w-5 h-5 text-purple-500" />
                          <span>Meditation</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col gap-2">
                          <BookOpen className="w-5 h-5 text-green-500" />
                          <span>Self-Help</span>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Progress Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">This Week's Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Mood Tracking</span>
                            <span>5/7 days</span>
                          </div>
                          <Progress value={71} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Meditation</span>
                            <span>3/5 sessions</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Sleep Quality</span>
                            <span>Good</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Next Session */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Next Session</h3>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calendar className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          You have a session with Dr. Priya Sharma
                        </p>
                        <p className="font-medium text-gray-900 mb-4">
                          Today at 3:00 PM
                        </p>
                        <Button size="sm" className="w-full">
                          Join Session
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            {/* Therapy Tab */}
            <TabsContent value="therapy" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find a Therapist</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {therapists.map((therapist, index) => (
                    <motion.div
                      key={therapist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                          <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                          <p className="text-sm text-gray-600">{therapist.specialization}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Experience</span>
                            <span className="font-medium">{therapist.experience}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Rating</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{therapist.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Sessions</span>
                            <span className="font-medium">{therapist.sessions}+</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Price</span>
                            <span className="font-medium">₹{therapist.price}/session</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Languages:</p>
                          <div className="flex gap-1">
                            {therapist.languages.map((lang, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm text-green-600 mb-3">
                            Next available: {therapist.nextSlot}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Video className="w-4 h-4 mr-1" />
                              Book
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Meditation Tab */}
            <TabsContent value="meditation" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Guided Meditation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {meditationSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <Button
                            size="sm"
                            variant={activeSession === session.id && isPlaying ? "default" : "outline"}
                            onClick={() => handlePlayPause(session.id)}
                            className="mt-1"
                          >
                            {activeSession === session.id && isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{session.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {session.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  {session.rating}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Play className="w-4 h-4" />
                                  {session.plays.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-2">
                              by {session.instructor}
                            </p>
                          </div>
                        </div>
                        
                        {activeSession === session.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
                              </div>
                              <span className="text-sm text-gray-500">5:23 / 15:00</span>
                            </div>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Self-Help Resources</h2>
                <div className="space-y-4">
                  {selfHelpArticles.map((article, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <Badge variant="outline" className="text-xs">
                                {article.category}
                              </Badge>
                              <span>{article.readTime}</span>
                              <span>by {article.author}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Read
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-6">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support Community</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Connect with others on similar journeys, share experiences, and find support 
                  in our safe and moderated community spaces.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Join Community
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}