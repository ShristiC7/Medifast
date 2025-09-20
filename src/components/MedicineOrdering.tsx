import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PulseLoader } from "./PulseLoader";
import { 
  Search, 
  ChevronLeft, 
  Upload, 
  MapPin, 
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Camera,
  Pill,
  Clock,
  Truck
} from "lucide-react";

interface MedicineOrderingProps {
  onBack: () => void;
}

export function MedicineOrdering({ onBack }: MedicineOrderingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [activeTab, setActiveTab] = useState("search");
  const [isUploading, setIsUploading] = useState(false);

  const handlePrescriptionUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Crocin",
      price: 25.50,
      originalPrice: 30.00,
      discount: 15,
      rating: 4.5,
      reviews: 234,
      prescription: false,
      inStock: true,
      category: "Pain Relief",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Vitamin D3 Tablets",
      brand: "HealthKart",
      price: 180.00,
      originalPrice: 220.00,
      discount: 18,
      rating: 4.3,
      reviews: 156,
      prescription: false,
      inStock: true,
      category: "Vitamins",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Metformin 500mg",
      brand: "Glycomet",
      price: 45.00,
      originalPrice: 45.00,
      discount: 0,
      rating: 4.6,
      reviews: 89,
      prescription: true,
      inStock: true,
      category: "Diabetes",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Omega-3 Capsules",
      brand: "Nature Made",
      price: 299.00,
      originalPrice: 350.00,
      discount: 15,
      rating: 4.4,
      reviews: 312,
      prescription: false,
      inStock: true,
      category: "Supplements",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop"
    }
  ];

  const nearbyPharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      distance: "0.8 km",
      rating: 4.5,
      deliveryTime: "15-20 min",
      isOpen: true
    },
    {
      id: 2,
      name: "MedPlus",
      distance: "1.2 km", 
      rating: 4.3,
      deliveryTime: "20-25 min",
      isOpen: true
    },
    {
      id: 3,
      name: "Wellness Forever",
      distance: "1.8 km",
      rating: 4.2,
      deliveryTime: "25-30 min",
      isOpen: false
    }
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--;
      } else {
        delete newCart[medicineId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const medicine = medicines.find(m => m.id === parseInt(id));
      return total + (medicine ? medicine.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-green-600 to-teal-600 px-6 pt-12 pb-6 text-white relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mt-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center">
            <motion.button 
              onClick={onBack}
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
              Order Medicines
            </motion.h1>
          </div>
          <AnimatePresence>
            {getCartItemCount() > 0 && (
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.button 
                  className="p-2 bg-white/20 rounded-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.3)",
                      "0 0 0 10px rgba(255,255,255,0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShoppingCart className="w-6 h-6" />
                </motion.button>
                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="text-xs font-medium">{getCartItemCount()}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex space-x-1 mb-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all relative z-10 ${
              activeTab === "search"
                ? "bg-white text-green-600"
                : "bg-white/20 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Search Medicines
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all relative z-10 ${
              activeTab === "upload"
                ? "bg-white text-green-600"
                : "bg-white/20 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Upload Prescription
          </motion.button>
        </motion.div>

        {/* Search Bar */}
        <AnimatePresence>
          {activeTab === "search" && (
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
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
                placeholder="Search medicines, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl bg-white border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/30"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="px-6 -mt-3 space-y-6">
        {activeTab === "search" ? (
          <>
            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {["All", "Pain Relief", "Vitamins", "Diabetes", "Supplements"].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-2xl whitespace-nowrap hover:bg-gray-50 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Medicine Grid */}
            <motion.div 
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {filteredMedicines.map((medicine, index) => (
                <motion.div
                  key={medicine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <Card className="p-4 shadow-md border-0 bg-white relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-50/50 to-transparent rounded-bl-2xl"
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    />
                    <div className="flex space-x-4">
                      <motion.div 
                        className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Pill className="w-8 h-8 text-gray-400" />
                      </motion.div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{medicine.name}</h4>
                          <p className="text-sm text-gray-600">{medicine.brand}</p>
                          {medicine.prescription && (
                            <Badge variant="outline" className="mt-1 text-orange-600 border-orange-200">
                              Prescription Required
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">{medicine.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">₹{medicine.price}</span>
                            {medicine.discount > 0 && (
                              <>
                                <span className="text-sm text-gray-500 line-through">₹{medicine.originalPrice}</span>
                                <Badge className="bg-green-100 text-green-700">
                                  {medicine.discount}% off
                                </Badge>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{medicine.reviews} reviews</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <AnimatePresence mode="wait">
                            {cart[medicine.id] ? (
                              <motion.div 
                                className="flex items-center space-x-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <motion.button
                                  onClick={() => removeFromCart(medicine.id)}
                                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                                  whileHover={{ scale: 1.1, backgroundColor: "#f87171" }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <motion.span 
                                  className="font-medium w-8 text-center"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.3 }}
                                  key={cart[medicine.id]}
                                >
                                  {cart[medicine.id]}
                                </motion.span>
                                <motion.button
                                  onClick={() => addToCart(medicine.id)}
                                  className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  onClick={() => addToCart(medicine.id)}
                                  className="px-4 h-9 rounded-2xl bg-green-600 hover:bg-green-700 relative overflow-hidden"
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                  />
                                  <span className="relative z-10">Add</span>
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          /* Upload Prescription Tab */
          <div className="space-y-6">
            <Card className="p-6 border-2 border-dashed border-gray-300 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Upload Your Prescription</h3>
              <p className="text-gray-600 mb-4">Upload a clear photo of your prescription for accurate medicine delivery</p>
              <div className="flex space-x-3 justify-center">
                <Button className="bg-green-600 hover:bg-green-700 rounded-2xl">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" className="rounded-2xl">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Recent Prescriptions</h3>
              <div className="space-y-3">
                <Card className="p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">Uploaded 2 days ago</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-2xl">
                      Reorder
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Nearby Pharmacies */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Nearby Pharmacies</h3>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {nearbyPharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{pharmacy.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {pharmacy.distance}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {pharmacy.rating}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {pharmacy.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={pharmacy.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                    {pharmacy.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <AnimatePresence>
        {getCartItemCount() > 0 && (
          <motion.div 
            className="fixed bottom-20 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-gray-200"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div 
              className="flex items-center justify-between mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <motion.p 
                  className="font-medium text-gray-900"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                  key={getCartItemCount()}
                >
                  {getCartItemCount()} items in cart
                </motion.p>
                <p className="text-sm text-gray-600">Total: ₹{getCartTotal().toFixed(2)}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-green-600 hover:bg-green-700 rounded-2xl px-6 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Checkout
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}