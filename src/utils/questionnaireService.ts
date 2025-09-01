// Questionnaire Service
// This service handles questionnaire data based on the questionnaire ID

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  options?: string[];
  required: boolean;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface QuestionnaireResponse {
  questionnaireId: string;
  answers: Record<string, string>;
  timestamp: Date;
  userId?: string;
}

// Mock questionnaire data - in a real app, this would come from an API
const QUESTIONNAIRES: Record<string, Questionnaire> = {
  "f9abbd99-4a16-4ff1-953b-b80bed2f8b28": {
    id: "f9abbd99-4a16-4ff1-953b-b80bed2f8b28",
    title: "Holiday Planning Questionnaire",
    description: "Help us understand your travel preferences to create the perfect holiday experience",
    questions: [
      {
        id: "destination",
        text: "What destination are you most interested in visiting?",
        type: "single_choice",
        options: ["Sri Lanka", "Maldives", "India", "Seychelles", "Mauritius", "Other"],
        required: true
      },
      {
        id: "travel_dates",
        text: "When are you planning to travel?",
        type: "single_choice",
        options: ["Within 1 month", "1-3 months", "3-6 months", "6-12 months", "More than 1 year"],
        required: true
      },
      {
        id: "group_size",
        text: "How many people will be traveling?",
        type: "single_choice",
        options: ["Just me", "2 people", "3-4 people", "5-6 people", "More than 6 people"],
        required: true
      },
      {
        id: "budget",
        text: "What's your approximate budget per person?",
        type: "single_choice",
        options: ["Under £1,000", "£1,000 - £2,000", "£2,000 - £3,000", "£3,000 - £5,000", "Over £5,000"],
        required: true
      },
      {
        id: "accommodation",
        text: "What type of accommodation do you prefer?",
        type: "multiple_choice",
        options: ["Luxury hotels", "Boutique hotels", "Resorts", "Villas", "Eco-lodges", "Budget hotels"],
        required: true
      },
      {
        id: "activities",
        text: "What activities interest you most?",
        type: "multiple_choice",
        options: ["Beach relaxation", "Cultural tours", "Adventure sports", "Wildlife safaris", "Food experiences", "Historical sites", "Wellness & spa"],
        required: true
      },
      {
        id: "special_requirements",
        text: "Do you have any special requirements or preferences?",
        type: "text",
        required: false
      }
    ]
  }
};

export class QuestionnaireService {
  /**
   * Fetch questionnaire by ID
   */
  static async getQuestionnaire(questionnaireId: string): Promise<Questionnaire | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const questionnaire = QUESTIONNAIRES[questionnaireId];
    return questionnaire || null;
  }

  /**
   * Submit questionnaire responses
   */
  static async submitQuestionnaire(response: QuestionnaireResponse): Promise<{ success: boolean; message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would save to a database
    console.log("Questionnaire submitted:", response);
    
    // Simulate success response
    return {
      success: true,
      message: "Thank you for completing the questionnaire! Our specialist will contact you within 24 hours with your personalized holiday quote."
    };
  }

  /**
   * Get all available questionnaires
   */
  static async getAllQuestionnaires(): Promise<Questionnaire[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return Object.values(QUESTIONNAIRES);
  }

  /**
   * Validate questionnaire response
   */
  static validateResponse(questionnaire: Questionnaire, answers: Record<string, string>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    questionnaire.questions.forEach(question => {
      if (question.required && !answers[question.id]) {
        errors.push(`Question "${question.text}" is required`);
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default QuestionnaireService;
