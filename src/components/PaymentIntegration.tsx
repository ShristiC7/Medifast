import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CreditCard, Wallet, Smartphone, Building2, Shield, CheckCircle, AlertCircle, Plus, Trash2, Edit, Eye, EyeOff, Copy, RefreshCw, Download, Calendar, Receipt, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";

interface PaymentIntegrationProps {
  onBack: () => void;
  currentPlan?: string;
  isSubscribed?: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
  lastUsed?: Date;
  icon: string;
}

interface Transaction {
  id: string;
  type: 'subscription' | 'medicine' | 'consultation' | 'lab_test' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: Date;
  description: string;
  paymentMethod: string;
  referenceId: string;
}

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
}

export function PaymentIntegration({ onBack, currentPlan = "trial", isSubscribed = false }: PaymentIntegrationProps) {
  const [activeTab, setActiveTab] = useState("methods");
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1250);

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "HDFC Credit Card",
      details: "**** **** **** 4532",
      isDefault: true,
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: "💳"
    },
    {
      id: "2",
      type: "upi",
      name: "PhonePe UPI",
      details: "rajesh@paytm",
      isDefault: false,
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      icon: "📱"
    },
    {
      id: "3",
      type: "wallet",
      name: "Paytm Wallet",
      details: "Balance: ₹850",
      isDefault: false,
      lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      icon: "👛"
    }
  ]);

  // Transaction History
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "subscription",
      amount: 2999,
      status: "completed",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      description: "MediFast Plus - 12 Months",
      paymentMethod: "HDFC Credit Card",
      referenceId: "TXN001234567890"
    },
    {
      id: "2",
      type: "medicine",
      amount: 485,
      status: "completed",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      description: "Medicine Order #MED001",
      paymentMethod: "PhonePe UPI",
      referenceId: "TXN001234567891"
    },
    {
      id: "3",
      type: "consultation",
      amount: 300,
      status: "completed",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      description: "Dr. Priya Sharma - Cardiology",
      paymentMethod: "Paytm Wallet",
      referenceId: "TXN001234567892"
    },
    {
      id: "4",
      type: "lab_test",
      amount: 1200,
      status: "pending",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      description: "Complete Health Checkup",
      paymentMethod: "HDFC Credit Card",
      referenceId: "TXN001234567893"
    },
    {
      id: "5",
      type: "refund",
      amount: 150,
      status: "completed",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      description: "Order Cancellation Refund",
      paymentMethod: "Original Payment Method",
      referenceId: "REF001234567894"
    }
  ]);

  // Wallet Transactions
  const [walletTransactions] = useState<WalletTransaction[]>([
    {
      id: "1",
      type: "credit",
      amount: 500,
      description: "Cashback on medicine order",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      type: "debit",
      amount: 300,
      description: "Doctor consultation payment",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      type: "credit",
      amount: 200,
      description: "Referral bonus",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      type: "debit",
      amount: 150,
      description: "Medicine order payment",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ]);

  const setAsDefault = useCallback((methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
  }, []);

  const removePaymentMethod = useCallback((methodId: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
  }, []);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="w-5 h-5" />;
      case 'upi': return <Smartphone className="w-5 h-5" />;
      case 'netbanking': return <Building2 className="w-5 h-5" />;
      case 'wallet': return <Wallet className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'subscription': return <Shield className="w-5 h-5 text-purple-600" />;
      case 'medicine': return <Receipt className="w-5 h-5 text-blue-600" />;
      case 'consultation': return <Calendar className="w-5 h-5 text-green-600" />;
      case 'lab_test': return <RefreshCw className="w-5 h-5 text-orange-600" />;
      case 'refund': return <TrendingUp className="w-5 h-5 text-red-600" />;
      default: return <Receipt className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'refunded': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalSpent = transactions
    .filter(t => t.status === 'completed' && t.type !== 'refund')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthSpent = transactions
    .filter(t => {
      const thisMonth = new Date();
      return t.date.getMonth() === thisMonth.getMonth() && 
             t.date.getFullYear() === thisMonth.getFullYear() && 
             t.status === 'completed' && 
             t.type !== 'refund';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Payments & Billing</h1>
              <p className="text-sm text-gray-600">Manage your payment methods and view billing</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 pb-4 bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₹{walletBalance.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Wallet Balance</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹{thisMonthSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-white shadow-sm rounded-none border-b grid grid-cols-4">
          <TabsTrigger value="methods" className="flex-1">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1">
            <Wallet className="w-4 h-4 mr-2" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            <Receipt className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex-1">
            <Shield className="w-4 h-4 mr-2" />
            Plans
          </TabsTrigger>
        </TabsList>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="mt-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-6">
              
              {/* Add Payment Method Button */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Payment Methods</h3>
                  <Button 
                    size="sm"
                    onClick={() => setShowAddPaymentModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Method
                  </Button>
                </div>

                {/* Payment Methods List */}
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                          {getPaymentIcon(method.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                            {method.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.details}</p>
                          {method.lastUsed && (
                            <p className="text-xs text-gray-500">
                              Last used {formatDate(method.lastUsed)}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setAsDefault(method.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removePaymentMethod(method.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Payment Security */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Security & Privacy</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Secure Payments</p>
                      <p className="text-xs text-green-600">All payments are encrypted and secure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-pay for subscriptions</Label>
                      <p className="text-sm text-gray-600">Automatically renew subscriptions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Save payment info</Label>
                      <p className="text-sm text-gray-600">Securely save payment methods</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment notifications</Label>
                      <p className="text-sm text-gray-600">Get notified about transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="mt-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-6">
              
              {/* Wallet Balance Card */}
              <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">₹{walletBalance.toLocaleString()}</h3>
                  <p className="text-blue-100 mb-4">Available Balance</p>
                  
                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col">
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Add ₹500</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Add ₹1000</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Add ₹2000</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Custom</span>
                  </Button>
                </div>
              </Card>

              {/* Wallet Transactions */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Wallet Activity</h3>
                <div className="space-y-3">
                  {walletTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? 
                          <TrendingUp className="w-4 h-4 text-green-600" /> : 
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(transaction.date)} • {formatTime(transaction.date)}
                        </p>
                      </div>
                      
                      <div className={`font-medium ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Cashback Info */}
              <Card className="p-6 border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Earn More Cashback</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Get up to 15% cashback on medicine orders with MediFast Plus
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Upgrade to Plus
                  </Button>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Transaction History Tab */}
        <TabsContent value="history" className="mt-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">₹{totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </Card>
                <Card className="p-4 border-0 shadow-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{transactions.length}</p>
                    <p className="text-sm text-gray-600">Transactions</p>
                  </div>
                </Card>
              </div>

              {/* Filter Options */}
              <Card className="p-4 border-0 shadow-sm">
                <div className="flex items-center gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="lab_test">Lab Tests</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all_status">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_status">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </Card>

              {/* Transactions List */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Transaction History</h3>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                {transaction.type === 'refund' ? '+' : '-'}₹{transaction.amount}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">{transaction.paymentMethod}</p>
                              <p className="text-xs text-gray-500">
                                {formatDate(transaction.date)} • {formatTime(transaction.date)}
                              </p>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Reference ID: {transaction.referenceId}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Subscription Management Tab */}
        <TabsContent value="subscription" className="mt-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-6">
              
              {/* Current Plan */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Current Plan</h3>
                  {isSubscribed && (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  )}
                </div>
                
                {isSubscribed ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">MediFast Plus - 12 Months</h4>
                        <p className="text-sm text-gray-600">Expires on March 15, 2025</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-green-600">15%</p>
                        <p className="text-xs text-gray-600">Cashback</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-blue-600">24/7</p>
                        <p className="text-xs text-gray-600">Doctor Access</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">₹1L</p>
                        <p className="text-xs text-gray-600">Insurance</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        Manage Plan
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Cancel Plan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">No Active Subscription</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Upgrade to MediFast Plus for premium benefits
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      View Plans
                    </Button>
                  </div>
                )}
              </Card>

              {/* Usage Analytics */}
              {isSubscribed && (
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">This Month's Usage</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Doctor Consultations</span>
                        <span>3/∞</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Medicine Orders</span>
                        <span>₹2,450 spent</span>
                      </div>
                      <div className="text-xs text-green-600">₹367 cashback earned</div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Lab Tests</span>
                        <span>1 test booked</span>
                      </div>
                      <div className="text-xs text-gray-600">Free health checkup used</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Billing Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Billing Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Billing Address</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p>Rajesh Kumar</p>
                    <p>123 Main Street</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>India</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax Information</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>GST: 18% (as applicable)</p>
                    <p>PAN: ABCDE1234F</p>
                  </div>
                </div>
              </Card>

              {/* Auto-renewal Settings */}
              {isSubscribed && (
                <Card className="p-6 border-0 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Auto-renewal</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-renew subscription</Label>
                        <p className="text-sm text-gray-600">Automatically renew before expiry</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="text-sm text-gray-600">Next billing date</Label>
                      <p className="font-medium">March 15, 2025</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-600">Payment method</Label>
                      <p className="font-medium">HDFC Credit Card (**** 4532)</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Add Payment Method Modal */}
      <Dialog open={showAddPaymentModal} onOpenChange={setShowAddPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Payment Type</Label>
              <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPaymentType === 'card' && (
              <div className="space-y-3">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input type="password" placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            )}

            {selectedPaymentType === 'upi' && (
              <div>
                <Label>UPI ID</Label>
                <Input placeholder="yourname@upi" />
              </div>
            )}

            {selectedPaymentType === 'netbanking' && (
              <div>
                <Label>Select Bank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedPaymentType === 'wallet' && (
              <div>
                <Label>Wallet Provider</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paytm">Paytm</SelectItem>
                    <SelectItem value="phonepe">PhonePe</SelectItem>
                    <SelectItem value="googlepay">Google Pay</SelectItem>
                    <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                className="flex-1" 
                disabled={!selectedPaymentType}
                onClick={() => {
                  setShowAddPaymentModal(false);
                  setSelectedPaymentType("");
                }}
              >
                Add Payment Method
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddPaymentModal(false);
                  setSelectedPaymentType("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}