export const HFS_SCORING = {
  SUBSCALE_RANGES: {
    LOW: { min: 6, max: 18 },
    MEDIUM: { min: 19, max: 29 },
    HIGH: { min: 30, max: 42 },
  },
  TOTAL_RANGES: {
    LOW: { min: 18, max: 54 },
    MEDIUM: { min: 55, max: 89 },
    HIGH: { min: 90, max: 126 },
  },
  MAX_SCORES: {
    PER_SUBSCALE: 42,
    TOTAL: 126,
  },
};

export const HFS_INTERPRETATIONS = {
  TOTAL: {
    LOW: {
      level: "Rendah",
      color: "text-red-600",
      bg: "bg-red-50",
      interpretation:
        "Secara keseluruhan, anda cenderung tidak mudah memaafkan diri sendiri, orang lain, dan situasi yang tidak terkendali.",
    },
    MEDIUM: {
      level: "Sedang",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      interpretation:
        "Secara keseluruhan, anda cenderung memiliki perasaan yang sama antara memaafkan dan tidak memaafkan.",
    },
    HIGH: {
      level: "Tinggi",
      color: "text-green-600",
      bg: "bg-green-50",
      interpretation:
        "Secara keseluruhan, anda cenderung mudah memaafkan diri sendiri, orang lain, dan situasi yang tidak terkendali.",
    },
  },
  SUBSCALES: {
    self: {
      LOW: {
        level: "Rendah",
        color: "text-red-600",
        bg: "bg-red-50",
        interpretation: "Anda cenderung tidak mudah memaafkan diri sendiri.",
      },
      MEDIUM: {
        level: "Sedang",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        interpretation: "Anda cenderung memiliki perasaan yang sama antara memaafkan dan tidak memaafkan diri sendiri.",
      },
      HIGH: {
        level: "Tinggi",
        color: "text-green-600",
        bg: "bg-green-50",
        interpretation: "Anda cenderung mudah memaafkan diri sendiri.",
      },
    },
    others: {
      LOW: {
        level: "Rendah",
        color: "text-red-600",
        bg: "bg-red-50",
        interpretation: "Anda cenderung tidak mudah memaafkan orang lain.",
      },
      MEDIUM: {
        level: "Sedang",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        interpretation: "Anda cenderung memiliki perasaan yang sama antara memaafkan dan tidak memaafkan orang lain.",
      },
      HIGH: {
        level: "Tinggi",
        color: "text-green-600",
        bg: "bg-green-50",
        interpretation: "Anda cenderung mudah memaafkan orang lain.",
      },
    },
    situation: {
      LOW: {
        level: "Rendah",
        color: "text-red-600",
        bg: "bg-red-50",
        interpretation: "Anda cenderung tidak mudah memaafkan situasi yang tidak terkendali.",
      },
      MEDIUM: {
        level: "Sedang",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        interpretation:
          "Anda cenderung memiliki perasaan yang sama antara memaafkan dan tidak memaafkan situasi yang tidak terkendali.",
      },
      HIGH: {
        level: "Tinggi",
        color: "text-green-600",
        bg: "bg-green-50",
        interpretation: "Anda cenderung mudah memaafkan situasi yang tidak terkendali.",
      },
    },
  },
};

export const getSubscaleInterpretation = (score, subscale) => {
  const ranges = HFS_SCORING.SUBSCALE_RANGES;
  const interpretations = HFS_INTERPRETATIONS.SUBSCALES[subscale];

  if (score >= ranges.LOW.min && score <= ranges.LOW.max) {
    return interpretations.LOW;
  } else if (score >= ranges.MEDIUM.min && score <= ranges.MEDIUM.max) {
    return interpretations.MEDIUM;
  } else if (score >= ranges.HIGH.min && score <= ranges.HIGH.max) {
    return interpretations.HIGH;
  }

  // Default case
  return interpretations.LOW;
};

export const getTotalInterpretation = (totalScore) => {
  const ranges = HFS_SCORING.TOTAL_RANGES;
  const interpretations = HFS_INTERPRETATIONS.TOTAL;

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
