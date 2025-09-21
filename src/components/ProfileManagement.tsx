import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowLeft, User, Shield, Bell, CreditCard, FileText, Users, Settings, Edit, Camera, Upload, Download, Trash2, Plus, Phone, Mail, MapPin, Calendar, Heart, Pill, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";

interface ProfileManagementProps {
  onBack: () => void;
  isTempAccount?: boolean;
}

interface MedicalRecord {
  id: string;
  type: 'prescription' | 'test_result' | 'diagnosis' | 'vaccination';
  title: string;
  date: Date;
  doctor: string;
  fileUrl?: string;
  notes?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export function ProfileManagement({ onBack, isTempAccount = false }: ProfileManagementProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: isTempAccount ? "" : "Rajesh",
    lastName: isTempAccount ? "" : "Kumar",
    email: isTempAccount ? "temp@medifast.com" : "rajesh.kumar@email.com",
    phone: isTempAccount ? "" : "+91 98765 43210",
    dateOfBirth: isTempAccount ? "" : "1985-03-15",
    gender: isTempAccount ? "" : "Male",
    bloodGroup: isTempAccount ? "" : "B+",
    height: isTempAccount ? "" : "175",
    weight: isTempAccount ? "" : "70",
    address: isTempAccount ? "" : "123 Main Street, Mumbai, Maharashtra 400001",
    occupation: isTempAccount ? "" : "Software Engineer",
    maritalStatus: isTempAccount ? "" : "Married"
  });

  // Medical History State
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: isTempAccount ? "" : "Peanuts, Penicillin",
    chronicConditions: isTempAccount ? "" : "Hypertension",
    currentMedications: isTempAccount ? "" : "Lisinopril 10mg daily",
    familyHistory: isTempAccount ? "" : "Diabetes (Father), Heart Disease (Mother)",
    surgeries: isTempAccount ? "" : "Appendectomy (2018)",
    vaccinationStatus: isTempAccount ? "" : "COVID-19 fully vaccinated"
  });

  // Emergency Contacts State
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(
    isTempAccount ? [] : [
      {
        id: "1",
        name: "Priya Kumar",
        relationship: "Spouse",
        phone: "+91 98765 43211",
        email: "priya.kumar@email.com"
      },
      {
        id: "2", 
        name: "Dr. Sarah Reddy",
        relationship: "Family Doctor",
        phone: "+91 98765 43212",
        email: "dr.sarah@clinic.com"
      }
    ]
  );

  // Medical Records State
  const [medicalRecords] = useState<MedicalRecord[]>(
    isTempAccount ? [] : [
      {
        id: "1",
        type: "test_result",
        title: "Blood Test - Complete Panel",
        date: new Date('2024-09-01'),
        doctor: "Dr. Priya Sharma",
        fileUrl: "#",
        notes: "All parameters within normal range"
      },
      {
        id: "2",
        type: "prescription",
        title: "Hypertension Medication",
        date: new Date('2024-08-15'),
        doctor: "Dr. Rajesh Gupta",
        notes: "Continue current dosage for 3 months"
      },
      {
        id: "3",
        type: "vaccination",
        title: "COVID-19 Booster",
        date: new Date('2024-07-10'),
        doctor: "Dr. Medical Center",
        notes: "No adverse reactions reported"
      }
    ]
  );

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    shareDataWithDoctors: true,
    allowEmergencyAccess: true,
    receiveHealthTips: true,
    shareAnonymousData: false,
    twoFactorAuth: false,
    locationServices: true,
    biometricAuth: false
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminders: true,
    medicationReminders: true,
    healthReports: true,
    emergencyAlerts: true,
    marketingEmails: false,
    smsNotifications: true,
    pushNotifications: true
  });

  const handlePersonalInfoChange = useCallback((field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleMedicalHistoryChange = useCallback((field: string, value: string) => {
    setMedicalHistory(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePrivacySettingChange = useCallback((setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const handleNotificationSettingChange = useCallback((setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  }, []);

  const addEmergencyContact = useCallback(() => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: "",
      relationship: "",
      phone: "",
      email: ""
    };
    setEmergencyContacts(prev => [...prev, newContact]);
  }, []);

  const updateEmergencyContact = useCallback((id: string, field: string, value: string) => {
    setEmergencyContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  }, []);

  const removeEmergencyContact = useCallback((id: string) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
  }, []);

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'prescription': return <Pill className="w-5 h-5 text-blue-600" />;
      case 'test_result': return <FileText className="w-5 h-5 text-green-600" />;
      case 'diagnosis': return <Heart className="w-5 h-5 text-red-600" />;
      case 'vaccination': return <Shield className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatRecordType = (type: string) => {
    switch (type) {
      case 'prescription': return 'Prescription';
      case 'test_result': return 'Test Result';
      case 'diagnosis': return 'Diagnosis';
      case 'vaccination': return 'Vaccination';
      default: return 'Medical Record';
    }
  };

  const calculateProfileCompletion = () => {
    const fields = Object.values(personalInfo);
    const filledFields = fields.filter(field => field && field.trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

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
              <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-600">Manage your health information</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </div>

        {/* Profile Summary Card */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-xl font-semibold">
                {personalInfo.firstName ? `${personalInfo.firstName[0]}${personalInfo.lastName[0]}` : <User className="w-8 h-8" />}
              </div>
              <Button 
                size="sm" 
                className="absolute -bottom-1 -right-1 p-1 h-6 w-6 rounded-full"
                disabled={!isEditing}
              >
                <Camera className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">
                {personalInfo.firstName && personalInfo.lastName 
                  ? `${personalInfo.firstName} ${personalInfo.lastName}`
                  : isTempAccount ? "Complete Your Profile" : "User"}
              </h2>
              <p className="text-sm text-gray-600">{personalInfo.email}</p>
              
              {isTempAccount && (
                <Badge variant="secondary" className="mt-1 bg-yellow-100 text-yellow-700">
                  Trial Account
                </Badge>
              )}
              
              <div className="mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Profile {profileCompletion}% complete</span>
                </div>
                <Progress value={profileCompletion} className="w-full h-2 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-white shadow-sm rounded-none border-b grid grid-cols-4">
          <TabsTrigger value="personal" className="flex-1">
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Medical
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="mt-0">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="p-4 space-y-6">
              
              {/* Basic Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      disabled={!isEditing || isTempAccount}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(value) => handlePersonalInfoChange('gender', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Health Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Health Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select
                      value={personalInfo.bloodGroup}
                      onValueChange={(value) => handlePersonalInfoChange('bloodGroup', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      value={personalInfo.height}
                      onChange={(e) => handlePersonalInfoChange('height', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter height"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={personalInfo.weight}
                      onChange={(e) => handlePersonalInfoChange('weight', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              </Card>

              {/* Additional Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={personalInfo.address}
                      onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Enter full address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={personalInfo.occupation}
                        onChange={(e) => handlePersonalInfoChange('occupation', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter occupation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      <Select
                        value={personalInfo.maritalStatus}
                        onValueChange={(value) => handlePersonalInfoChange('maritalStatus', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Emergency Contacts */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Emergency Contacts</h3>
                  <Button 
                    size="sm" 
                    onClick={addEmergencyContact}
                    disabled={!isEditing}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={contact.name}
                            onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Contact name"
                          />
                        </div>
                        <div>
                          <Label>Relationship</Label>
                          <Input
                            value={contact.relationship}
                            onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Relationship"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={contact.phone}
                            onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                            disabled={!isEditing}
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <Label>Email (Optional)</Label>
                            <Input
                              value={contact.email || ''}
                              onChange={(e) => updateEmergencyContact(contact.id, 'email', e.target.value)}
                              disabled={!isEditing}
                              placeholder="Email address"
                            />
                          </div>
                          {isEditing && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeEmergencyContact(contact.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {emergencyContacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No emergency contacts added yet</p>
                      <p className="text-sm">Add contacts for emergency situations</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Save Button */}
              {isEditing && (
                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      // Save logic here
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Medical Information Tab */}
        <TabsContent value="medical" className="mt-0">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="p-4 space-y-6">
              
              {/* Medical History */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Medical History</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={medicalHistory.allergies}
                      onChange={(e) => handleMedicalHistoryChange('allergies', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List any known allergies"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                    <Textarea
                      id="chronicConditions"
                      value={medicalHistory.chronicConditions}
                      onChange={(e) => handleMedicalHistoryChange('chronicConditions', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List any chronic conditions"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="currentMedications"
                      value={medicalHistory.currentMedications}
                      onChange={(e) => handleMedicalHistoryChange('currentMedications', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List current medications and dosages"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyHistory">Family Medical History</Label>
                    <Textarea
                      id="familyHistory"
                      value={medicalHistory.familyHistory}
                      onChange={(e) => handleMedicalHistoryChange('familyHistory', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Describe family medical history"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="surgeries">Previous Surgeries</Label>
                    <Textarea
                      id="surgeries"
                      value={medicalHistory.surgeries}
                      onChange={(e) => handleMedicalHistoryChange('surgeries', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List previous surgeries with dates"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vaccinationStatus">Vaccination Status</Label>
                    <Textarea
                      id="vaccinationStatus"
                      value={medicalHistory.vaccinationStatus}
                      onChange={(e) => handleMedicalHistoryChange('vaccinationStatus', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Current vaccination status"
                      rows={2}
                    />
                  </div>
                </div>
              </Card>

              {/* Medical Records */}
              <Card className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Medical Records</h3>
                  <Button size="sm" disabled={!isEditing}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Record
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {medicalRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getRecordIcon(record.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{record.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {formatRecordType(record.type)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">Dr. {record.doctor}</p>
                          <p className="text-xs text-gray-500">{record.date.toLocaleDateString()}</p>
                          {record.notes && (
                            <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {record.fileUrl && (
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {medicalRecords.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No medical records uploaded yet</p>
                      <p className="text-sm">Upload your medical documents for easy access</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Save Button */}
              {isEditing && (
                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      // Save logic here
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Privacy & Security Tab */}
        <TabsContent value="privacy" className="mt-0">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="p-4 space-y-6">
              
              {/* Privacy Settings */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Share data with healthcare providers</Label>
                      <p className="text-sm text-gray-600">Allow doctors to access your health data</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareDataWithDoctors}
                      onCheckedChange={(checked) => handlePrivacySettingChange('shareDataWithDoctors', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emergency access</Label>
                      <p className="text-sm text-gray-600">Allow emergency services to access critical information</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowEmergencyAccess}
                      onCheckedChange={(checked) => handlePrivacySettingChange('allowEmergencyAccess', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Health tips and recommendations</Label>
                      <p className="text-sm text-gray-600">Receive personalized health insights</p>
                    </div>
                    <Switch
                      checked={privacySettings.receiveHealthTips}
                      onCheckedChange={(checked) => handlePrivacySettingChange('receiveHealthTips', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Anonymous data sharing</Label>
                      <p className="text-sm text-gray-600">Help improve healthcare through anonymous research</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareAnonymousData}
                      onCheckedChange={(checked) => handlePrivacySettingChange('shareAnonymousData', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Location services</Label>
                      <p className="text-sm text-gray-600">Find nearby healthcare providers</p>
                    </div>
                    <Switch
                      checked={privacySettings.locationServices}
                      onCheckedChange={(checked) => handlePrivacySettingChange('locationServices', checked)}
                    />
                  </div>
                </div>
              </Card>

              {/* Security Settings */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-factor authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={privacySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handlePrivacySettingChange('twoFactorAuth', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Biometric authentication</Label>
                      <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
                    </div>
                    <Switch
                      checked={privacySettings.biometricAuth}
                      onCheckedChange={(checked) => handlePrivacySettingChange('biometricAuth', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                      {showPasswordFields ? <EyeOff className="w-4 h-4 ml-auto" /> : <Eye className="w-4 h-4 ml-auto" />}
                    </Button>
                    
                    {showPasswordFields && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pl-4 border-l-2 border-gray-200"
                      >
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <Button size="sm" className="w-full">
                          Update Password
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Account Actions */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Deactivate Account
                  </Button>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-0">
          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="p-4 space-y-6">
              
              {/* Notification Settings */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Appointment reminders</Label>
                      <p className="text-sm text-gray-600">Get notified about upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notificationSettings.appointmentReminders}
                      onCheckedChange={(checked) => handleNotificationSettingChange('appointmentReminders', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Medication reminders</Label>
                      <p className="text-sm text-gray-600">Never miss your medication</p>
                    </div>
                    <Switch
                      checked={notificationSettings.medicationReminders}
                      onCheckedChange={(checked) => handleNotificationSettingChange('medicationReminders', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Health reports</Label>
                      <p className="text-sm text-gray-600">Get notified when test results are available</p>
                    </div>
                    <Switch
                      checked={notificationSettings.healthReports}
                      onCheckedChange={(checked) => handleNotificationSettingChange('healthReports', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emergency alerts</Label>
                      <p className="text-sm text-gray-600">Critical health and safety notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emergencyAlerts}
                      onCheckedChange={(checked) => handleNotificationSettingChange('emergencyAlerts', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push notifications</Label>
                      <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange('pushNotifications', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS notifications</Label>
                      <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange('smsNotifications', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing emails</Label>
                      <p className="text-sm text-gray-600">Receive promotional content and offers</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationSettingChange('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </Card>

              {/* App Preferences */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">App Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                        <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                        <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                        <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                        <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                        <SelectItem value="malayalam">മലയാളം (Malayalam)</SelectItem>
                        <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="units">Measurement Units</Label>
                    <Select defaultValue="metric">
                      <SelectTrigger>
                        <SelectValue placeholder="Select units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Support & Help */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Support & Help</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Terms of Service
                  </Button>
                </div>
              </Card>

              {/* App Information */}
              <Card className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">App Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span>2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Build</span>
                    <span>2024.09.21</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span>September 21, 2024</span>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}