import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PulseLoader } from "./PulseLoader";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  ChevronLeft,
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
  Pill,
  Microscope,
  User,
  Zap,
  Shield,
  Droplets,
  Scissors,
  Bug,
  FlaskConical,
  Smile,
  Syringe,
  Sparkles,
  Leaf,
  ChevronRight,
  Plus,
  Thermometer,
  Waves,
  CircleDot,
  Scan,
  Dna,
  TestTube,
  Bandage,
  Timer,
  Glasses,
  Tablets,
  Cross,
  Cpu,
  Target,
  HeadphonesIcon,
  MousePointer2,
  FlaskRound,
  ArrowLeft
} from "lucide-react";

interface DoctorSearchProps {
  onBack: () => void;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  specialtyId: string;
  rating: number;
  experience: number;
  hospital: string;
  distance: string;
  nextSlot: string;
  fee: number;
  image: string;
  qualification: string;
  languages: string[];
  availableToday: boolean;
}

export function DoctorSearch({ onBack }: DoctorSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [viewMode, setViewMode] = useState<"specialties" | "doctors">("specialties");

  // Simulate loading when search changes
  useEffect(() => {
    if (searchQuery || selectedSpecialty) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, selectedSpecialty]);

  const toggleFavorite = (doctorId: number) => {
    setFavorites(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  const specialties = [
    { id: "general", name: "General Physician", icon: Thermometer },
    { id: "obstetrics", name: "Obstetrics & Gynaecology", icon: Baby },
    { id: "orthopedics", name: "Orthopaedics", icon: Bone },
    { id: "neurology", name: "Neurology", icon: Brain },
    { id: "cardiology", name: "Cardiology", icon: Heart },
    { id: "urology", name: "Urology", icon: Droplets },
    { id: "gastroenterology", name: "Gastroenterology", icon: CircleDot },
    { id: "psychiatry", name: "Psychiatry", icon: HeadphonesIcon },
    { id: "pulmonology", name: "Pulmonology", icon: Waves },
    { id: "endocrinology", name: "Endocrinology", icon: Dna },
    { id: "nephrology", name: "Nephrology", icon: FlaskRound },
    { id: "neurosurgery", name: "Neurosurgery", icon: Cpu },
    { id: "rheumatology", name: "Rheumatology", icon: Activity },
    { id: "surgical-gastro", name: "Surgical Gastroenterology", icon: Scissors },
    { id: "infectious", name: "Infectious Disease", icon: Bug },
    { id: "general-surgery", name: "General & Laparoscopic", icon: Bandage },
    { id: "psychology", name: "Psychology", icon: Smile },
    { id: "oncology", name: "Medical Oncology", icon: Target },
    { id: "diabetology", name: "Diabetology", icon: Tablets },
    { id: "dentist", name: "Dentist", icon: Cross },
    { id: "allergist", name: "Allergist & Clinical", icon: Shield },
    { id: "anaesthesia", name: "Anaesthesia", icon: Syringe },
    { id: "andrology", name: "Andrology", icon: Stethoscope },
    { id: "ayurvedic", name: "Ayurvedic", icon: Leaf },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
    { id: "dermatology", name: "Dermatology", icon: Sparkles },
    { id: "pediatrics", name: "Pediatrics", icon: Baby },
    { id: "ent", name: "ENT", icon: HeadphonesIcon }
  ];

  // Comprehensive doctor database with real names and specialties including local providers
  const allDoctors: Doctor[] = [
    // General Physicians - Mix of local and premium
    { id: 1, name: "Dr. Suresh Kumar", specialty: "General Physician", specialtyId: "general", rating: 4.2, experience: 8, hospital: "Local Health Clinic", distance: "0.3 km", nextSlot: "Today 2:30 PM", fee: 200, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS", languages: ["Hindi", "English"], availableToday: true },
    { id: 2, name: "Dr. Rajesh Kumar", specialty: "General Physician", specialtyId: "general", rating: 4.8, experience: 15, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Today 2:30 PM", fee: 500, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi"], availableToday: true },
    { id: 3, name: "Dr. Priya Sharma", specialty: "General Physician", specialtyId: "general", rating: 4.7, experience: 12, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Today 4:00 PM", fee: 450, image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi", "Tamil"], availableToday: true },
    { id: 4, name: "Dr. Ravi Gupta", specialty: "General Physician", specialtyId: "general", rating: 4.0, experience: 5, hospital: "Community Health Center", distance: "0.7 km", nextSlot: "Today 5:00 PM", fee: 150, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS", languages: ["Hindi", "English"], availableToday: true },
    { id: 5, name: "Dr. Anil Gupta", specialty: "General Physician", specialtyId: "general", rating: 4.6, experience: 18, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Tomorrow 10:00 AM", fee: 600, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi"], availableToday: false },

    // Cardiologists - Mix of local and specialist
    { id: 6, name: "Dr. Suresh Reddy", specialty: "Cardiologist", specialtyId: "cardiology", rating: 4.9, experience: 22, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Today 3:15 PM", fee: 1200, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM Cardiology", languages: ["English", "Hindi", "Telugu"], availableToday: true },
    { id: 7, name: "Dr. Ramesh Gupta", specialty: "Cardiologist", specialtyId: "cardiology", rating: 4.1, experience: 6, hospital: "City Heart Clinic", distance: "1.2 km", nextSlot: "Today 6:00 PM", fee: 400, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["Hindi", "English"], availableToday: true },
    { id: 8, name: "Dr. Kavitha Menon", specialty: "Cardiologist", specialtyId: "cardiology", rating: 4.8, experience: 16, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Tomorrow 11:00 AM", fee: 1000, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM", languages: ["English", "Hindi", "Malayalam"], availableToday: false },
    { id: 9, name: "Dr. Vikram Singh", specialty: "Cardiologist", specialtyId: "cardiology", rating: 4.7, experience: 20, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Today 5:30 PM", fee: 1100, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM", languages: ["English", "Hindi", "Punjabi"], availableToday: true },

    // Neurologists - Including local specialists  
    { id: 10, name: "Dr. Ravi Krishnan", specialty: "Neurologist", specialtyId: "neurology", rating: 4.9, experience: 18, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 2:00 PM", fee: 1000, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM Neurology", languages: ["English", "Hindi", "Tamil"], availableToday: true },
    { id: 11, name: "Dr. Shiv Kumar", specialty: "Neurologist", specialtyId: "neurology", rating: 4.0, experience: 7, hospital: "Neuro Care Clinic", distance: "1.5 km", nextSlot: "Today 4:30 PM", fee: 500, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["Hindi", "English"], availableToday: true },
    { id: 12, name: "Dr. Meera Jain", specialty: "Neurologist", specialtyId: "neurology", rating: 4.8, experience: 14, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Tomorrow 9:30 AM", fee: 1200, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM", languages: ["English", "Hindi"], availableToday: false },

    // Orthopedic Surgeons - Including local bone specialists
    { id: 13, name: "Dr. Mohan Singh", specialty: "Orthopedic Surgeon", specialtyId: "orthopedics", rating: 3.9, experience: 4, hospital: "Bone Care Clinic", distance: "0.9 km", nextSlot: "Today 3:00 PM", fee: 300, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS", languages: ["Hindi", "English"], availableToday: true },
    { id: 14, name: "Dr. Amit Patel", specialty: "Orthopedic Surgeon", specialtyId: "orthopedics", rating: 4.8, experience: 25, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Today 4:45 PM", fee: 900, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS Orthopedics", languages: ["English", "Hindi", "Gujarati"], availableToday: true },
    { id: 15, name: "Dr. Sunita Rao", specialty: "Orthopedic Surgeon", specialtyId: "orthopedics", rating: 4.7, experience: 16, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Tomorrow 2:15 PM", fee: 800, image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS", languages: ["English", "Hindi", "Kannada"], availableToday: false },

    // Gynecologists - Including local women's health providers
    { id: 16, name: "Dr. Sunita Devi", specialty: "Gynecologist", specialtyId: "obstetrics", rating: 4.1, experience: 8, hospital: "Women's Health Center", distance: "0.6 km", nextSlot: "Today 1:30 PM", fee: 250, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, DGO", languages: ["Hindi", "English"], availableToday: true },
    { id: 17, name: "Dr. Reena Agarwal", specialty: "Gynecologist", specialtyId: "obstetrics", rating: 4.9, experience: 20, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 3:00 PM", fee: 700, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Obstetrics & Gynecology", languages: ["English", "Hindi"], availableToday: true },
    { id: 18, name: "Dr. Shalini Verma", specialty: "Gynecologist", specialtyId: "obstetrics", rating: 4.8, experience: 15, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Today 5:00 PM", fee: 800, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi"], availableToday: true },

    // Pediatricians - Including local child specialists
    { id: 19, name: "Dr. Raj Kumar", specialty: "Pediatrician", specialtyId: "pediatrics", rating: 4.0, experience: 6, hospital: "Child Care Clinic", distance: "0.8 km", nextSlot: "Today 11:00 AM", fee: 200, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, DCH", languages: ["Hindi", "English"], availableToday: true },
    { id: 20, name: "Dr. Kiran Malhotra", specialty: "Pediatrician", specialtyId: "pediatrics", rating: 4.8, experience: 14, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Today 1:30 PM", fee: 600, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Pediatrics", languages: ["English", "Hindi"], availableToday: true },
    { id: 21, name: "Dr. Anjali Saxena", specialty: "Pediatrician", specialtyId: "pediatrics", rating: 4.7, experience: 12, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Tomorrow 11:30 AM", fee: 550, image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi"], availableToday: false },

    // Dermatologists - Including local skin specialists
    { id: 22, name: "Dr. Sanjay Gupta", specialty: "Dermatologist", specialtyId: "dermatology", rating: 4.0, experience: 5, hospital: "Skin Care Center", distance: "1.1 km", nextSlot: "Today 2:15 PM", fee: 300, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, DVD", languages: ["Hindi", "English"], availableToday: true },
    { id: 23, name: "Dr. Rohit Kapoor", specialty: "Dermatologist", specialtyId: "dermatology", rating: 4.7, experience: 13, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 4:00 PM", fee: 700, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Dermatology", languages: ["English", "Hindi"], availableToday: true },
    { id: 24, name: "Dr. Neha Gupta", specialty: "Dermatologist", specialtyId: "dermatology", rating: 4.8, experience: 11, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Tomorrow 10:30 AM", fee: 650, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi"], availableToday: false },

    // Ophthalmologists
    { id: 17, name: "Dr. Manoj Agrawal", specialty: "Ophthalmologist", specialtyId: "ophthalmology", rating: 4.8, experience: 17, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Today 2:45 PM", fee: 800, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS Ophthalmology", languages: ["English", "Hindi"], availableToday: true },
    { id: 18, name: "Dr. Pooja Bansal", specialty: "Ophthalmologist", specialtyId: "ophthalmology", rating: 4.7, experience: 12, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Tomorrow 3:00 PM", fee: 700, image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS", languages: ["English", "Hindi"], availableToday: false },

    // Psychiatrists
    { id: 19, name: "Dr. Arjun Mehta", specialty: "Psychiatrist", specialtyId: "psychiatry", rating: 4.9, experience: 16, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 6:00 PM", fee: 1000, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Psychiatry", languages: ["English", "Hindi"], availableToday: true },
    { id: 20, name: "Dr. Simran Kaur", specialty: "Psychiatrist", specialtyId: "psychiatry", rating: 4.8, experience: 14, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Tomorrow 4:30 PM", fee: 900, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD", languages: ["English", "Hindi", "Punjabi"], availableToday: false },

    // ENT Specialists
    { id: 21, name: "Dr. Rajiv Sinha", specialty: "ENT Specialist", specialtyId: "ent", rating: 4.7, experience: 15, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Today 3:30 PM", fee: 650, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS ENT", languages: ["English", "Hindi"], availableToday: true },
    { id: 22, name: "Dr. Shweta Joshi", specialty: "ENT Specialist", specialtyId: "ent", rating: 4.6, experience: 11, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Tomorrow 1:00 PM", fee: 700, image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS", languages: ["English", "Hindi"], availableToday: false },

    // Urologists
    { id: 23, name: "Dr. Deepak Chandra", specialty: "Urologist", specialtyId: "urology", rating: 4.8, experience: 19, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 5:15 PM", fee: 900, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS Urology", languages: ["English", "Hindi"], availableToday: true },
    { id: 24, name: "Dr. Varun Jain", specialty: "Urologist", specialtyId: "urology", rating: 4.7, experience: 13, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Tomorrow 2:00 PM", fee: 800, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MS", languages: ["English", "Hindi"], availableToday: false },

    // Gastroenterologists
    { id: 25, name: "Dr. Sandeep Gulati", specialty: "Gastroenterologist", specialtyId: "gastroenterology", rating: 4.8, experience: 18, hospital: "Max Hospital", distance: "1.8 km", nextSlot: "Today 1:45 PM", fee: 1000, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM Gastroenterology", languages: ["English", "Hindi"], availableToday: true },
    { id: 26, name: "Dr. Ritu Malhotra", specialty: "Gastroenterologist", specialtyId: "gastroenterology", rating: 4.7, experience: 15, hospital: "AIIMS Delhi", distance: "4.5 km", nextSlot: "Tomorrow 11:15 AM", fee: 1100, image: "https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD, DM", languages: ["English", "Hindi"], availableToday: false },

    // Pulmonologists
    { id: 27, name: "Dr. Ashok Kumar", specialty: "Pulmonologist", specialtyId: "pulmonology", rating: 4.7, experience: 16, hospital: "Fortis Hospital", distance: "3.2 km", nextSlot: "Today 4:30 PM", fee: 850, image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Pulmonology", languages: ["English", "Hindi"], availableToday: true },

    // Endocrinologists
    { id: 28, name: "Dr. Neeraj Agarwal", specialty: "Endocrinologist", specialtyId: "endocrinology", rating: 4.8, experience: 14, hospital: "Apollo Hospital", distance: "2.1 km", nextSlot: "Tomorrow 10:00 AM", fee: 900, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=300&h=300&fit=crop&crop=face", qualification: "MBBS, MD Endocrinology", languages: ["English", "Hindi"], availableToday: false },

    // Dentists
    { id: 29, name: "Dr. Kavita Sharma", specialty: "Dentist", specialtyId: "dentist", rating: 4.6, experience: 10, hospital: "Max Dental Clinic", distance: "1.2 km", nextSlot: "Today 2:00 PM", fee: 400, image: "https://images.unsplash.com/photo-1594824694996-73e4ac83c00f?w=300&h=300&fit=crop&crop=face", qualification: "BDS, MDS", languages: ["English", "Hindi"], availableToday: true },
    { id: 30, name: "Dr. Raghav Gupta", specialty: "Dentist", specialtyId: "dentist", rating: 4.7, experience: 12, hospital: "Apollo Dental", distance: "2.5 km", nextSlot: "Today 5:00 PM", fee: 500, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face", qualification: "BDS, MDS", languages: ["English", "Hindi"], availableToday: true }
  ];

  // Show first 12 specialties initially, all when expanded
  const displayedSpecialties = showAllSpecialties ? specialties : specialties.slice(0, 12);

  const filteredDoctors = allDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" ||
                           doctor.specialtyId === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleSpecialtyClick = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setViewMode("doctors");
  };

  const handleBackToSpecialties = () => {
    setSelectedSpecialty("");
    setViewMode("specialties");
  };

  const getSelectedSpecialtyName = () => {
    const specialty = specialties.find(s => s.id === selectedSpecialty);
    return specialty ? specialty.name : "";
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 pt-12 pb-6 text-white relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated background */}
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
            onClick={viewMode === "doctors" ? handleBackToSpecialties : onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.h1 
            className="text-xl font-medium ml-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {viewMode === "doctors" ? getSelectedSpecialtyName() : "Find Doctors"}
          </motion.h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            animate={searchQuery ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Search className="w-5 h-5 text-gray-400" />
          </motion.div>
          <Input
            type="text"
            placeholder={viewMode === "doctors" ? "Search doctors..." : "Search doctors, specialties..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl bg-white border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/30"
          />
          <motion.button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Filter className="w-5 h-5 text-gray-400" />
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="px-6 -mt-3 space-y-6">
        {viewMode === "specialties" ? (
          /* Browse by Specialities - Modern Grid Layout */
          <motion.div 
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h3 
              className="font-medium text-gray-900 mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Browse by Specialities
            </motion.h3>
            
            {/* Specialties Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              {displayedSpecialties.map((specialty, index) => (
                <motion.button
                  key={specialty.id}
                  onClick={() => handleSpecialtyClick(specialty.id)}
                  className={`group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                    selectedSpecialty === specialty.id
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                      : "bg-gray-50 text-gray-700 hover:bg-teal-50 hover:shadow-md"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.05, 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200 
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm transition-all duration-300 ${
                      selectedSpecialty === specialty.id
                        ? "bg-white/20 text-white"
                        : "bg-white text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
                    }`}
                    whileHover={{ rotate: 12 }}
                  >
                    <specialty.icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {specialty.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Browse All Specialities Button */}
            {!showAllSpecialties && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <motion.button
                  onClick={() => setShowAllSpecialties(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-teal-50 text-teal-700 rounded-2xl hover:bg-teal-100 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Browse All Specialities</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}

            {showAllSpecialties && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  onClick={() => setShowAllSpecialties(false)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Show Less</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <>
            {/* Results Header */}
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <motion.h3 
                className="font-medium text-gray-900"
                animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <PulseLoader size="sm" />
                    <span>Searching...</span>
                  </div>
                ) : (
                  `${filteredDoctors.length} doctors available`
                )}
              </motion.h3>
              <motion.button 
                className="text-teal-600 hover:text-teal-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sort by rating
              </motion.button>
            </motion.div>

            {/* Doctor Cards */}
            <AnimatePresence>
              <div className="space-y-4">
                {isLoading ? (
                  // Loading skeletons
                  [...Array(3)].map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Card className="p-4 shadow-md border-0 bg-white">
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 bg-gray-200 rounded-2xl animate-pulse" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                            <div className="h-8 bg-gray-200 rounded animate-pulse w-20 mt-4" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  filteredDoctors.map((doctor, index) => (
                    <motion.div
                      key={doctor.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        y: -2
                      }}
                    >
                      <Card className="p-4 shadow-md border-0 bg-white cursor-pointer relative overflow-hidden">
                        <motion.div
                          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-50/50 to-transparent rounded-bl-3xl"
                          initial={{ scale: 0, rotate: 45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        />
                        <div className="flex space-x-4">
                          <div className="relative">
                            <motion.img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-20 h-20 rounded-2xl object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            />
                            {doctor.availableToday && (
                              <motion.div 
                                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
                                animate={{ 
                                  boxShadow: [
                                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                                    "0 0 0 6px rgba(34, 197, 94, 0)",
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                <p className="text-xs text-gray-500">{doctor.qualification}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  onClick={() => toggleFavorite(doctor.id)}
                                  className={`p-1 rounded-full transition-colors ${
                                    favorites.includes(doctor.id) 
                                      ? "text-red-500" 
                                      : "text-gray-400 hover:text-red-500"
                                  }`}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <motion.div
                                    animate={favorites.includes(doctor.id) ? { scale: [1, 1.3, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Heart className={`w-4 h-4 ${
                                      favorites.includes(doctor.id) ? "fill-current" : ""
                                    }`} />
                                  </motion.div>
                                </motion.button>
                                <motion.div 
                                  className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="font-medium text-yellow-700">{doctor.rating}</span>
                                </motion.div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <Stethoscope className="w-4 h-4 mr-2" />
                                <span>{doctor.experience} years experience</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{doctor.hospital} • {doctor.distance}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>Next available: {doctor.nextSlot}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">💬</span>
                                <span>Speaks: {doctor.languages.join(", ")}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium text-gray-900">₹{doctor.fee}</span>
                                <span className="text-sm text-gray-600 ml-1">consultation</span>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button className="px-6 h-9 rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 relative overflow-hidden">
                                  <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                  />
                                  <span className="relative z-10">Book</span>
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>

            {/* Quick Book Emergency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-900">Emergency Consultation</h4>
                    <p className="text-sm text-red-700">Available 24/7 for urgent care</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-2xl">
                      Book Now
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}