// utils/pwbScoring.js

/**
 * Konversi skor berdasarkan label dan jawaban pengguna.
 * @param {Object} question - objek pertanyaan (punya label dan category)
 * @param {string} answer - jawaban pengguna, misalnya "TP", "KK", "S", "SS"
 * @param {Object} scale - objek skala yang punya scoring.favorable dan unfavorable
 * @returns {number} skor hasil konversi
 */
export function convertPwbScore(question, answer, scale) {
  if (!answer || !scale?.scoring) return 0;

  const { favorable, unfavorable } = scale.scoring;

  if (question.label === "favorable") {
    return favorable[answer] ?? 0;
  }
  if (question.label === "unfavorable") {
    return unfavorable[answer] ?? 0;
  }

  return 0;
}

/**
 * Hitung total skor dan per kategori (6 domain: Kemandirian, Tujuan Hidup, dll.)
 * @param {Array} questions - daftar pertanyaan PWB
 * @param {Object} answers - key: "pwb-<id>", value: "TP", "KK", dst
 * @param {Object} scale - objek skala dari JSON (punya scoring)
 * @returns {Object} total skor dan per kategori
 */
export function calculatePwbTotalScore(questions, answers, scale) {
  const result = {
    total: 0,
    categoryScores: {},
  };

  for (const q of questions) {
    const key = `pwb-${q.id}`;
    const answer = answers[key];
    const score = convertPwbScore(q, answer, scale);

    result.total += score;

    if (!result.categoryScores[q.category]) {
      result.categoryScores[q.category] = 0;
    }
    result.categoryScores[q.category] += score;
  }

  return result;
}
