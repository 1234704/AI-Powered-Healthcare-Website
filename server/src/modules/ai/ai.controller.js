const config = require('../../config/env');
const apiResponse = require('../../utils/apiResponse');

exports.checkSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;

        // 1. Validation: Ensure symptoms are provided
        if (!symptoms || symptoms.trim().length < 5) {
            return apiResponse(res, 400, "Please provide a detailed description of your symptoms.");
        }

        const apiKey = config.AI_API_KEY;
        console.log("AI Engine Status:", apiKey ? "External Key Active ✅" : "Internal Rules Active ⚠️");

       
        
        let result = {
            department: "General Physician",
            urgency: "Moderate",
            advice: "Please consult a doctor for a physical examination."
        };

        const input = symptoms.toLowerCase();

        if (input.includes("chest") || input.includes("heart") || input.includes("breath")) {
            result = {
                department: "Cardiology",
                urgency: "High",
                advice: "Seek immediate attention if you feel severe pressure or shortness of breath."
            };
        } else if (input.includes("skin") || input.includes("rash") || input.includes("itch")) {
            result = {
                department: "Dermatology",
                urgency: "Low",
                advice: "Avoid scratching the area and keep it clean."
            };
        } else if (input.includes("bone") || input.includes("fracture") || input.includes("joint")) {
            result = {
                department: "Orthopedics",
                urgency: "Medium",
                advice: "Rest the affected area and apply ice if there is swelling."
            };
        } else if (input.includes("tooth") || input.includes("gum") || input.includes("mouth")) {
            result = {
                department: "Dentistry",
                urgency: "Normal",
                advice: "Rinse with warm salt water and avoid very cold or hot foods."
            };
        }

        return apiResponse(res, 200, "Symptom analysis complete", result);

    } catch (error) {
        console.error("AI Controller Error:", error);
        return apiResponse(res, 500, "An error occurred while processing your symptoms.");
    }
};