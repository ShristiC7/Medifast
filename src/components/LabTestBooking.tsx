import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Home,
  Building,
  FlaskConical,
  FileText,
  Download,
  Upload,
  CheckCircle,
  Heart,
  Activity,
  Zap,
  Shield,
  Truck,
  Phone,
  Filter,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LabTestBookingProps {
  onBack: () => void;
}

export function LabTestBooking({ onBack }: LabTestBookingProps) {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionType, setCollectionType] = useState("home");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const testCategories = [
    { name: "Blood Tests", count: 45, icon: Activity },
    { name: "Diabetes", count: 12, icon: Heart },
    { name: "Thyroid", count: 8, icon: Zap },
    { name: "Kidney Function", count: 10, icon: Shield },
    { name: "Liver Function", count: 15, icon: Activity },
    { name: "Cardiac", count: 18, icon: Heart }
  ];

  const popularTests = [
    {
      id: "1",
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis including RBC, WBC, platelets",
      price: 299,
      originalPrice: 450,
      duration: "6-8 hours",
      fasting: true,
      rating: 4.8,
      bookings: 2840
    },
    {
      id: "2", 
      name: "Lipid Profile",
      description: "Cholesterol, triglycerides, HDL, LDL analysis",
      price: 599,
      originalPrice: 800,
      duration: "12-14 hours",
      fasting: true,
      rating: 4.9,
      bookings: 1920
    },
    {
      id: "3",
      name: "Thyroid Function Test (TSH, T3, T4)",
      description: "Complete thyroid hormone analysis",
      price: 450,
      originalPrice: 650,
      duration: "4-6 hours",
      fasting: false,
      rating: 4.7,
      bookings: 1560
    },
    {
      id: "4",
      name: "HbA1c (Diabetes)",
      description: "3-month average blood sugar level",
      price: 350,
      originalPrice: 500,
      duration: "2-4 hours",
      fasting: false,
      rating: 4.8,
      bookings: 2100
    }
  ];

  const healthPackages = [
    {
      id: "basic",
      name: "Basic Health Checkup",
      description: "Essential tests for general health monitoring",
      tests: ["CBC", "Blood Sugar", "Lipid Profile", "Kidney Function"],
      price: 1299,
      originalPrice: 2000,
      duration: "6-8 hours",
      popular: false
    },
    {
      id: "comprehensive",
      name: "Comprehensive Health Package",
      description: "Detailed health analysis with 45+ parameters",
      tests: ["CBC", "Lipid Profile", "Liver Function", "Kidney Function", "Thyroid", "Vitamin D", "B12"],
      price: 2499,
      originalPrice: 3500,
      duration: "12-14 hours",
      popular: true
    },
    {
      id: "cardiac",
      name: "Cardiac Care Package",
      description: "Specialized tests for heart health monitoring",
      tests: ["ECG", "Lipid Profile", "Cardiac Enzymes", "CRP", "Homocysteine"],
      price: 1899,
      originalPrice: 2800,
      duration: "8-10 hours",
      popular: false
    }
  ];

  const recentReports = [
    {
      id: "1",
      testName: "Complete Blood Count",
      date: "Dec 15, 2024",
      status: "Ready",
      reportUrl: "#"
    },
    {
      id: "2",
      testName: "Lipid Profile",
      date: "Nov 28, 2024", 
      status: "Ready",
      reportUrl: "#"
    },
    {
      id: "3",
      testName: "Thyroid Function",
      date: "Nov 10, 2024",
      status: "Processing",
      reportUrl: null
    }
  ];

  const handleTestSelection = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const handleBookTest = () => {
    // Handle booking logic here
    console.log("Booking tests:", selectedTests);
  };

  const getTotalPrice = () => {
    return selectedTests.reduce((total, testId) => {
      const test = popularTests.find(t => t.id === testId);
      return total + (test?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100 sticky top-0 z-50"
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
              <h1 className="text-xl font-semibold text-gray-900">Lab Tests</h1>
              <p className="text-sm text-gray-600">Book tests & get reports online</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}
        >
          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Collection Type */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Collection Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="home"
                      checked={collectionType === "home"}
                      onCheckedChange={() => setCollectionType("home")}
                    />
                    <Label htmlFor="home" className="text-sm flex items-center gap-2">
                      <Home className="w-4 h-4 text-teal-600" />
                      Home Collection
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lab"
                      checked={collectionType === "lab"}
                      onCheckedChange={() => setCollectionType("lab")}
                    />
                    <Label htmlFor="lab" className="text-sm flex items-center gap-2">
                      <Building className="w-4 h-4 text-teal-600" />
                      Visit Lab
                    </Label>
                  </div>
                </div>
              </div>

              {/* Test Categories */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Categories</Label>
                <div className="space-y-2">
                  {testCategories.map((category, index) => (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-teal-600" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Price Range</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="under500" />
                    <Label htmlFor="under500" className="text-sm">Under ₹500</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="500-1000" />
                    <Label htmlFor="500-1000" className="text-sm">₹500 - ₹1000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="above1000" />
                    <Label htmlFor="above1000" className="text-sm">Above ₹1000</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="browse">Browse Tests</TabsTrigger>
                <TabsTrigger value="packages">Health Packages</TabsTrigger>
                <TabsTrigger value="reports">My Reports</TabsTrigger>
              </TabsList>

              {/* Browse Tests Tab */}
              <TabsContent value="browse" className="space-y-6">
                {/* Search Bar */}
                <Card className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search for tests (e.g., CBC, Thyroid, Diabetes)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </Card>

                {/* Popular Tests */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Tests</h2>
                  <div className="grid gap-4">
                    {popularTests.map((test, index) => (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`p-6 transition-all duration-300 hover:shadow-lg border ${
                          selectedTests.includes(test.id) ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start gap-4">
                                <Checkbox
                                  checked={selectedTests.includes(test.id)}
                                  onCheckedChange={() => handleTestSelection(test.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 mb-2">{test.name}</h3>
                                  <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                                  
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {test.duration}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      {test.rating}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <FlaskConical className="w-4 h-4" />
                                      {test.bookings} bookings
                                    </div>
                                  </div>

                                  {test.fasting && (
                                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                                      Fasting Required
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right ml-4">
                              <div className="text-lg font-semibold text-gray-900">
                                ₹{test.price}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                ₹{test.originalPrice}
                              </div>
                              <div className="text-sm text-green-600">
                                {Math.round((1 - test.price / test.originalPrice) * 100)}% off
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Health Packages Tab */}
              <TabsContent value="packages" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Packages</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {healthPackages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <Card className={`p-6 h-full transition-all duration-300 hover:shadow-lg relative ${
                          selectedPackage === pkg.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                        }`}>
                          {pkg.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500">
                              Most Popular
                            </Badge>
                          )}
                          
                          <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                          </div>

                          <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-2">Includes:</div>
                            <div className="flex flex-wrap gap-1">
                              {pkg.tests.map((test, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {test}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-xl font-semibold text-gray-900">
                                ₹{pkg.price}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                ₹{pkg.originalPrice}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {pkg.duration}
                            </div>
                          </div>

                          <Button 
                            className="w-full"
                            variant={selectedPackage === pkg.id ? "default" : "outline"}
                            onClick={() => setSelectedPackage(pkg.id)}
                          >
                            {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                          </Button>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* My Reports Tab */}
              <TabsContent value="reports" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
                  <div className="space-y-4">
                    {recentReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-teal-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{report.testName}</h3>
                                <p className="text-sm text-gray-500">{report.date}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={report.status === "Ready" ? "default" : "secondary"}
                                className={report.status === "Ready" ? "bg-green-100 text-green-800" : ""}
                              >
                                {report.status}
                              </Badge>
                              {report.reportUrl && (
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Upload Prescription */}
                <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Upload Prescription</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your prescription to get tests recommended</p>
                    <p className="text-sm text-gray-500 mb-4">Supports PDF, JPG, PNG files</p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      {/* Floating Cart */}
      <AnimatePresence>
        {(selectedTests.length > 0 || selectedPackage) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-4 right-4 z-40"
          >
            <Card className="p-4 bg-white shadow-2xl border-teal-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedTests.length} test{selectedTests.length !== 1 ? 's' : ''} selected
                    {selectedPackage && " + 1 package"}
                  </p>
                  <p className="text-lg font-semibold text-teal-600">
                    Total: ₹{getTotalPrice() + (selectedPackage ? healthPackages.find(p => p.id === selectedPackage)?.price || 0 : 0)}
                  </p>
                </div>
                <Button onClick={handleBookTest} className="bg-gradient-to-r from-teal-600 to-blue-600">
                  Book Now
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}