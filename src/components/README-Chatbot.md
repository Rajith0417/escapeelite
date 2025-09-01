# Chatbot Component with Questionnaire Integration

## Overview
The Chatbot component now properly integrates with the questionnaire system using the provided questionnaire ID `f9abbd99-4a16-4ff1-953b-b80bed2f8b28`.

## How the Questionnaire ID is Used

### 1. **Questionnaire Loading**
- The component receives a `questionnaireId` prop (defaults to `"f9abbd99-4a16-4ff1-953b-b80bed2f8b28"`)
- On component mount, it calls `QuestionnaireService.getQuestionnaire(questionnaireId)` to fetch the questionnaire data
- The questionnaire data includes questions, options, and validation rules

### 2. **Questionnaire Flow**
When a user clicks "Yes, let's build my dream holiday!":
1. The chatbot activates questionnaire mode (`isQuestionnaireActive = true`)
2. It starts with the first question from the loaded questionnaire
3. Each question is displayed with its predefined options as clickable buttons
4. User responses are stored in the `answers` state object
5. The bot progresses through all questions sequentially

### 3. **Data Collection**
- Each answer is stored with the question ID as the key
- The questionnaire tracks progress with `currentQuestionIndex`
- All answers are collected in the `answers` state object

### 4. **Questionnaire Submission**
When the questionnaire is completed:
- All answers are packaged into a `QuestionnaireResponse` object
- The response includes:
  - `questionnaireId`: The original questionnaire ID
  - `answers`: All user responses
  - `timestamp`: When the questionnaire was completed
- The response is submitted via `QuestionnaireService.submitQuestionnaire()`

### 5. **Questionnaire Structure**
The questionnaire with ID `f9abbd99-4a16-4ff1-953b-b80bed2f8b28` includes:
- **Destination preference** (single choice)
- **Travel dates** (single choice)
- **Group size** (single choice)
- **Budget range** (single choice)
- **Accommodation type** (multiple choice)
- **Activities** (multiple choice)
- **Special requirements** (text input)

## Technical Implementation

### Files Created/Modified:
1. **`src/components/Chatbot.tsx`** - Main chatbot component with questionnaire integration
2. **`src/utils/questionnaireService.ts`** - Service for managing questionnaire data and submissions

### Key Features:
- ✅ Questionnaire ID is properly used to load specific questionnaire data
- ✅ Dynamic question flow based on the loaded questionnaire
- ✅ Answer collection and validation
- ✅ Questionnaire submission with the original ID
- ✅ Fallback to regular chat if questionnaire fails to load
- ✅ Console logging for debugging questionnaire flow

### Usage Example:
```tsx
<Chatbot questionnaireId="f9abbd99-4a16-4ff1-953b-b80bed2f8b28" />
```

The questionnaire ID is now fully integrated and functional in the chatbot component!
