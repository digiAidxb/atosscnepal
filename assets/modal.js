        // ==========================================
        // CONFIGURATION - REPLACE WITH YOUR VALUES
        // ==========================================
        const CONFIG = {
            emailjs: {
                serviceId: 'service_lfjjclu',
                templateId: 'template_7rrha7e',
                publicKey: '1qS5PexPlMACugROu'
            },
            sheets: {
                apiUrl: 'https://api.sheetbest.com/sheets/fd85d7fc-e393-4dee-a082-203a7516f232'
            }
        };

        // Form data storage
        const formData = {
            country: '',
            studyLevel: '',
            fieldOfStudy: '',
            englishTest: '',
            englishScore: '',
            budget: '',
            intake: '',
            fullName: '',
            phone: '',
            email: ''
        };

        let currentStep = 1;
        const totalSteps = 7;

        // Budget ranges by country
        const budgetRanges = {
            australia: [
                { display: 'AUD 20,000-30,000/year', npr: '(NPR 17-26 Lakhs)', value: 'AUD 20-30k' },
                { display: 'AUD 30,000-40,000/year', npr: '(NPR 26-35 Lakhs)', value: 'AUD 30-40k' },
                { display: 'AUD 40,000-50,000/year', npr: '(NPR 35-43 Lakhs)', value: 'AUD 40-50k' },
                { display: 'AUD 50,000+/year', npr: '(NPR 43+ Lakhs)', value: 'AUD 50k+' }
            ],
            newzealand: [
                { display: 'NZD 20,000-30,000/year', npr: '(NPR 16-24 Lakhs)', value: 'NZD 20-30k' },
                { display: 'NZD 30,000-40,000/year', npr: '(NPR 24-32 Lakhs)', value: 'NZD 30-40k' },
                { display: 'NZD 40,000-50,000/year', npr: '(NPR 32-40 Lakhs)', value: 'NZD 40-50k' },
                { display: 'NZD 50,000+/year', npr: '(NPR 40+ Lakhs)', value: 'NZD 50k+' }
            ],
            uk: [
                { display: '£15,000-20,000/year', npr: '(NPR 25-33 Lakhs)', value: 'GBP 15-20k' },
                { display: '£20,000-30,000/year', npr: '(NPR 33-50 Lakhs)', value: 'GBP 20-30k' },
                { display: '£30,000-40,000/year', npr: '(NPR 50-66 Lakhs)', value: 'GBP 30-40k' },
                { display: '£40,000+/year', npr: '(NPR 66+ Lakhs)', value: 'GBP 40k+' }
            ],
            usa: [
                { display: '$20,000-30,000/year', npr: '(NPR 26-40 Lakhs)', value: 'USD 20-30k' },
                { display: '$30,000-50,000/year', npr: '(NPR 40-66 Lakhs)', value: 'USD 30-50k' },
                { display: '$50,000-70,000/year', npr: '(NPR 66-92 Lakhs)', value: 'USD 50-70k' },
                { display: '$70,000+/year', npr: '(NPR 92+ Lakhs)', value: 'USD 70k+' }
            ],
            undecided: [
                { display: 'NPR 15-25 Lakhs/year', npr: '', value: 'NPR 15-25L' },
                { display: 'NPR 25-35 Lakhs/year', npr: '', value: 'NPR 25-35L' },
                { display: 'NPR 35-50 Lakhs/year', npr: '', value: 'NPR 35-50L' },
                { display: 'NPR 50-70 Lakhs/year', npr: '', value: 'NPR 50-70L' }
            ]
        };

        // Open modal
        function openAssessmentModal() {
            document.getElementById('assessmentModal').classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }

        // Close modal
        function closeAssessmentModal() {
            if (currentStep < totalSteps && currentStep > 1) {
                if (confirm('Are you sure you want to cancel the assessment? Your progress will be lost.')) {
                    resetModal();
                }
            } else {
                resetModal();
            }
        }

        function resetModal() {
            document.getElementById('assessmentModal').classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form after short delay
            setTimeout(() => {
                currentStep = 1;
                document.getElementById('formContainer').classList.remove('hidden');
                document.getElementById('successMessage').classList.add('hidden');
                // Hide all steps except first
                for(let i = 1; i <= totalSteps; i++) {
                    if(i === 1) {
                        document.getElementById(`step${i}`).classList.remove('hidden');
                    } else {
                        document.getElementById(`step${i}`).classList.add('hidden');
                    }
                }
                updateProgress();
                updateButtons();
            }, 300);
        }

        function selectCountry(country) {
            formData.country = country;
            nextStep();
        }

        function selectOption(field, value) {
            formData[field] = value;
            
            if (field === 'englishTest' && value !== 'Not yet taken') {
                document.getElementById('scoreInput').classList.remove('hidden');
            }
            
            if (!(field === 'englishTest' && value !== 'Not yet taken')) {
                setTimeout(() => nextStep(), 300);
            }
        }

        function nextStep() {
            if (currentStep === 4) {
                const scoreInput = document.getElementById('englishScore');
                if (scoreInput && !scoreInput.parentElement.classList.contains('hidden')) {
                    formData.englishScore = scoreInput.value;
                }
            }

            if (currentStep === 4) {
                const budgetContainer = document.getElementById('budgetOptions');
                const ranges = budgetRanges[formData.country] || budgetRanges.undecided;
                
                budgetContainer.innerHTML = ranges.map(budget => `
                    <button type="button" onclick="selectOption('budget', '${budget.value}')" class="p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all text-left">
                        <div class="flex flex-col">
                            <span class="text-base font-medium text-gray-800">${budget.display}</span>
                            ${budget.npr ? `<span class="text-sm text-gray-600 mt-1">${budget.npr}</span>` : ''}
                        </div>
                    </button>
                `).join('') + `
                    <button type="button" onclick="selectOption('budget', 'not_sure')" class="p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all text-left">
                        <span class="text-base font-medium text-gray-800">Not Sure / Need Guidance</span>
                    </button>
                    <button type="button" onclick="selectOption('budget', 'scholarship_required')" class="p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all text-left">
                        <span class="text-base font-medium text-gray-800">Need Scholarship to Afford</span>
                    </button>
                `;
            }

            if (currentStep < totalSteps) {
                document.getElementById(`step${currentStep}`).classList.add('hidden');
                currentStep++;
                document.getElementById(`step${currentStep}`).classList.remove('hidden');
                document.getElementById(`step${currentStep}`).classList.add('fade-in');
                updateProgress();
                updateButtons();
            }
        }

        function previousStep() {
            if (currentStep > 1) {
                document.getElementById(`step${currentStep}`).classList.add('hidden');
                currentStep--;
                document.getElementById(`step${currentStep}`).classList.remove('hidden');
                updateProgress();
                updateButtons();
            }
        }

        function updateProgress() {
            const progress = (currentStep / totalSteps) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function updateButtons() {
            const backBtn = document.getElementById('backBtn');
            const continueBtn = document.getElementById('continueBtn');
            const submitBtn = document.getElementById('submitBtn');

            if (currentStep > 1) {
                backBtn.classList.remove('hidden');
            } else {
                backBtn.classList.add('hidden');
            }

            if (currentStep === totalSteps) {
                continueBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                continueBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
        }

        async function submitForm() {
            formData.fullName = document.getElementById('fullName').value;
            formData.phone = document.getElementById('phone').value;
            formData.email = document.getElementById('email').value;

            if (!formData.fullName || !formData.phone || !formData.email) {
                alert('Please fill all required fields');
                return;
            }

            document.getElementById('submitText').classList.add('hidden');
            document.getElementById('submitLoading').classList.remove('hidden');
            document.getElementById('submitBtn').disabled = true;

            try {
                const sheetData = {
                    Name: formData.fullName,
                    Phone: formData.phone,
                    Email: formData.email,
                    Country: formData.country.toUpperCase(),
                    'Study Level': formData.studyLevel,
                    'Field of Study': formData.fieldOfStudy,
                    'English Test': formData.englishTest,
                    'English Score': formData.englishScore || 'N/A',
                    Budget: formData.budget,
                    'Intake Preference': formData.intake,
                    Timestamp: new Date().toLocaleString('en-US', { 
                        timeZone: 'Asia/Kathmandu',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                };

                await fetch(CONFIG.sheets.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sheetData)
                });

                const emailData = {
                    to_email: 'info@atosscnepal.com.np',
                    from_name: formData.fullName,
                    from_email: formData.email,
                    phone: formData.phone,
                    country: formData.country.toUpperCase(),
                    study_level: formData.studyLevel,
                    field_of_study: formData.fieldOfStudy,
                    english_test: formData.englishTest,
                    english_score: formData.englishScore || 'Not provided',
                    budget: formData.budget,
                    intake: formData.intake,
                    submission_time: new Date().toLocaleString('en-US', { 
                        timeZone: 'Asia/Kathmandu' 
                    })
                };

                await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        service_id: CONFIG.emailjs.serviceId,
                        template_id: CONFIG.emailjs.templateId,
                        user_id: CONFIG.emailjs.publicKey,
                        template_params: emailData
                    })
                });

                showSuccessMessage();
                
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please call us at +977-XXXX-XXXXXX or email info@atosscnepal.com.np');
                document.getElementById('submitText').classList.remove('hidden');
                document.getElementById('submitLoading').classList.add('hidden');
                document.getElementById('submitBtn').disabled = false;
            }
        }

        function showSuccessMessage() {
            document.getElementById('formContainer').classList.add('hidden');
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('displayPhone').textContent = formData.phone;
            
            // Start countdown
            let seconds = 5;
            const countdownEl = document.getElementById('countdown');
            const countdownInterval = setInterval(() => {
                seconds--;
                countdownEl.textContent = seconds;
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    resetModal();
                }
            }, 1000);
        }

        // Close modal when clicking outside
        document.getElementById('assessmentModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeAssessmentModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('assessmentModal');
                if (modal.classList.contains('active')) {
                    closeAssessmentModal();
                }
            }
        });