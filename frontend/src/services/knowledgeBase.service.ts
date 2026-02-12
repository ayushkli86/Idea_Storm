/**
 * Knowledge Base Service
 * Handles Q&A matching and response generation for the chatbot
 */

interface KnowledgeBase {
  categories: Record<string, string[]>;
}

interface Responses {
  responses: Record<string, {
    answers: string[];
    type: string;
  }>;
  fallback_responses: string[];
}

class KnowledgeBaseService {
  private questions: KnowledgeBase | null = null;
  private answers: Responses | null = null;
  
  // Blacklist for medical advice categories
  private blacklistedCategories = [
    'medicine_safety',
    'medicine_storage',
    'medicine_usage',
    'expired_medicine',
    'pregnancy_breastfeeding',
    'children_medicine',
    'allergies',
    'interactions',
    'emergency',
    'general_health'
  ];

  /**
   * Initialize the knowledge base by loading Q&A data
   */
  async initialize(): Promise<void> {
    try {
      // In a real implementation, these would be loaded from the backend
      // For now, we'll use inline data
      this.questions = await this.loadQuestions();
      this.answers = await this.loadAnswers();
    } catch (error) {
      console.error('Failed to initialize knowledge base:', error);
    }
  }

  /**
   * Load questions from knowledge base
   */
  private async loadQuestions(): Promise<KnowledgeBase> {
    // This would typically fetch from an API
    // For now, returning inline data structure
    return {
      categories: {
        greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'how are you'],
        medicine_safety: ['is this medicine safe', 'can i take this medicine', 'is it safe to use', 'will this harm me', 'are there side effects'],
        medicine_storage: ['how to store medicine', 'where should i keep medicines', 'storage temperature', 'can i keep in fridge'],
        medicine_usage: ['how to take medicine', 'when to take medicine', 'before food or after food', 'dosage instructions'],
        expired_medicine: ['expired medicine', 'can i use expired medicine', 'what to do with expired medicine'],
        counterfeit_detection: ['how to identify fake medicine', 'counterfeit medicine signs', 'fake drug detection'],
        pregnancy_breastfeeding: ['medicine during pregnancy', 'safe for pregnant women', 'breastfeeding and medicine'],
        children_medicine: ['medicine for children', 'kids medicine dosage', 'safe for babies'],
        allergies: ['medicine allergy', 'allergic reaction', 'what if i am allergic'],
        interactions: ['medicine interaction', 'can i take with other medicines', 'drug interaction'],
        emergency: ['overdose', 'took too much medicine', 'emergency', 'poisoning'],
        verification: ['verify medicine', 'check authenticity', 'is this original', 'scan qr code'],
        general_health: ['headache remedy', 'fever treatment', 'cold and flu', 'stomach pain']
      }
    };
  }

  /**
   * Load answers from knowledge base
   */
  private async loadAnswers(): Promise<Responses> {
    return {
      responses: {
        greetings: {
          answers: [
            "Hello! 👋 I'm your MediChain assistant. I can help you verify medicines and answer questions about pharmaceutical safety. How can I assist you today?",
            "Hi there! 😊 I'm here to help you with medicine verification and safety information. What would you like to know?",
            "Namaste! 🙏 Welcome to MediChain. I can help you check medicine authenticity and answer health-related questions. How may I help you?"
          ],
          type: 'greeting'
        },
        medicine_safety: {
          answers: [
            "🛡️ Medicine Safety Check:\n\n1. Always verify the medicine using our QR code scanner\n2. Check the expiry date on the packaging\n3. Look for proper seals and packaging\n4. Consult your doctor or pharmacist\n5. Report any suspicious medicines immediately\n\nWould you like me to verify a specific medicine for you? Just provide the product ID or scan the QR code!"
          ],
          type: 'informational'
        },
        medicine_storage: {
          answers: [
            "📦 Proper Medicine Storage:\n\n✅ DO:\n• Store in a cool, dry place (15-25°C)\n• Keep away from direct sunlight\n• Store in original packaging\n• Keep out of reach of children\n• Check storage instructions on label\n\n❌ DON'T:\n• Store in bathroom (humidity damages medicines)\n• Keep near heat sources\n• Mix different medicines in one container\n• Remove from original packaging\n\n💡 Tip: Some medicines need refrigeration - always check the label!"
          ],
          type: 'informational'
        },
        medicine_usage: {
          answers: [
            "💊 Medicine Usage Guidelines:\n\n1. Follow Doctor's Prescription: Always take as prescribed\n2. Timing: Check if before/after food\n3. Dosage: Never exceed recommended dose\n4. Duration: Complete the full course\n5. Water: Take with adequate water unless specified\n\n⏰ Common Timings:\n• Before food: 30 mins before meals\n• After food: 30 mins after meals\n• Empty stomach: 1 hour before or 2 hours after food\n\n⚠️ Always read the medicine label and follow your doctor's instructions!"
          ],
          type: 'informational'
        },
        expired_medicine: {
          answers: [
            "⏰ Expired Medicine - Important Information:\n\n🚨 NEVER use expired medicines!\n\nWhy?\n• Reduced effectiveness\n• Potential harmful chemical changes\n• Risk of bacterial growth\n• May cause adverse reactions\n\n✅ What to do:\n1. Check expiry date regularly\n2. Dispose of expired medicines safely\n3. Return to pharmacy for proper disposal\n4. Don't flush down toilet or throw in trash\n5. Get fresh prescription from doctor\n\n💡 Tip: Check your medicine cabinet every 6 months!"
          ],
          type: 'warning'
        },
        counterfeit_detection: {
          answers: [
            "🔍 How to Identify Counterfeit Medicines:\n\n🚨 Warning Signs:\n• Suspiciously low price\n• Poor quality packaging\n• Spelling mistakes on label\n• No batch number or expiry date\n• Unusual color, smell, or taste\n• Broken or tampered seals\n• No manufacturer information\n\n✅ Verification Steps:\n1. Use our QR code scanner\n2. Check hologram/security features\n3. Verify batch number with manufacturer\n4. Buy only from licensed pharmacies\n5. Report suspicious medicines to authorities\n\n💡 Use MediChain to verify authenticity instantly!"
          ],
          type: 'warning'
        },
        pregnancy_breastfeeding: {
          answers: [
            "🤰 Medicine During Pregnancy & Breastfeeding:\n\n⚠️ CRITICAL: Always consult your doctor first!\n\nGeneral Guidelines:\n• Many medicines are NOT safe during pregnancy\n• Some medicines pass through breast milk\n• Risk varies by trimester\n• Natural doesn't always mean safe\n\n✅ Safe Practices:\n1. Inform doctor about pregnancy/breastfeeding\n2. Use only prescribed medicines\n3. Avoid self-medication\n4. Read medicine labels carefully\n5. Report any side effects immediately\n\n🚨 Emergency? Contact your healthcare provider right away!\n\nNote: This is general information. Always consult your doctor for personalized advice."
          ],
          type: 'warning'
        },
        children_medicine: {
          answers: [
            "👶 Children's Medicine Safety:\n\n⚠️ Special Precautions Needed!\n\nKey Points:\n• Dosage based on weight/age\n• Never give adult medicines to children\n• Use measuring devices (not spoons)\n• Keep medicines locked away\n• Avoid aspirin for children under 16\n\n✅ Safety Tips:\n1. Always follow pediatrician's advice\n2. Double-check dosage\n3. Use child-resistant caps\n4. Never call medicine 'candy'\n5. Store out of reach and sight\n\n🚨 Overdose Emergency:\nCall poison control or emergency services immediately!\n\n💡 Keep emergency numbers handy!"
          ],
          type: 'warning'
        },
        allergies: {
          answers: [
            "🚨 Medicine Allergies - Important Information:\n\nCommon Allergy Symptoms:\n• Skin rash or hives\n• Itching\n• Swelling (face, lips, tongue)\n• Difficulty breathing\n• Dizziness or fainting\n\n⚠️ Severe Reaction (Anaphylaxis):\n• Seek emergency help immediately!\n• Use EpiPen if prescribed\n• Call emergency services\n\n✅ Prevention:\n1. Inform doctors about all allergies\n2. Wear medical alert bracelet\n3. Read medicine labels carefully\n4. Keep allergy list updated\n5. Carry emergency medication if prescribed\n\n💡 Always do an allergy test for new medicines under medical supervision!"
          ],
          type: 'warning'
        },
        interactions: {
          answers: [
            "⚠️ Medicine Interactions:\n\nDangerous Combinations:\n• Medicine + Medicine\n• Medicine + Food\n• Medicine + Alcohol\n• Medicine + Supplements\n\n🚨 Common Interactions:\n• Blood thinners + Aspirin\n• Antibiotics + Dairy products\n• Painkillers + Alcohol\n• Antidepressants + certain foods\n\n✅ Safety Steps:\n1. Tell doctor about ALL medicines you take\n2. Include vitamins and supplements\n3. Use one pharmacy for all prescriptions\n4. Read medicine information leaflets\n5. Ask pharmacist about interactions\n\n💡 Keep a list of all your medicines and show it to every healthcare provider!"
          ],
          type: 'warning'
        },
        emergency: {
          answers: [
            "🚨 MEDICAL EMERGENCY - ACT IMMEDIATELY!\n\nOverdose/Poisoning:\n1. Call Emergency Services: 102 (India) / 911 (US)\n2. Call Poison Control: 1800-11-4088 (India)\n3. Don't wait for symptoms\n4. Don't induce vomiting unless told\n5. Keep medicine packaging with you\n\nImportant Information to Provide:\n• What was taken\n• How much\n• When it was taken\n• Person's age and weight\n• Current symptoms\n\n⚠️ While Waiting for Help:\n• Keep person calm and comfortable\n• Monitor breathing\n• Don't give anything by mouth\n• Save medicine container\n\n🚨 THIS IS AN EMERGENCY - SEEK PROFESSIONAL HELP IMMEDIATELY!"
          ],
          type: 'emergency'
        },
        verification: {
          answers: [
            "🔍 Medicine Verification with MediChain:\n\nHow to Verify:\n1. Scan QR Code on medicine packaging\n2. Or enter Product ID (e.g., MED-AUTH001)\n3. Get instant verification results\n\n✅ What We Check:\n• Database authenticity\n• Blockchain verification\n• Expiry date validation\n• Manufacturer information\n• Batch number verification\n\nVerification Results:\n✅ AUTHENTIC - Safe to use\n🚨 COUNTERFEIT - Do NOT use, report immediately\n⏰ EXPIRED - Dispose safely\n⚠️ SUSPICIOUS - Contact manufacturer\n\n💡 Try it now! Type a product ID or say 'verify MED-AUTH001'"
          ],
          type: 'informational'
        },
        general_health: {
          answers: [
            "🏥 General Health Tips:\n\nCommon Ailments:\n\n🤒 Fever:\n• Rest and stay hydrated\n• Use fever-reducing medicine if needed\n• Consult doctor if fever persists >3 days\n\n🤧 Cold & Flu:\n• Drink warm fluids\n• Get adequate rest\n• Use steam inhalation\n• Consult doctor if symptoms worsen\n\n💊 When to See a Doctor:\n• High fever (>103°F)\n• Symptoms lasting >1 week\n• Severe pain\n• Difficulty breathing\n• Unusual symptoms\n\n⚠️ This is general information only. Always consult a healthcare professional for proper diagnosis and treatment!"
          ],
          type: 'informational'
        }
      },
      fallback_responses: [
        "I'm here to help with medicine verification and pharmaceutical safety. Could you please rephrase your question or ask about:\n• Medicine verification\n• Medicine safety\n• Storage guidelines\n• Usage instructions\n• Counterfeit detection",
        "I specialize in medicine-related queries. For the best assistance, please ask about:\n• Verifying medicine authenticity\n• Medicine safety information\n• Proper storage and usage\n• Identifying counterfeit medicines\n\nWhat would you like to know?",
        "I'm your medicine safety assistant! I can help you with:\n✅ Medicine verification\n✅ Safety information\n✅ Storage guidelines\n✅ Usage instructions\n✅ Counterfeit detection\n\nHow can I assist you today?"
      ]
    };
  }

  /**
   * Find the best matching category for a user message
   */
  findMatchingCategory(message: string): string | null {
    if (!this.questions) return null;

    const lowerMessage = message.toLowerCase();
    let bestMatch: string | null = null;
    let highestScore = 0;

    for (const [category, keywords] of Object.entries(this.questions.categories)) {
      let score = 0;
      for (const keyword of keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          score += keyword.split(' ').length; // Longer phrases get higher scores
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = category;
      }
    }

    return highestScore > 0 ? bestMatch : null;
  }

  /**
   * Get response for a user message
   */
  getResponse(message: string): string {
    if (!this.answers) {
      return "I'm still learning. Please try again in a moment.";
    }

    const category = this.findMatchingCategory(message);
    
    // Check if category is blacklisted (medical advice)
    if (category && this.blacklistedCategories.includes(category)) {
      return "I cannot provide medical advice. Please consult a healthcare professional or pharmacist for medical questions.";
    }
    
    if (category && this.answers.responses[category]) {
      const categoryData = this.answers.responses[category];
      const randomIndex = Math.floor(Math.random() * categoryData.answers.length);
      return categoryData.answers[randomIndex];
    }

    // Return random fallback response
    const randomIndex = Math.floor(Math.random() * this.answers.fallback_responses.length);
    return this.answers.fallback_responses[randomIndex];
  }
}

// Export singleton instance
export const knowledgeBaseService = new KnowledgeBaseService();
