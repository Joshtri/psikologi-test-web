export const PDQ_SCORING = {
  SCALE_MAPPING: {
    true: 1,
    false: 0,
  },
  DISORDER_THRESHOLD: 5,
};

export const PDQ_INTERPRETATIONS = {
  DISORDER_COLORS: {
    Histrionik: "#d5a6bd",
    Narcissistic: "#fff2cc",
    Borderline: "#f1c232",
    Antisocial: "#b6d7a8",
  },
  NO_DISORDER: {
    level: "Tidak Terindikasi",
    color: "text-green-600",
    bg: "bg-green-50",
    interpretation: "Anda tidak memiliki kecenderungan disorder apapun",
  },
};

export const getPdqInterpretation = (labelScores) => {
  const disordersFound = [];

  Object.entries(labelScores).forEach(([label, score]) => {
    if (label && score >= PDQ_SCORING.DISORDER_THRESHOLD) {
      disordersFound.push(label);
    }
  });

  return disordersFound;
};
