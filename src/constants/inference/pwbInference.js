export const PWB_SCORING = {
  RANGES: {
    LOW: { min: 4, max: 81 },
    MEDIUM: { min: 82, max: 122 },
    HIGH: { min: 123, max: 168 }
  },
  MAX_SCORES: {
    TOTAL: 168 // 42 questions × 4 max score
  },
  SCALE_MAPPING: {
    FAVORABLE: {
      "TP": 1,
      "KK": 2,
      "S": 3,
      "SS": 4
    },
    UNFAVORABLE: {
      "TP": 4,
      "KK": 3,
      "S": 2,
      "SS": 1
    }
  }
};

export const PWB_INTERPRETATIONS = {
  LOW: {
    level: "Rendah",
    color: "text-red-600",
    bg: "bg-red-50",
    interpretation: "Anda Memiliki Kesejahteraan Psikologi Rendah"
  },
  MEDIUM: {
    level: "Sedang",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    interpretation: "Anda Cukup Sejahtera Secara Psikologis"
  },
  HIGH: {
    level: "Tinggi",
    color: "text-green-600",
    bg: "bg-green-50",
    interpretation: "Anda Sangat Sejahtera Secara Psikologis"
  }
};

export const getPwbInterpretation = (totalScore) => {
  const ranges = PWB_SCORING.RANGES;
  const interpretations = PWB_INTERPRETATIONS;

  if (totalScore >= ranges.LOW.min && totalScore <= ranges.LOW.max) {
    return interpretations.LOW;
  } else if (totalScore >= ranges.MEDIUM.min && totalScore <= ranges.MEDIUM.max) {
    return interpretations.MEDIUM;
  } else if (totalScore >= ranges.HIGH.min && totalScore <= ranges.HIGH.max) {
    return interpretations.HIGH;
  }
  
  // Default case
  return interpretations.LOW;
};