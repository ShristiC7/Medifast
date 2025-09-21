import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  ArrowLeft, 
  Camera, 
  Plus, 
  Search,
  TrendingUp,
  Target,
  Apple,
  Droplets,
  Zap,
  Activity,
  Clock,
  Utensils,
  Scan,
  BarChart3,
  Award,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

interface NutritionTrackerProps {
  onBack: () => void;
}

export function NutritionTracker({ onBack }: NutritionTrackerProps) {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const dailyGoals = {
    calories: { target: 2000, consumed: 1450, remaining: 550 },
    protein: { target: 150, consumed: 95, remaining: 55 },
    carbs: { target: 250, consumed: 180, remaining: 70 },
    fat: { target: 65, consumed: 48, remaining: 17 },
    water: { target: 8, consumed: 6, remaining: 2 } // glasses
  };

  const todayMeals = [
    {
      id: "breakfast",
      name: "Breakfast",
      time: "8:00 AM",
      calories: 450,
      items: [
        { name: "Oatmeal with berries", calories: 200, protein: 8, carbs: 35, fat: 4 },
        { name: "Greek yogurt", calories: 150, protein: 20, carbs: 10, fat: 0 },
        { name: "Almonds (10 pieces)", calories: 100, protein: 4, carbs: 2, fat: 9 }
      ]
    },
    {
      id: "lunch",
      name: "Lunch",
      time: "1:00 PM",
      calories: 600,
      items: [
        { name: "Grilled chicken salad", calories: 350, protein: 35, carbs: 15, fat: 18 },
        { name: "Brown rice (1 cup)", calories: 200, protein: 5, carbs: 45, fat: 2 },
        { name: "Olive oil dressing", calories: 50, protein: 0, carbs: 0, fat: 6 }
      ]
    },
    {
      id: "snack",
      name: "Snack",
      time: "4:00 PM",
      calories: 200,
      items: [
        { name: "Apple with peanut butter", calories: 200, protein: 8, carbs: 25, fat: 8 }
      ]
    },
    {
      id: "dinner",
      name: "Dinner",
      time: "Planned",
      calories: 0,
      items: []
    }
  ];

  const weeklyProgress = [
    { day: "Mon", calories: 1890 },
    { day: "Tue", calories: 2100 },
    { day: "Wed", calories: 1950 },
    { day: "Thu", calories: 2050 },
    { day: "Fri", calories: 1800 },
    { day: "Sat", calories: 2200 },
    { day: "Sun", calories: 1450 }
  ];

  const foodSuggestions = [
    {
      name: "Grilled Salmon",
      calories: 280,
      protein: 40,
      carbs: 0,
      fat: 12,
      benefits: ["Heart Healthy", "High Protein", "Omega-3 Rich"],
      warnings: []
    },
    {
      name: "Quinoa Bowl",
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 5,
      benefits: ["Complete Protein", "High Fiber", "Gluten-Free"],
      warnings: []
    },
    {
      name: "Chocolate Cake",
      calories: 450,
      protein: 6,
      carbs: 65,
      fat: 20,
      benefits: ["Energy Boost"],
      warnings: ["High Sugar", "High Calories", "Processed"]
    }
  ];

  const nutritionTips = [
    "Drink water 30 minutes before meals to aid digestion",
    "Include protein in every meal to maintain muscle mass",
    "Eat colorful fruits and vegetables for varied nutrients",
    "Plan your meals ahead to avoid unhealthy choices"
  ];

  const achievements = [
    { name: "Hydration Hero", description: "Drink 8 glasses for 7 days", progress: 85, unlocked: false },
    { name: "Protein Power", description: "Meet protein goals for 5 days", progress: 100, unlocked: true },
    { name: "Balanced Eater", description: "Log all meals for 10 days", progress: 60, unlocked: false }
  ];

  const FoodScanner = () => (
    <Card className="border-dashed border-2 border-blue-300 bg-blue-50">
      <CardContent className="p-8 text-center">
        <Camera className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Scanner</h3>
        <p className="text-gray-600 mb-6">
          Point your camera at food to get instant nutrition information
        </p>
        <div className="space-y-3">
          <Button className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            Open Camera
          </Button>
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
          <Button variant="ghost" onClick={() => setShowScanner(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" onClick={onBack} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nutrition Tracker</h1>
              <p className="text-gray-600">Track your daily nutrition and reach your health goals</p>
            </div>
          </div>
          <Button onClick={() => setShowScanner(true)}>
            <Scan className="w-4 h-4 mr-2" />
            Scan Food
          </Button>
        </div>

        {/* Daily Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">{dailyGoals.calories.consumed}</p>
              <p className="text-xs text-gray-600">of {dailyGoals.calories.target} cal</p>
              <Progress value={(dailyGoals.calories.consumed / dailyGoals.calories.target) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">{dailyGoals.protein.consumed}g</p>
              <p className="text-xs text-gray-600">of {dailyGoals.protein.target}g</p>
              <Progress value={(dailyGoals.protein.consumed / dailyGoals.protein.target) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Apple className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">{dailyGoals.carbs.consumed}g</p>
              <p className="text-xs text-gray-600">of {dailyGoals.carbs.target}g</p>
              <Progress value={(dailyGoals.carbs.consumed / dailyGoals.carbs.target) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">{dailyGoals.fat.consumed}g</p>
              <p className="text-xs text-gray-600">of {dailyGoals.fat.target}g</p>
              <Progress value={(dailyGoals.fat.consumed / dailyGoals.fat.target) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-lg font-bold text-gray-900">{dailyGoals.water.consumed}</p>
              <p className="text-xs text-gray-600">of {dailyGoals.water.target} glasses</p>
              <Progress value={(dailyGoals.water.consumed / dailyGoals.water.target) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {showScanner ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <FoodScanner />
          </motion.div>
        ) : null}

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="scanner">Food Search</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Meals */}
              <div className="lg:col-span-2 space-y-4">
                {todayMeals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="flex items-center">
                            <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                            {meal.name}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {meal.time}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-600">{meal.calories} cal</p>
                          <Button size="sm" onClick={() => setSelectedMeal(meal.id)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Food
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {meal.items.length > 0 && (
                      <CardContent>
                        <div className="space-y-2">
                          {meal.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{item.name}</span>
                              <div className="text-xs text-gray-500">
                                {item.calories} cal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Water Intake */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                      Water Intake
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-1 mb-4">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-8 rounded-full border-2 ${
                            i < dailyGoals.water.consumed 
                              ? "bg-blue-500 border-blue-500" 
                              : "border-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-center text-gray-600 mb-3">
                      {dailyGoals.water.consumed} of {dailyGoals.water.target} glasses
                    </p>
                    <Button className="w-full" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Water
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Add */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Add</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Apple className="w-4 h-4 mr-2" />
                      Apple (80 cal)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Utensils className="w-4 h-4 mr-2" />
                      Banana (105 cal)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Droplets className="w-4 h-4 mr-2" />
                      Almonds (160 cal)
                    </Button>
                  </CardContent>
                </Card>

                {/* Daily Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Calories remaining</span>
                        <span className="font-semibold text-green-600">
                          {dailyGoals.calories.remaining}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein left</span>
                        <span className="font-semibold">{dailyGoals.protein.remaining}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbs left</span>
                        <span className="font-semibold">{dailyGoals.carbs.remaining}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fat left</span>
                        <span className="font-semibold">{dailyGoals.fat.remaining}g</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Food Search Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Food Database</CardTitle>
                <CardDescription>Search for foods and get detailed nutrition information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search for foods (e.g., chicken breast, apple, rice)..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodSuggestions.map((food, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{food.name}</h3>
                        <div className="text-sm text-gray-600 mb-3">
                          <p>{food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g</p>
                        </div>
                        
                        {/* Benefits */}
                        {food.benefits.length > 0 && (
                          <div className="mb-2">
                            <div className="flex flex-wrap gap-1">
                              {food.benefits.map((benefit, i) => (
                                <Badge key={i} className="bg-green-100 text-green-800 text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Warnings */}
                        {food.warnings.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {food.warnings.map((warning, i) => (
                                <Badge key={i} variant="destructive" className="text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  {warning}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Meal
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Calorie Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weeklyProgress.map((day) => (
                      <div key={day.day} className="flex items-center space-x-3">
                        <span className="w-8 text-sm text-gray-600">{day.day}</span>
                        <div className="flex-1">
                          <Progress value={(day.calories / 2000) * 100} />
                        </div>
                        <span className="w-16 text-sm text-right">{day.calories} cal</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Award className="w-3 h-3 mr-1" />
                              Unlocked!
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <Progress value={achievement.progress} />
                        <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Nutrition Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-900">Great protein intake!</p>
                          <p className="text-sm text-green-700">You've consistently met your protein goals this week.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900">Consider more fiber</p>
                          <p className="text-sm text-yellow-700">Adding more vegetables could improve your digestive health.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-900">Hydration on track</p>
                          <p className="text-sm text-blue-700">You're drinking enough water to stay properly hydrated.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nutritionTips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Goals</CardTitle>
                <CardDescription>Adjust your daily nutrition targets based on your health goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="calories-goal">Daily Calories Goal</Label>
                      <Input id="calories-goal" type="number" defaultValue="2000" />
                    </div>
                    <div>
                      <Label htmlFor="protein-goal">Protein Goal (g)</Label>
                      <Input id="protein-goal" type="number" defaultValue="150" />
                    </div>
                    <div>
                      <Label htmlFor="carbs-goal">Carbs Goal (g)</Label>
                      <Input id="carbs-goal" type="number" defaultValue="250" />
                    </div>
                    <div>
                      <Label htmlFor="fat-goal">Fat Goal (g)</Label>
                      <Input id="fat-goal" type="number" defaultValue="65" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="water-goal">Water Goal (glasses)</Label>
                      <Input id="water-goal" type="number" defaultValue="8" />
                    </div>
                    <div>
                      <Label htmlFor="activity-level">Activity Level</Label>
                      <select id="activity-level" className="w-full p-2 border rounded-md">
                        <option>Sedentary</option>
                        <option>Lightly Active</option>
                        <option>Moderately Active</option>
                        <option>Very Active</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="goal-type">Primary Goal</Label>
                      <select id="goal-type" className="w-full p-2 border rounded-md">
                        <option>Maintain Weight</option>
                        <option>Lose Weight</option>
                        <option>Gain Weight</option>
                        <option>Build Muscle</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">Save Goals</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}