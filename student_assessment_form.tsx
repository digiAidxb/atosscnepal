import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, GraduationCap, MapPin, BookOpen, DollarSign, FileText, Phone, CheckCircle } from 'lucide-react';

const AssessmentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    preferredCountry: '',
    studyLevel: '',
    fieldOfStudy: '',
    currentEducation: '',
    englishTest: '',
    englishScore: '',
    budget: '',
    intakePreference: '',
    workExperience: '',
    fullName: '',
    phone: '',
    email: '',
    whatsapp: ''
  });

  const totalSteps = 7;

  const countries = [
    { value: 'australia', label: 'Australia', flag: '🇦🇺' },
    { value: 'newzealand', label: 'New Zealand', flag: '🇳🇿' },
    { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
    { value: 'usa', label: 'USA', flag: '🇺🇸' },
    { value: 'undecided', label: 'Not Sure Yet', flag: '🤔' }
  ];

  const studyLevels = [
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Diploma/Certificate',
    'Not Sure'
  ];

  const fieldsOfStudy = [
    'Business & Management',
    'Engineering & Technology',
    'Computer Science & IT',
    'Health Sciences & Medicine',
    'Arts & Humanities',
    'Natural Sciences',
    'Social Sciences',
    'Hospitality & Tourism',
    'Other/Undecided'
  ];

  const intakes = [
    'February 2025',
    'July 2025',
    'September 2025',
    'January 2026',
    'Flexible'
  ];

  const getBudgetRanges = () => {
    const country = formData.preferredCountry;
    
    if (country === 'australia') {
      return [
        { display: 'AUD 20,000-30,000/year', npr: '(NPR 17-26 Lakhs)', value: 'AUD 20-30k' },
        { display: 'AUD 30,000-40,000/year', npr: '(NPR 26-35 Lakhs)', value: 'AUD 30-40k' },
        { display: 'AUD 40,000-50,000/year', npr: '(NPR 35-43 Lakhs)', value: 'AUD 40-50k' },
        { display: 'AUD 50,000+/year', npr: '(NPR 43+ Lakhs)', value: 'AUD 50k+' }
      ];
    } else if (country === 'newzealand') {
      return [
        { display: 'NZD 20,000-30,000/year', npr: '(NPR 16-24 Lakhs)', value: 'NZD 20-30k' },
        { display: 'NZD 30,000-40,000/year', npr: '(NPR 24-32 Lakhs)', value: 'NZD 30-40k' },
        { display: 'NZD 40,000-50,000/year', npr: '(NPR 32-40 Lakhs)', value: 'NZD 40-50k' },
        { display: 'NZD 50,000+/year', npr: '(NPR 40+ Lakhs)', value: 'NZD 50k+' }
      ];
    } else if (country === 'uk') {
      return [
        { display: '£15,000-20,000/year', npr: '(NPR 25-33 Lakhs)', value: 'GBP 15-20k' },
        { display: '£20,000-30,000/year', npr: '(NPR 33-50 Lakhs)', value: 'GBP 20-30k' },
        { display: '£30,000-40,000/year', npr: '(NPR 50-66 Lakhs)', value: 'GBP 30-40k' },
        { display: '£40,000+/year', npr: '(NPR 66+ Lakhs)', value: 'GBP 40k+' }
      ];
    } else if (country === 'usa') {
      return [
        { display: '$20,000-30,000/year', npr: '(NPR 26-40 Lakhs)', value: 'USD 20-30k' },
        { display: '$30,000-50,000/year', npr: '(NPR 40-66 Lakhs)', value: 'USD 30-50k' },
        { display: '$50,000-70,000/year', npr: '(NPR 66-92 Lakhs)', value: 'USD 50-70k' },
        { display: '$70,000+/year', npr: '(NPR 92+ Lakhs)', value: 'USD 70k+' }
      ];
    } else {
      return [
        { display: 'NPR 15-25 Lakhs/year', npr: '', value: 'NPR 15-25L' },
        { display: 'NPR 25-35 Lakhs/year', npr: '', value: 'NPR 25-35L' },
        { display: 'NPR 35-50 Lakhs/year', npr: '', value: 'NPR 35-50L' },
        { display: 'NPR 50-70 Lakhs/year', npr: '', value: 'NPR 50-70L' },
        { display: 'NPR 70+ Lakhs/year', npr: '', value: 'NPR 70L+' }
      ];
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.preferredCountry !== '';
      case 2: return formData.studyLevel !== '';
      case 3: return formData.fieldOfStudy !== '';
      case 4: return formData.englishTest !== '';
      case 5: return formData.budget !== '';
      case 6: return formData.intakePreference !== '';
      case 7: return formData.fullName && formData.phone && formData.email;
      default: return false;
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('✓ Thank you! Our team will contact you on WhatsApp within 2 hours with your personalized assessment.');
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8">
      <div 
        className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Logo */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-900 text-white px-4 py-2 rounded font-bold text-xl tracking-wide">
                  ATOSSC
                </div>
                <div className="text-green-600 font-bold text-xl">
                  NEPAL
                </div>
              </div>
              <p className="text-sm text-gray-600">Trusted Study Abroad Guidance Since 2014</p>
            </div>
            <GraduationCap className="w-12 h-12 text-blue-900" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Free Eligibility Assessment
            </h1>
            <p className="text-gray-600 mb-1">
              Honest guidance based on your profile, not trends
            </p>
            <p className="text-sm text-gray-500">
              Step {step} of {totalSteps} • Takes 2 minutes
            </p>
          </div>

          <ProgressBar />

          <div>
            {/* Step 1: Country Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    Which country interests you?
                  </h2>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-900 p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> You're not locked in. Our assessment may recommend a different country if it improves your chances.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {countries.map(country => (
                    <button
                      key={country.value}
                      onClick={() => handleChange('preferredCountry', country.value)}
                      className={`p-5 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.preferredCountry === country.value
                          ? 'border-green-600 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{country.flag}</span>
                          <span className="text-lg font-semibold text-gray-800">
                            {country.label}
                          </span>
                        </div>
                        {formData.preferredCountry === country.value && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Study Level */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    What level of study?
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {studyLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => handleChange('studyLevel', level)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.studyLevel === level
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-800">{level}</span>
                        {formData.studyLevel === level && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Field of Study */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    What do you want to study?
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {fieldsOfStudy.map(field => (
                    <button
                      key={field}
                      onClick={() => handleChange('fieldOfStudy', field)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.fieldOfStudy === field
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-800">{field}</span>
                        {formData.fieldOfStudy === field && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: English Test */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    English test status?
                  </h2>
                </div>
                <div className="space-y-4">
                  {['IELTS', 'PTE', 'TOEFL', 'Duolingo', 'Not yet taken', 'Planning to take soon'].map(test => (
                    <button
                      key={test}
                      onClick={() => handleChange('englishTest', test)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.englishTest === test
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-800">{test}</span>
                        {formData.englishTest === test && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {formData.englishTest && !['Not yet taken', 'Planning to take soon'].includes(formData.englishTest) && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Overall Score
                      </label>
                      <input
                        type="text"
                        value={formData.englishScore}
                        onChange={(e) => handleChange('englishScore', e.target.value)}
                        placeholder="e.g., 6.5 or 65"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Budget */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    Annual tuition fee you can afford?
                  </h2>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-900 p-4 mb-4">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Tuition fees only.</strong> Living expenses are separate
                    {formData.preferredCountry === 'australia' && ' (typically AUD 21,000-24,000/year)'}
                    {formData.preferredCountry === 'newzealand' && ' (typically NZD 15,000-18,000/year)'}
                    {formData.preferredCountry === 'uk' && ' (typically £12,000-15,000/year)'}
                    {formData.preferredCountry === 'usa' && ' (typically $15,000-20,000/year)'}
                    {formData.preferredCountry === 'undecided' && ' (varies by country)'}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {getBudgetRanges().map(budget => (
                    <button
                      key={budget.value}
                      onClick={() => handleChange('budget', budget.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.budget === budget.value
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-medium text-gray-800">{budget.display}</span>
                          {budget.npr && (
                            <span className="text-sm text-gray-600 mt-1">{budget.npr}</span>
                          )}
                        </div>
                        {formData.budget === budget.value && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => handleChange('budget', 'not_sure')}
                    className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                      formData.budget === 'not_sure'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-800">Not Sure / Need Guidance</span>
                      {formData.budget === 'not_sure' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => handleChange('budget', 'scholarship_required')}
                    className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                      formData.budget === 'scholarship_required'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-800">Need Scholarship to Afford</span>
                      {formData.budget === 'scholarship_required' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Intake Preference */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    When do you plan to start?
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {intakes.map(intake => (
                    <button
                      key={intake}
                      onClick={() => handleChange('intakePreference', intake)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        formData.intakePreference === intake
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-800">{intake}</span>
                        {formData.intakePreference === intake && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Contact Details */}
            {step === 7 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Phone className="w-6 h-6 text-green-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">
                    How can we reach you?
                  </h2>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
                  <p className="text-sm text-green-800">
                    ✓ We'll send your personalized assessment on WhatsApp within 2 hours
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-gray-700 font-medium"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              
              {step < totalSteps ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all font-semibold ${
                    canProceed()
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className={`flex-1 px-6 py-3 rounded-lg transition-all font-semibold ${
                    canProceed()
                      ? 'bg-blue-900 text-white hover:bg-blue-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Get My Assessment ✓
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            {step === 7 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Your information is secure. We provide honest guidance, not sales pitches.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© Atossc Nepal Pvt. Ltd. • Trusted Study Abroad Guidance Since 2014</p>
          <p className="mt-1">Embassy Marg, Baluwatar, Kathmandu, Nepal</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;