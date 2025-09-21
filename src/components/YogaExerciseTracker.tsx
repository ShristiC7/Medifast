import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Timer, 
  Target, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Plus,
  Heart,
  Flame,
  Activity,
  Award,
  Clock,
  User,
  Video,
  BookOpen,
  Bell,
  CheckCircle
} from "lucide-react";

interface YogaExerciseTrackerProps {
  onBack: () => void;
}

export function YogaExerciseTracker({ onBack }: YogaExerciseTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const todayStats = {
    workoutsCompleted: 2,
    totalMinutes: 45,
    caloriesBurned: 180,
    streak: 7
  };

  const weeklyGoal = {
    target: 300, // minutes
    completed: 180,
    percentage: 60
  };

  const workoutCategories = [
    {
      id: "yoga",
      name: "Yoga",
      icon: "🧘‍♀️",
      workouts: [
        { id: "morning-yoga", name: "Morning Sun Salutation", duration: 15, difficulty: "Beginner", calories: 45 },
        { id: "power-yoga", name: "Power Yoga Flow", duration: 30, difficulty: "Intermediate", calories: 120 },
        { id: "relaxing-yoga", name: "Evening Relaxation", duration: 20, difficulty: "Beginner", calories: 60 }
      ]
    },
    {
      id: "cardio",
      name: "Cardio",
      icon: "🏃‍♀️",
      workouts: [
        { id: "hiit", name: "HIIT Training", duration: 20, difficulty: "Advanced", calories: 200 },
        { id: "dance", name: "Dance Cardio", duration: 25, difficulty: "Intermediate", calories: 150 },
        { id: "walking", name: "Brisk Walking", duration: 30, difficulty: "Beginner", calories: 90 }
      ]
    },
    {
      id: "strength",
      name: "Strength",
      icon: "💪",
      workouts: [
        { id: "bodyweight", name: "Bodyweight Exercises", duration: 25, difficulty: "Intermediate", calories: 100 },
        { id: "pilates", name: "Pilates Core", duration: 20, difficulty: "Beginner", calories: 80 },
        { id: "resistance", name: "Resistance Training", duration: 35, difficulty: "Advanced", calories: 140 }
      ]
    }
  ];

  const recentActivities = [
    { id: 1, name: "Morning Sun Salutation", date: "Today", duration: 15, calories: 45 },
    { id: 2, name: "Power Yoga Flow", date: "Today", duration: 30, calories: 120 },
    { id: 3, name: "Evening Relaxation", date: "Yesterday", duration: 20, calories: 60 },
    { id: 4, name: "HIIT Training", date: "Yesterday", duration: 20, calories: 200 }
  ];

  const achievements = [
    { id: 1, name: "7 Day Streak", icon: "🔥", earned: true },
    { id: 2, name: "100 Minutes", icon: "⏰", earned: true },
    { id: 3, name: "Yoga Master", icon: "🧘‍♀️", earned: false },
    { id: 4, name: "Cardio King", icon: "👑", earned: false }
  ];

  const customWorkouts = [
    { id: "custom1", name: "My Morning Routine", exercises: 5, duration: 25, lastUsed: "2 days ago" },
    { id: "custom2", name: "Quick Lunch Break", exercises: 3, duration: 10, lastUsed: "1 week ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Yoga & Exercise Tracker</h1>
              <p className="text-gray-600">Track your fitness journey and stay motivated</p>
            </div>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Workout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayStats.workoutsCompleted}</p>
              <p className="text-sm text-gray-600">Workouts Today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalMinutes}</p>
              <p className="text-sm text-gray-600">Minutes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayStats.caloriesBurned}</p>
              <p className="text-sm text-gray-600">Calories</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{todayStats.streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            {/* Weekly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Weekly Goal Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{weeklyGoal.completed} / {weeklyGoal.target} minutes</span>
                    <span>{weeklyGoal.percentage}%</span>
                  </div>
                  <Progress value={weeklyGoal.percentage} className="mb-2" />
                  <p className="text-sm text-gray-500">
                    {weeklyGoal.target - weeklyGoal.completed} minutes remaining to reach your goal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Workout Categories */}
            <div className="grid lg:grid-cols-3 gap-6">
              {workoutCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-2xl mr-2">{category.icon}</span>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.workouts.map((workout) => (
                        <div key={workout.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {workout.difficulty}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mb-3">
                            <span>{workout.duration} min</span>
                            <span>{workout.calories} cal</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </Button>
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Activity History */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.name}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{activity.duration} min</p>
                          <p className="text-xs text-gray-500">{activity.calories} cal</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>This Week Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Workouts</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Minutes</span>
                      <span className="font-semibold">180 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Calories Burned</span>
                      <span className="font-semibold">720 cal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average per Day</span>
                      <span className="font-semibold">26 min</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-green-600 font-medium">🎉 Great job! You're 20% ahead of last week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Calendar</CardTitle>
                  <CardDescription>Click on a date to log or view activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Activities for {selectedDate?.toLocaleDateString() || "Selected Date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate?.toDateString() === new Date().toDateString() ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-900">Morning Sun Salutation</p>
                            <p className="text-sm text-green-700">Completed at 7:30 AM</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">15 min</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-900">Power Yoga Flow</p>
                            <p className="text-sm text-green-700">Completed at 6:00 PM</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">30 min</Badge>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Log New Activity
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No activities logged for this date</p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Activity
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                    {achievement.earned ? (
                      <Badge className="bg-yellow-100 text-yellow-800">Earned!</Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Achievement Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Yoga Master (20 yoga sessions)</span>
                      <span>15/20</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cardio King (50 cardio sessions)</span>
                      <span>12/50</span>
                    </div>
                    <Progress value={24} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Consistency Champion (30 day streak)</span>
                      <span>7/30</span>
                    </div>
                    <Progress value={23} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Workouts Tab */}
          <TabsContent value="custom" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Custom Workouts</CardTitle>
                  <CardDescription>Create and manage your personalized workout routines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {customWorkouts.map((workout) => (
                      <div key={workout.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{workout.exercises} exercises</span>
                          <span>{workout.duration} min</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Last used: {workout.lastUsed}</p>
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Start Workout
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Workout
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workout Builder</CardTitle>
                  <CardDescription>Quick create a new custom workout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="workout-name">Workout Name</Label>
                    <Input id="workout-name" placeholder="My Amazing Workout" />
                  </div>
                  
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  
                  <div>
                    <Label>Category</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Yoga</option>
                      <option>Cardio</option>
                      <option>Strength</option>
                      <option>Mixed</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>Difficulty Level</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Workout Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between">
                <Label>Daily Reminder</Label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Goal Progress</Label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Achievement Unlocked</Label>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}