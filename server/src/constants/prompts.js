export const resumeParserPrompt = (resumeText) => `You are an expert resume parser. Extract structured data from this resume text.

RESUME TEXT:
${resumeText}

Parse the resume and extract ALL information into this EXACT JSON format:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedIn": "",
    "portfolio": ""
  },
  "summary": "professional summary text if present",
  "experience": [
    {
      "company": "",
      "role": "",
      "startDate": "YYYY-MM format",
      "endDate": "YYYY-MM format or empty if current",
      "current": false,
      "bullets": ["bullet point 1", "bullet point 2"]
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "",
      "endDate": "",
      "gpa": ""
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1"],
    "languages": ["English"]
  },
  "projects": [],
  "certifications": []
}

Extract EVERYTHING you can find. Convert dates to YYYY-MM format. If information is missing, leave as empty string or empty array. Respond ONLY with valid JSON.`;