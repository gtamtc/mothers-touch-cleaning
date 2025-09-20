import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Upload, Sparkles, Home, Phone, Mail, Loader2 } from 'lucide-react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bedrooms: '',
    customBedrooms: '',
    dens: '',
    washrooms: '',
    customWashrooms: '',
    bathtubs: '',
    customBathtubs: '',
    powderRooms: '',
    customPowderRooms: '',
    offices: '',
    residenceType: '',
    customResidenceType: '',
    centralVacuum: '',
    parking: '',
    extraDetails: '',
    deepCleaning: false,
    regularCleaning: false
  })

  const [showCustomBedrooms, setShowCustomBedrooms] = useState(false)
  const [showCustomWashrooms, setShowCustomWashrooms] = useState(false)
  const [showCustomBathtubs, setShowCustomBathtubs] = useState(false)
  const [showCustomPowderRooms, setShowCustomPowderRooms] = useState(false)
  const [showCustomResidenceType, setShowCustomResidenceType] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    // Enhanced cleaning option logic - check before updating state
    if (field === 'regularCleaning' && !value && formData.deepCleaning) {
      // Prevent unchecking regular cleaning when deep cleaning is still selected
      return // Don't update the state, keep regular cleaning checked
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Handle conditional fields
    if (field === 'bedrooms') {
      setShowCustomBedrooms(value === '+5')
    }
    if (field === 'washrooms') {
      setShowCustomWashrooms(value === '5+')
    }
    if (field === 'bathtubs') {
      setShowCustomBathtubs(value === '4+')
    }
    if (field === 'powderRooms') {
      setShowCustomPowderRooms(value === '5+')
    }
    if (field === 'residenceType') {
      setShowCustomResidenceType(value === 'other')
    }
    
    // When deep cleaning is selected, automatically select regular cleaning
    if (field === 'deepCleaning' && value) {
      setFormData(prev => ({ ...prev, deepCleaning: value, regularCleaning: true }))
    }
  }

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'address', 'bedrooms', 'washrooms', 'bathtubs', 'powderRooms', 'offices', 'residenceType', 'centralVacuum', 'parking']
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Por favor, preencha o campo: ${field}`)
        return false
      }
    }

    // Validate at least one cleaning service is selected
    if (!formData.deepCleaning && !formData.regularCleaning) {
      alert('Por favor, selecione pelo menos um tipo de limpeza.')
      return false
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um email válido.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful response
      console.log('Form data submitted:', formData)
      
      // Show thank you message
      setShowThankYou(true)
      
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-16 w-16 bg-purple-600 rounded-lg shadow-md flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mother's Touch Cleaning</h1>
            </div>
            <div className="h-16 w-16 bg-purple-600 rounded-lg shadow-md flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-2">Get Your Personalized Cleaning Quote</p>
          <p className="text-lg text-purple-600 font-medium">Answer these questions for a precise quote tailored to your home</p>
        </div>

        {showThankYou ? (
          /* Thank You Message */
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="h-12 w-12 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
                <Sparkles className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-xl text-gray-600 mb-4">
                Your quote request has been submitted successfully.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  📧 PLEASE SEND THIS PDF TO OUR EMAIL
                </h3>
                <p className="text-red-700 mb-2">
                  A detailed PDF quote has been created for you. Please send this PDF along with photos of the areas to be cleaned to:
                </p>
                <p className="text-lg font-bold text-red-800 mb-3">
                  gtamtc@outlook.com
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Required photos:</strong> bedrooms, bathrooms, bathtubs, living room, dining area, kitchen, and any other areas you would like cleaned.
                </p>
              </div>
              
              <p className="text-lg text-gray-700 mb-6">
                We will review your information and photos to provide you with the most accurate quote for your cleaning needs.
              </p>

              <Button 
                onClick={() => {
                  setShowThankYou(false)
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    bedrooms: '',
                    customBedrooms: '',
                    dens: '',
                    washrooms: '',
                    customWashrooms: '',
                    bathtubs: '',
                    customBathtubs: '',
                    powderRooms: '',
                    customPowderRooms: '',
                    offices: '',
                    residenceType: '',
                    customResidenceType: '',
                    centralVacuum: '',
                    parking: '',
                    extraDetails: '',
                    deepCleaning: false,
                    regularCleaning: false
                  })
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Submit Another Quote
              </Button>
            </CardContent>
          </Card>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Let us know how to reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Your complete address"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
              <CardDescription>Tell us about your home</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bedrooms */}
              <div>
                <Label htmlFor="bedrooms">How many bedrooms are there? *</Label>
                <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="+5">+5</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomBedrooms && (
                  <div className="mt-2">
                    <Label htmlFor="customBedrooms">If more than 5, how many?</Label>
                    <Input
                      id="customBedrooms"
                      type="number"
                      value={formData.customBedrooms}
                      onChange={(e) => handleInputChange('customBedrooms', e.target.value)}
                      placeholder="Enter exact number"
                    />
                  </div>
                )}
              </div>

              {/* Dens */}
              <div>
                <Label htmlFor="dens">How many dens?</Label>
                <Select value={formData.dens} onValueChange={(value) => handleInputChange('dens', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of dens" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Washrooms */}
              <div>
                <Label htmlFor="washrooms">How many washrooms are there? *</Label>
                <Select value={formData.washrooms} onValueChange={(value) => handleInputChange('washrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of washrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomWashrooms && (
                  <div className="mt-2">
                    <Label htmlFor="customWashrooms">If more than 5, how many?</Label>
                    <Input
                      id="customWashrooms"
                      type="number"
                      value={formData.customWashrooms}
                      onChange={(e) => handleInputChange('customWashrooms', e.target.value)}
                      placeholder="Enter exact number"
                    />
                  </div>
                )}
              </div>

              {/* Bathtubs */}
              <div>
                <Label htmlFor="bathtubs">How many bathtubs? *</Label>
                <Select value={formData.bathtubs} onValueChange={(value) => handleInputChange('bathtubs', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of bathtubs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomBathtubs && (
                  <div className="mt-2">
                    <Label htmlFor="customBathtubs">If more than 4, how many?</Label>
                    <Input
                      id="customBathtubs"
                      type="number"
                      value={formData.customBathtubs}
                      onChange={(e) => handleInputChange('customBathtubs', e.target.value)}
                      placeholder="Enter exact number"
                    />
                  </div>
                )}
              </div>

              {/* Powder Rooms */}
              <div>
                <Label htmlFor="powderRooms">How many powder rooms? *</Label>
                <Select value={formData.powderRooms} onValueChange={(value) => handleInputChange('powderRooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of powder rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
                {showCustomPowderRooms && (
                  <div className="mt-2">
                    <Label htmlFor="customPowderRooms">If more than 5, how many?</Label>
                    <Input
                      id="customPowderRooms"
                      type="number"
                      value={formData.customPowderRooms}
                      onChange={(e) => handleInputChange('customPowderRooms', e.target.value)}
                      placeholder="Enter exact number"
                    />
                  </div>
                )}
              </div>

              {/* Offices */}
              <div>
                <Label htmlFor="offices">How many offices are there? *</Label>
                <Select value={formData.offices} onValueChange={(value) => handleInputChange('offices', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of offices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Residence Type */}
              <div>
                <Label>What kind of residence is it? *</Label>
                <RadioGroup 
                  value={formData.residenceType} 
                  onValueChange={(value) => handleInputChange('residenceType', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2story-basement" id="2story-basement" />
                    <Label htmlFor="2story-basement">2 Story house: main floor + second floor + basement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2story-no-basement" id="2story-no-basement" />
                    <Label htmlFor="2story-no-basement">2 Story house: main floor + second floor NO basement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bungalow-basement" id="bungalow-basement" />
                    <Label htmlFor="bungalow-basement">Bungalow: main floor + basement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bungalow-main" id="bungalow-main" />
                    <Label htmlFor="bungalow-main">Bungalow: Main Floor Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="townhouse" id="townhouse" />
                    <Label htmlFor="townhouse">Townhouse</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apartment" id="apartment" />
                    <Label htmlFor="apartment">Apartment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {showCustomResidenceType && (
                  <div className="mt-2">
                    <Label htmlFor="customResidenceType">Please specify:</Label>
                    <Input
                      id="customResidenceType"
                      value={formData.customResidenceType}
                      onChange={(e) => handleInputChange('customResidenceType', e.target.value)}
                      placeholder="Describe your residence type"
                    />
                  </div>
                )}
              </div>

              {/* Central Vacuum */}
              <div>
                <Label>Does the house have central vacuum? *</Label>
                <RadioGroup 
                  value={formData.centralVacuum} 
                  onValueChange={(value) => handleInputChange('centralVacuum', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="central-yes" />
                    <Label htmlFor="central-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="central-no" />
                    <Label htmlFor="central-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Parking */}
              <div>
                <Label>Is there free available parking for us? *</Label>
                <RadioGroup 
                  value={formData.parking} 
                  onValueChange={(value) => handleInputChange('parking', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="parking-yes" />
                    <Label htmlFor="parking-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-cover" id="parking-no-cover" />
                    <Label htmlFor="parking-no-cover">No, but I will cover any parking fees</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Help us provide the best service for your home</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="extraDetails">
                  Hi there! 😊 To give you a more precise quote and make your home sparkle just the way you like, could you share any extra details?
                </Label>
                <Textarea
                  id="extraDetails"
                  value={formData.extraDetails}
                  onChange={(e) => handleInputChange('extraDetails', e.target.value)}
                  placeholder="Pets (extra fur!), lots of mirrors or glass, or anything else needing special care..."
                  className="mt-2"
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">For Accurate Pricing</h3>
                <p className="text-purple-700 text-sm">
                  To provide you with the most accurate quote, we require photos of the spaces to be cleaned.
                </p>
                <p className="text-purple-700 text-sm">
                  Please attach photos of: <strong>bedrooms, bathrooms, bathtubs, living room, dining area, kitchen, and any other areas</strong> you would like cleaned when you send us the quote.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cleaning Options */}
          <Card>
            <CardHeader>
              <CardTitle>Cleaning Services</CardTitle>
              <CardDescription>We offer two kinds of cleanings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="deepCleaning"
                    checked={formData.deepCleaning}
                    onCheckedChange={(checked) => handleInputChange('deepCleaning', checked)}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="deepCleaning" className="text-lg font-semibold">
                      Deep cleaning includes detailing:
                    </Label>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                      <li>baseboards</li>
                      <li>doors - portals included -</li>
                      <li>light switches</li>
                      <li>moving fridge and stove out of place to clean - if possible -</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="regularCleaning"
                    checked={formData.regularCleaning}
                    onCheckedChange={(checked) => handleInputChange('regularCleaning', checked)}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="regularCleaning" className="text-lg font-semibold">
                      The regular cleaning includes:
                    </Label>
                    <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                      <li>washrooms</li>
                      <li>vacuuming and mopping floors</li>
                      <li>dusting</li>
                      <li>cleaning the kitchen</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-center text-lg">
                  🧹🧽🧼<br />
                  We bring all the supplies for your convenience.<br />
                  🧹🧽🧼
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> We clean all appliances on the outside. If you'd like the inside cleaned too, just let us know and we can give you a separate quote. Also, window glass and dishes aren't included in the cleaning.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Send Quote Request to My Email
                </>
              )}
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}

export default App

