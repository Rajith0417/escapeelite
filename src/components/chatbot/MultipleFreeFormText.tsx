// "use client"
// import React, { useEffect, useState } from "react";

// function MultipleFreeFormText() {
//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   if (!currentQuestion?.responseDomain?.textFields) {
//     return <div>No form fields configured</div>;
//   }

//   const textFields = currentQuestion.responseDomain.textFields;

//   // Initialize form data
//   useEffect(() => {
//     const initialData: Record<string, string> = {};
//     textFields.forEach((field) => {
//       initialData[field.id] = "";
//     });
//     setFormData(initialData);
//   }, [currentQuestion]);

//   const handleInputChange = (fieldId: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [fieldId]: value }));
    
//     // Clear error for this field
//     setErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[fieldId];
//       return newErrors;
//     });
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};
//     let isValid = true;

//     textFields.forEach((field) => {
//       const value = formData[field.id] || "";
      
//       // Check required field
//       if (field.required && !value.trim()) {
//         newErrors[field.id] = "This field is required";
//         isValid = false;
//       }
      
//       // Email validation
//       if (field.type === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
//         newErrors[field.id] = "Please enter a valid email address";
//         isValid = false;
//       }
      
//       // Phone number validation (basic)
//       if (field.type === "tel" && value && !/^[+]?[\d\s\-()]+$/.test(value)) {
//         newErrors[field.id] = "Please enter a valid phone number";
//         isValid = false;
//       }
      
//       // Min length validation
//       if (field.validation?.minLength && value.length < field.validation.minLength) {
//         newErrors[field.id] = `Must be at least ${field.validation.minLength} characters`;
//         isValid = false;
//       }
      
//       // Max length validation
//       if (field.validation?.maxLength && value.length > field.validation.maxLength) {
//         newErrors[field.id] = `Must be at most ${field.validation.maxLength} characters`;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       // Format the answer as an object with field labels and values
//       const answer: Record<string, string> = {};
//       textFields.forEach((field) => {
//         answer[field.label] = formData[field.id] || "";
//       });
      
//       sendAnswer(JSON.stringify(answer));
//     }
//   };

//   return (
//     <div className="p-4 border-t bg-gray-50 space-y-4">
//       {textFields.map((field) => (
//         <div key={field.id} className="space-y-1">
//           <label className="block text-sm font-medium text-gray-700">
//             {field.label}
//             {field.required && <span className="text-red-500">*</span>}
//           </label>
//           <input
//             type={field.type || "text"}
//             value={formData[field.id] || ""}
//             onChange={(e) => handleInputChange(field.id, e.target.value)}
//             placeholder={field.placeholder || ""}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             aria-invalid={!!errors[field.id]}
//             aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
//           />
//           {errors[field.id] && (
//             <p id={`${field.id}-error`} className="text-xs text-red-500">
//               {errors[field.id]}
//             </p>
//           )}
//         </div>
//       ))}
      
//       <button
//         onClick={handleSubmit}
//         disabled={isLoading}
//         className="px-6 py-2.5 bg-white text-blue-400 rounded-full border border-blue-400 hover:bg-blue-50 disabled:opacity-50 mt-4"
//       >
//         {isLoading ? "..." : "Submit"}
//       </button>
//     </div>
//   );
// };

// export default MultipleFreeFormText
