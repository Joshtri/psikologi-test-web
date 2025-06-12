// utils/testUtils.js
export const generateAllQuestions = (test) => {
  if (!test) return [];
  return test.questions.map((q) => ({
    ...q,
    category: test.id,
    scale: test.scale?.max ?? 4,
  }));
};

export const getCurrentPageQuestions = (allQuestions, currentPage, perPage) => {
  const start = currentPage * perPage;
  const end = start + perPage;
  return allQuestions.slice(start, end);
};

export const getTotalProgress = (answers, totalQuestions) => {
  if (!answers || typeof answers !== "object") return 0;
  const totalAnswered = Object.keys(answers).length;
  return Math.round((totalAnswered / totalQuestions) * 100);
};

export const getAnsweredCount = (currentQuestions, answers) => {
  return currentQuestions.filter((q) => answers[q.id] !== undefined).length;
};
