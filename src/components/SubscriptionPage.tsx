import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Star, Users, TrendingUp, Truck, Phone, Shield, Heart, Stethoscope, Activity, CreditCard, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { PaymentIntegration } from "./PaymentIntegration";

interface SubscriptionPageProps {
  onBack: () => void;
}

export function SubscriptionPage({ onBack }: SubscriptionPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'6month' | '12month'>('12month');
  const [showPayments, setShowPayments] = useState(false);

  const plans = {
    '6month': {
      duration: '6 Months',
      originalPrice: 2999,
      discountedPrice: 1999,
      monthlyEquivalent: 333,
      discount: 33,
      isRecommended: false
    },
    '12month': {
      duration: '12 Months', 
      originalPrice: 5999,
      discountedPrice: 2999,
      monthlyEquivalent: 250,
      discount: 50,
      isRecommended: true,
      freeHealthTest: true
    }
  };

  const membershipStats = [
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      value: "70L+",
      label: "Happy Members",
      color: "text-teal-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      value: "₹3,000",
      label: "Average Savings",
      color: "text-green-600"
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      value: "95%",
      label: "On-time Delivery",
      color: "text-blue-600"
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-12 h-12 text-teal-600" />,
      title: "15% Cashback",
      description: "Get 15% cashback on all medicine orders with instant refund",
      highlight: "Save up to ₹500/month"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Free Health Test",
      description: "Comprehensive health checkup including CBC, TSH & HbA1c",
      highlight: "Worth ₹499 - Absolutely Free"
    },
    {
      icon: <Phone className="w-12 h-12 text-blue-600" />,
      title: "Doctor on Call 24/7",
      description: "Unlimited consultations with verified doctors anytime",
      highlight: "No extra charges"
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: "1L Accidental Cover",
      description: "Comprehensive accidental insurance coverage",
      highlight: "Only with 12-month plan",
      isPremium: true
    }
  ];

  const memberReviews = [
    {
      name: "Priya Sharma",
      age: 34,
      location: "Mumbai",
      rating: 5,
      review: "Saved over ₹2,500 in just 3 months! The free health test was very comprehensive.",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar", 
      age: 45,
      location: "Delhi",
      rating: 5,
      review: "24/7 doctor consultation is a lifesaver. Very professional and quick responses.",
      avatar: "RK"
    },
    {
      name: "Meera Patel",
      age: 28,
      location: "Bangalore",
      rating: 5,
      review: "Best investment for family health. Medicine delivery is always on time!",
      avatar: "MP"
    }
  ];

  const handleJoinNow = () => {
    // Show payment integration instead of console log
    setShowPayments(true);
  };

  if (showPayments) {
    return (
      <PaymentIntegration 
        onBack={() => setShowPayments(false)} 
        currentPlan={selectedPlan}
        isSubscribed={false}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">MediFast Plus</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPayments(true)}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Payments
          </Button>
        </div>
      </div>

      {/* Hero Section - Plans */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Health Plan</h2>
          <p className="text-gray-600">Unlock premium healthcare benefits and save more</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {Object.entries(plans).map(([key, plan]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPlan === key 
                    ? 'ring-2 ring-teal-500 shadow-lg' 
                    : 'hover:shadow-md'
                } ${plan.isRecommended ? 'border-teal-300' : ''}`}
                onClick={() => setSelectedPlan(key as '6month' | '12month')}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-teal-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.duration}</h3>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-sm text-gray-500 line-through">₹{plan.originalPrice}</span>
                        <Badge variant="secondary" className="text-xs">
                          {plan.discount}% OFF
                        </Badge>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">₹{plan.discountedPrice}</div>
                      <div className="text-sm text-gray-600">₹{plan.monthlyEquivalent}/month</div>
                    </div>

                    {plan.freeHealthTest && (
                      <div className="mb-4">
                        <Badge className="bg-green-100 text-green-800 px-3 py-1">
                          + Free Health Test Worth ₹499
                        </Badge>
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        selectedPlan === key 
                          ? 'bg-teal-600 hover:bg-teal-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPlan === key ? 'Selected' : 'Select Plan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Membership Stats */}
      <div className="px-4 py-8 bg-white">
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
          Trusted by Millions
        </h3>
        
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {membershipStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-4 py-8">
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
          Premium Benefits
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        {benefit.title}
                        {benefit.isPremium && selectedPlan === '6month' && (
                          <Badge variant="outline" className="text-xs">
                            12M Only
                          </Badge>
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {benefit.description}
                      </p>
                      <div className="text-sm font-medium text-teal-600">
                        {benefit.highlight}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Reviews */}
      <div className="px-4 py-8 bg-white">
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
          What Our Members Say
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {memberReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-700 font-medium text-sm">
                        {review.avatar}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{review.name}</h5>
                      <p className="text-sm text-gray-600">Age {review.age}, {review.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{review.review}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900">
              {plans[selectedPlan].duration}
            </div>
            <div className="text-teal-600 font-bold">
              ₹{plans[selectedPlan].discountedPrice}
            </div>
          </div>
          
          <Button 
            onClick={handleJoinNow}
            className="bg-teal-600 hover:bg-teal-700 px-8 py-3 rounded-xl"
          >
            Join MediFast Plus
          </Button>
        </div>
      </div>
      
      {/* Extra spacing for sticky bar */}
      <div className="h-20" />
    </div>
  );
}