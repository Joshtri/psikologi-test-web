// utils/hfsScoring.js

/**
 * Fungsi untuk mengonversi jawaban individu pada skala HFS
 * berdasarkan apakah item tersebut favorable atau unfavorable.
 *
 * @param {Object} question - Objek pertanyaan dari skala HFS
 * @param {number|string} answer - Nilai jawaban dari pengguna (1-7)
 * @returns {number} skor hasil konversi sesuai aturan HFS
 */
export function convertHfsScore(question, answer) {
  const value = parseInt(answer);
  if (isNaN(value) || value < 1 || value > 7) return 0;

  if (question.label === "favorable") {
    return value;
  }

  if (question.label === "unfavorable") {
    return 8 - value;
  }

  // fallback
  return 0;
}

/**
 * Fungsi pembantu untuk menghitung total skor HFS dari seluruh jawaban
 *
 * @param {Array} questions - Daftar pertanyaan HFS (18 item)
 * @param {Object} answers - Jawaban pengguna dengan key: "hfs-<id>", value: 1-7
 * @returns {Object} total dan skor per subskala (self, others, situation)
 */
export function calculateHfsTotalScore(questions, answers) {
  let total = 0;
  const subscales = {
    self: 0,
    others: 0,
    situation: 0,
  };

  for (const q of questions) {
    const answer = answers[`hfs-${q.id}`];
    const score = convertHfsScore(q, answer);

    // Tambahkan log untuk debug:
    console.log(
      `Item ${q.id} (${q.label} - ${q.subscale}): Jawaban = ${answer}, Skor = ${score}`
    );

    total += score;
    if (q.subscale && subscales[q.subscale] !== undefined) {
      subscales[q.subscale] += score;
    }
  }

  return {
    total,
    ...subscales,
  };
}

export function interpretHfsScore(scoreObj) {
  const { total, self, others, situation } = scoreObj;

  const interpretSubscale = (label, value) => {
    if (value >= 6 && value <= 18)
      return `anda biasanya tidak mudah memaafkan ${label}.`;
    if (value >= 19 && value <= 29)
      return `anda memiliki kemungkinan untuk memaafkan sama besar dengan kemungkinan untuk tidak memaafkan ${label}.`;
    if (value >= 30 && value <= 42)
      return `anda biasanya mudah memaafkan ${label}.`;
    return `skor ${label} tidak valid.`;
  };

  let totalInterpretation = "";
  if (total >= 18 && total <= 54) {
    totalInterpretation =
      "anda biasanya tidak mudah memaafkan diri sendiri, orang lain, dan situasi yang tidak dapat dikendalikan.";
  } else if (total >= 55 && total <= 89) {
    totalInterpretation =
      "anda memiliki kemungkinan untuk memaafkan sama besar dengan kemungkinan untuk tidak memaafkan diri sendiri, orang lain, dan situasi yang tidak dapat dikendalikan.";
  } else if (total >= 90 && total <= 126) {
    totalInterpretation =
      "anda biasanya mudah memaafkan diri sendiri, orang lain, dan situasi yang tidak dapat dikendalikan.";
  } else {
    totalInterpretation =
      "nilai total di luar rentang yang dapat diinterpretasi.";
  }

  return {
    total: {
      value: total,
      inference: totalInterpretation,
    },
    self: {
      value: self,
      inference: interpretSubscale("diri sendiri", self),
    },
    others: {
      value: others,
      inference: interpretSubscale("orang lain", others),
    },
    situation: {
      value: situation,
      inference: interpretSubscale("keadaan", situation),
    },
  };
}
