export const ACE_SCORING = {
  CATEGORY_SCORING: {
    "Emotional Neglect": {
      "Selalu": 0,
      "Sering": 0,
      "Kadang-kadang": 0,
      "Jarang": 1,
      "Tidak pernah": 1
    },
    "Physical Neglect": {
      "Seringkali": 1,
      "Beberapa kali": 0,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Emotional Abuse": {
      "Seringkali": 1,
      "Beberapa kali": 1,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Physical Abuse": {
      "Seringkali": 1,
      "Beberapa kali": 1,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Contact Sexual Abuse": {
      "Seringkali": 1,
      "Beberapa kali": 1,
      "Satu kali": 1,
      "Tidak pernah": 0
    },
    "Alcohol and/or drug abuser in the household": {
      "Ya": 1,
      "Tidak": 0
    },
    "Someone chronically depressed, mentally ill, institutionalized, or suicidal": {
      "Ya": 1,
      "Tidak": 0
    },
    "Incarcerated household member": {
      "Ya": 1,
      "Tidak": 0
    },
    "One or no parents, parental separation, or divorce": {
      "Ya": 1,
      "Tidak": 0
    },
    "Household member treated violently": {
      // Default scoring for questions 20-21
      "Seringkali": 1,
      "Beberapa kali": 1,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Bullying": {
      "Seringkali": 1,
      "Beberapa kali": 0,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Community Violence": {
      "Seringkali": 1,
      "Beberapa kali": 0,
      "Satu kali": 0,
      "Tidak pernah": 0
    },
    "Collective Violence": {
      "Seringkali": 1,
      "Beberapa kali": 1,
      "Satu kali": 1,
      "Tidak pernah": 0
    }
  },
  // Special scoring for question 19 (Household member treated violently)
  QUESTION_19_SCORING: {
    "Seringkali": 1,
    "Beberapa kali": 0,
    "Satu kali": 0,
    "Tidak pernah": 0
  },
  THRESHOLD: 1
};

export const ACE_INTERPRETATIONS = {
  HAS_EXPERIENCES: {
    color: "text-red-600",
    bg: "bg-red-50"
  },
  NO_EXPERIENCES: {
    color: "text-green-600",
    bg: "bg-green-50",
    interpretation: "Anda tidak pernah melewati pengalaman traumatis masa kecil yang signifikan"
  }
};

export const getAceInterpretation = (categoryScores) => {
  const experiencedCategories = [];
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= ACE_SCORING.THRESHOLD) {
      experiencedCategories.push(category);
    }
  });

  return experiencedCategories;
};