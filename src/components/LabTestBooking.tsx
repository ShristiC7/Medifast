import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  X,
  Camera,
  FileImage,
  Plus,
  ChevronRight,
  Navigation,
  Users,
  Award,
  Timer,
  CreditCard,
  TestTube,
  Droplets,
  Brain,
  Thermometer,
  Cpu,
  Eye,
  Dna,
  Target,
  Microscope,
  Beaker,
  TrendingUp,
  Pill
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LabTestBookingProps {
  onBack: () => void;
}

interface Lab {
  id: number;
  name: string;
  image: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  timing: string;
  isOpen: boolean;
  homeCollection: boolean;
  homeCollectionFee: number;
  phoneNumber: string;
  services: string[];
  certifications: string[];
  totalTests: number;
  discounts: string[];
  avgReportTime: string;
  established: string;
}

interface TestCategory {
  id: string;
  name: string;
  icon: any;
  tests: Test[];
  popularTests: string[];
}

interface Test {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  discount: number;
  reportTime: string;
  fasting: boolean;
  description: string;
  parameters: string[];
}

export function LabTestBooking({ onBack }: LabTestBookingProps) {
  const [activeTab, setActiveTab] = useState("tests");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [uploadedPrescription, setUploadedPrescription] = useState<File | null>(null);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comprehensive lab database with real Indian lab chains and local providers
  const labs: Lab[] = [
    {
      id: 1,
      name: "Quick Test Lab",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGRpYWdub3N0aWMlMjBjZW50ZXJ8ZW58MXx8fHwxNzU4NDQ3NTM1fDA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Shop 12, Central Market, Lajpat Nagar-2, Delhi",
      distance: "0.3 km",
      rating: 4.1,
      reviews: 89,
      timing: "7:00 AM - 8:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 50,
      phoneNumber: "+91-9876543200",
      services: ["Basic Blood Tests", "Urine Tests", "Blood Sugar", "Hemoglobin"],
      certifications: ["Licensed Lab", "Quality Approved"],
      totalTests: 150,
      discounts: ["Local resident discount", "Same day reports"],
      avgReportTime: "2-4 hours",
      established: "2018"
    },
    {
      id: 2,
      name: "City Diagnostic Center",
      image: "https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRob2xvZ3klMjBsYWIlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg0NDc1Mzh8MA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Ground Floor, Community Center, Janakpuri West, Delhi",
      distance: "0.7 km",
      rating: 3.9,
      reviews: 156,
      timing: "8:00 AM - 7:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 40,
      phoneNumber: "+91-9876543201",
      services: ["Blood Tests", "X-Ray", "ECG", "Health Checkups"],
      certifications: ["NABL", "Government Licensed"],
      totalTests: 300,
      discounts: ["Affordable pricing", "Senior citizen discount"],
      avgReportTime: "4-6 hours",
      established: "2015"
    },
    {
      id: 3,
      name: "Dr. Lal PathLabs",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGRpYWdub3N0aWMlMjBjZW50ZXJ8ZW58MXx8fHwxNTg0NDc1MzV8MA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Sector 18, Noida, Uttar Pradesh 201301",
      distance: "1.2 km",
      rating: 4.8,
      reviews: 1250,
      timing: "6:00 AM - 10:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 150,
      phoneNumber: "+91-011-40111333",
      services: ["Blood Tests", "Radiology", "Health Packages", "COVID-19 Testing"],
      certifications: ["NABL", "CAP", "ISO 15189"],
      totalTests: 2500,
      discounts: ["20% off on health packages", "Free home collection on orders above ₹500"],
      avgReportTime: "4-6 hours",
      established: "1995"
    },
    {
      id: 4,
      name: "New Life Diagnostic",
      image: "https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVzdCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU4NDQ3NTQ0fDA&ixlib=rb-4.1.0&q=80&w=400",
      address: "1st Floor, Local Market, Tilak Nagar, Delhi",
      distance: "1.5 km",
      rating: 4.0,
      reviews: 203,
      timing: "9:00 AM - 6:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 60,
      phoneNumber: "+91-9876543202",
      services: ["Blood Tests", "Thyroid Tests", "Liver Function", "Kidney Function"],
      certifications: ["Licensed Lab", "State Approved"],
      totalTests: 200,
      discounts: ["Package deals", "Family discounts"],
      avgReportTime: "6-8 hours",
      established: "2020"
    },
    {
      id: 5,
      name: "Metropolis Healthcare",
      image: "https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRob2xvZ3klMjBsYWIlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg0NDc1Mzh8MA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Connaught Place, New Delhi 110001",
      distance: "2.8 km",
      rating: 4.7,
      reviews: 980,
      timing: "7:00 AM - 9:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 200,
      phoneNumber: "+91-011-66977777",
      services: ["Pathology", "Imaging", "Genomics", "Wellness Packages"],
      certifications: ["NABL", "CAP", "ISO 15189", "ISO 27001"],
      totalTests: 3000,
      discounts: ["15% off on first order", "Loyalty program discounts"],
      avgReportTime: "2-4 hours",
      established: "1981"
    },
    {
      id: 6,
      name: "SRL Diagnostics",
      image: "https://images.unsplash.com/photo-1606206591513-adbfbdd7a177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVzdCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU4NDQ3NTQ0fDA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Greater Kailash, New Delhi 110048",
      distance: "3.5 km",
      rating: 4.6,
      reviews: 750,
      timing: "6:30 AM - 9:30 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 180,
      phoneNumber: "+91-011-39885050",
      services: ["Clinical Testing", "Molecular Diagnostics", "Histopathology"],
      certifications: ["NABL", "CAP", "ISO 15189"],
      totalTests: 2200,
      discounts: ["25% off on cardiac packages", "Free consultation"],
      avgReportTime: "3-5 hours",
      established: "1995"
    },
    {
      id: 7,
      name: "Wellness Diagnostic Lab",
      image: "https://images.unsplash.com/photo-1711343777918-6d395c16e37f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZGlhZ25vc3RpYyUyMGNlbnRlcnxlbnwxfHx8fDE3NTg0NDc1NDd8MA&ixlib=rb-4.1.0&q=80&w=400",
      address: "2nd Floor, DDA Market, Vasant Vihar, Delhi",
      distance: "3.8 km",
      rating: 4.2,
      reviews: 324,
      timing: "8:00 AM - 8:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 80,
      phoneNumber: "+91-9876543203",
      services: ["Complete Health Checkup", "Women's Health", "Cardiac Tests", "Diabetes Panel"],
      certifications: ["NABL", "Quality Certified"],
      totalTests: 400,
      discounts: ["Health package deals", "Corporate discounts"],
      avgReportTime: "8-12 hours",
      established: "2016"
    },
    {
      id: 8,
      name: "Thyrocare Technologies",
      image: "https://images.unsplash.com/photo-1711343777918-6d395c16e37f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZGlhZ25vc3RpYyUyMGNlbnRlcnxlbnwxfHx8fDE3NTg0NDc1NDd8MA&ixlib=rb-4.1.0&q=80&w=400",
      address: "Janakpuri, New Delhi 110058",
      distance: "4.1 km",
      rating: 4.5,
      reviews: 650,
      timing: "7:00 AM - 10:00 PM",
      isOpen: true,
      homeCollection: true,
      homeCollectionFee: 120,
      phoneNumber: "+91-022-30013000",
      services: ["Thyroid Testing", "Wellness Packages", "Preventive Health"],
      certifications: ["NABL", "CAP"],
      totalTests: 1800,
      discounts: ["30% off on thyroid packages", "Sunday special offers"],
      avgReportTime: "24 hours",
      established: "1996"
    }
  ];

  // Test categories with comprehensive test data
  const testCategories: TestCategory[] = [
    {
      id: "liver",
      name: "Liver Function Test",
      icon: Activity,
      popularTests: ["Liver Function Test", "SGPT/ALT", "SGOT/AST"],
      tests: [
        {
          id: "lft_basic",
          name: "Liver Function Test (Basic)",
          price: 800,
          discountedPrice: 600,
          discount: 25,
          reportTime: "4-6 hours",
          fasting: true,
          description: "Comprehensive liver function assessment",
          parameters: ["SGPT/ALT", "SGOT/AST", "Bilirubin", "ALP", "Total Protein", "Albumin"]
        },
        {
          id: "lft_comprehensive",
          name: "Liver Function Test (Comprehensive)",
          price: 1200,
          discountedPrice: 900,
          discount: 25,
          reportTime: "4-6 hours",
          fasting: true,
          description: "Complete liver health evaluation",
          parameters: ["SGPT/ALT", "SGOT/AST", "Bilirubin", "ALP", "GGT", "LDH", "Total Protein"]
        }
      ]
    },
    {
      id: "lipid",
      name: "Lipid Profile",
      icon: Heart,
      popularTests: ["Lipid Profile", "Cholesterol Test", "Triglycerides"],
      tests: [
        {
          id: "lipid_basic",
          name: "Lipid Profile (Basic)",
          price: 500,
          discountedPrice: 350,
          discount: 30,
          reportTime: "2-4 hours",
          fasting: true,
          description: "Complete cholesterol and lipid assessment",
          parameters: ["Total Cholesterol", "HDL", "LDL", "Triglycerides", "VLDL"]
        },
        {
          id: "lipid_advanced",
          name: "Advanced Lipid Profile",
          price: 900,
          discountedPrice: 720,
          discount: 20,
          reportTime: "4-6 hours",
          fasting: true,
          description: "Advanced cardiovascular risk assessment",
          parameters: ["Total Cholesterol", "HDL", "LDL", "Triglycerides", "Apo A1", "Apo B"]
        }
      ]
    },
    {
      id: "glucose",
      name: "Blood Glucose Test",
      icon: Droplets,
      popularTests: ["Fasting Blood Sugar", "HbA1c", "GTT"],
      tests: [
        {
          id: "fbs",
          name: "Fasting Blood Sugar",
          price: 150,
          discountedPrice: 100,
          discount: 33,
          reportTime: "1-2 hours",
          fasting: true,
          description: "Fasting glucose level measurement",
          parameters: ["Glucose (Fasting)"]
        },
        {
          id: "hba1c",
          name: "HbA1c (Glycated Hemoglobin)",
          price: 600,
          discountedPrice: 450,
          discount: 25,
          reportTime: "2-4 hours",
          fasting: false,
          description: "Average blood sugar over 2-3 months",
          parameters: ["HbA1c", "Average Glucose"]
        },
        {
          id: "gtt",
          name: "Glucose Tolerance Test",
          price: 400,
          discountedPrice: 300,
          discount: 25,
          reportTime: "3-4 hours",
          fasting: true,
          description: "Diabetes screening test",
          parameters: ["Fasting Glucose", "2hr Post Glucose"]
        }
      ]
    },
    {
      id: "thyroid",
      name: "Thyroid Function",
      icon: Thermometer,
      popularTests: ["T3 T4 TSH", "Free T3 T4", "Anti-TPO"],
      tests: [
        {
          id: "thyroid_basic",
          name: "Thyroid Profile (T3, T4, TSH)",
          price: 700,
          discountedPrice: 500,
          discount: 29,
          reportTime: "4-6 hours",
          fasting: false,
          description: "Basic thyroid function assessment",
          parameters: ["T3", "T4", "TSH"]
        },
        {
          id: "thyroid_free",
          name: "Free Thyroid Profile",
          price: 1000,
          discountedPrice: 750,
          discount: 25,
          reportTime: "4-6 hours",
          fasting: false,
          description: "Free hormone thyroid assessment",
          parameters: ["Free T3", "Free T4", "TSH"]
        }
      ]
    },
    {
      id: "kidney",
      name: "Kidney Function",
      icon: TestTube,
      popularTests: ["Kidney Function Test", "Creatinine", "Urea"],
      tests: [
        {
          id: "kft",
          name: "Kidney Function Test",
          price: 600,
          discountedPrice: 450,
          discount: 25,
          reportTime: "3-5 hours",
          fasting: false,
          description: "Complete kidney health evaluation",
          parameters: ["Urea", "Creatinine", "Uric Acid", "BUN"]
        }
      ]
    },
    {
      id: "cbc",
      name: "Complete Blood Count",
      icon: Droplets,
      popularTests: ["CBC", "Hemoglobin", "Platelet Count"],
      tests: [
        {
          id: "cbc_basic",
          name: "Complete Blood Count (CBC)",
          price: 300,
          discountedPrice: 200,
          discount: 33,
          reportTime: "2-3 hours",
          fasting: false,
          description: "Comprehensive blood cell analysis",
          parameters: ["Hemoglobin", "RBC", "WBC", "Platelets", "Hematocrit", "MCV", "MCH"]
        }
      ]
    },
    {
      id: "vitamin",
      name: "Vitamin Deficiency",
      icon: Pill,
      popularTests: ["Vitamin D", "Vitamin B12", "Folate"],
      tests: [
        {
          id: "vitamin_d",
          name: "Vitamin D (25-OH)",
          price: 800,
          discountedPrice: 600,
          discount: 25,
          reportTime: "24 hours",
          fasting: false,
          description: "Vitamin D deficiency screening",
          parameters: ["25-Hydroxy Vitamin D"]
        },
        {
          id: "vitamin_b12",
          name: "Vitamin B12",
          price: 900,
          discountedPrice: 700,
          discount: 22,
          reportTime: "24 hours",
          fasting: false,
          description: "Vitamin B12 level assessment",
          parameters: ["Vitamin B12"]
        }
      ]
    },
    {
      id: "cardiac",
      name: "Cardiac Markers",
      icon: Heart,
      popularTests: ["Troponin I", "CK-MB", "BNP"],
      tests: [
        {
          id: "troponin",
          name: "Troponin I",
          price: 1200,
          discountedPrice: 900,
          discount: 25,
          reportTime: "2-4 hours",
          fasting: false,
          description: "Heart attack marker",
          parameters: ["Troponin I"]
        }
      ]
    }
  ];

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPrescription(file);
      setShowPrescriptionUpload(false);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    alert("Camera functionality would open here");
  };

  const toggleTestSelection = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const filteredTests = testCategories.flatMap(category => 
    category.tests.filter(test => 
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const selectedCategoryData = testCategories.find(cat => cat.id === selectedCategory);

  const getTotalPrice = () => {
    return testCategories.flatMap(cat => cat.tests)
      .filter(test => selectedTests.includes(test.id))
      .reduce((total, test) => total + test.discountedPrice, 0);
  };

  const getTotalDiscount = () => {
    const originalPrice = testCategories.flatMap(cat => cat.tests)
      .filter(test => selectedTests.includes(test.id))
      .reduce((total, test) => total + test.price, 0);
    return originalPrice - getTotalPrice();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 pt-12 pb-6 text-white relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <motion.h1 
            className="text-xl font-medium ml-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Book Lab Tests
          </motion.h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for tests, packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl bg-white border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/30"
          />
          <motion.button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Upload Prescription Banner */}
      <motion.div 
        className="mx-6 -mt-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Upload Prescription</h4>
                <p className="text-sm text-gray-600">Get tests as per doctor's advice</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowPrescriptionUpload(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </motion.button>
          </div>
          
          {uploadedPrescription && (
            <motion.div 
              className="mt-4 p-3 bg-white rounded-xl border-2 border-dashed border-green-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">{uploadedPrescription.name}</span>
                <motion.button
                  onClick={() => setUploadedPrescription(null)}
                  className="ml-auto text-red-500 hover:text-red-600"
                  whileHover={{ scale: 1.1 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-teal-50 to-blue-50 border-2 border-teal-200 rounded-2xl p-1 shadow-md">
            <TabsTrigger 
              value="tests" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-teal-700 data-[state=inactive]:hover:bg-teal-100 rounded-xl font-medium transition-all duration-200 py-3"
            >
              Browse Tests
            </TabsTrigger>
            <TabsTrigger 
              value="labs" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-teal-700 data-[state=inactive]:hover:bg-teal-100 rounded-xl font-medium transition-all duration-200 py-3"
            >
              Nearby Labs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            {/* Test Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="font-medium text-gray-900 mb-4">Popular Test Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {testCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-teal-600 text-white border-teal-600 shadow-lg"
                        : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className={`w-8 h-8 mx-auto mb-2 ${
                      selectedCategory === category.id ? "text-white" : "text-teal-600"
                    }`} />
                    <h4 className="font-medium text-sm text-center">{category.name}</h4>
                    <p className="text-xs opacity-75 mt-1">
                      {category.tests.length} tests available
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Test Results */}
            <AnimatePresence>
              {selectedCategory && selectedCategoryData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{selectedCategoryData.name}</h3>
                    <motion.button
                      onClick={() => setSelectedCategory(null)}
                      className="text-gray-500 hover:text-gray-700"
                      whileHover={{ scale: 1.1 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {selectedCategoryData.tests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Checkbox
                                id={test.id}
                                checked={selectedTests.includes(test.id)}
                                onCheckedChange={() => toggleTestSelection(test.id)}
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">{test.name}</h4>
                                <p className="text-sm text-gray-600">{test.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {test.reportTime}
                              </span>
                              {test.fasting && (
                                <Badge variant="outline" className="text-xs">
                                  Fasting Required
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {test.parameters.slice(0, 3).map((param) => (
                                <Badge key={param} variant="secondary" className="text-xs">
                                  {param}
                                </Badge>
                              ))}
                              {test.parameters.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{test.parameters.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-medium text-gray-900">₹{test.discountedPrice}</span>
                                <span className="text-sm text-gray-500 line-through">₹{test.price}</span>
                              </div>
                              <Badge className="bg-green-100 text-green-700">
                                {test.discount}% OFF
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            {searchQuery && !selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="font-medium text-gray-900">Search Results ({filteredTests.length})</h3>
                {filteredTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={test.id}
                            checked={selectedTests.includes(test.id)}
                            onCheckedChange={() => toggleTestSelection(test.id)}
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{test.name}</h4>
                            <p className="text-sm text-gray-600">{test.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {test.reportTime}
                              </span>
                              {test.fasting && (
                                <Badge variant="outline" className="text-xs">
                                  Fasting Required
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-medium text-gray-900">₹{test.discountedPrice}</span>
                            <span className="text-sm text-gray-500 line-through">₹{test.price}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-700 mt-1">
                            {test.discount}% OFF
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="labs" className="space-y-6">
            {/* Nearby Labs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Nearby Labs</h3>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Change Location
                </Button>
              </div>
              
              <div className="space-y-4">
                {labs.map((lab, index) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <div className="space-y-4">
                        {/* Lab Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              <ImageWithFallback 
                                src={lab.image} 
                                alt={`${lab.name} laboratory`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{lab.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {lab.distance}
                                </span>
                                <span className="flex items-center">
                                  <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                                  {lab.rating} ({lab.reviews})
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {lab.timing}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{lab.address}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={lab.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                              {lab.isOpen ? "Open" : "Closed"}
                            </Badge>
                            {lab.homeCollection && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <Truck className="w-3 h-3 mr-1" />
                                Home Collection
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Lab Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <TestTube className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-600">{lab.totalTests}+ Tests</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Timer className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">{lab.avgReportTime}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-600">Est. {lab.established}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">{lab.phoneNumber}</span>
                          </div>
                        </div>

                        {/* Services */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Services</h5>
                          <div className="flex flex-wrap gap-2">
                            {lab.services.map((service) => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Certifications</h5>
                          <div className="flex flex-wrap gap-2">
                            {lab.certifications.map((cert) => (
                              <Badge key={cert} className="bg-green-100 text-green-700 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Offers */}
                        {lab.discounts.length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Current Offers</h5>
                            <div className="space-y-1">
                              {lab.discounts.map((discount, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm text-green-700">
                                  <Zap className="w-3 h-3" />
                                  <span>{discount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="text-sm text-gray-600">
                            {lab.homeCollection && (
                              <span>Home Collection: ₹{lab.homeCollectionFee}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Navigation className="w-4 h-4 mr-2" />
                              Directions
                            </Button>
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                              Select Lab
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Selected Tests Cart */}
      {selectedTests.length > 0 && (
        <motion.div 
          className="fixed bottom-20 left-0 right-0 mx-6 bg-white rounded-2xl shadow-lg border p-4 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{selectedTests.length} tests selected</h4>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600 font-medium">₹{getTotalPrice()}</span>
                <span className="text-gray-500 line-through">₹{getTotalPrice() + getTotalDiscount()}</span>
                <span className="text-green-600">You save ₹{getTotalDiscount()}</span>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              Book Now
            </Button>
          </div>
        </motion.div>
      )}

      {/* Prescription Upload Modal */}
      <AnimatePresence>
        {showPrescriptionUpload && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Upload Prescription</h3>
                <button
                  onClick={() => setShowPrescriptionUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  onClick={handleCameraCapture}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Camera className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
                    <span className="text-gray-600 group-hover:text-blue-600">Take Photo</span>
                  </div>
                </motion.button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <FileImage className="w-8 h-8 text-gray-400 group-hover:text-green-500" />
                    <span className="text-gray-600 group-hover:text-green-600">Choose from Gallery</span>
                  </div>
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Supported formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}