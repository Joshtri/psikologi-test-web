// import { convertHfsScore, calculateHfsTotalScore } from './utils/hfsScoring.js';

// import {
//   calculateHfsTotalScore,
//   convertHfsScore,
// } from "/src/utils/rules/hfsScoring";

import {
  calculateHfsTotalScore,
  interpretHfsScore,
} from "./src/utils/rules/hfsScoring.js";

// --- Data pertanyaan dari JSON (disingkat, hanya 5 contoh item)
const hfsQuestions = [
  { id: 1, label: "favorable", subscale: "self" },
  { id: 2, label: "unfavorable", subscale: "self" },
  { id: 3, label: "favorable", subscale: "self" },
  { id: 4, label: "unfavorable", subscale: "self" },
  { id: 5, label: "favorable", subscale: "self" },
  { id: 6, label: "unfavorable", subscale: "self" },
  { id: 7, label: "unfavorable", subscale: "others" },
  { id: 8, label: "favorable", subscale: "others" },
  { id: 9, label: "unfavorable", subscale: "others" },
  { id: 10, label: "favorable", subscale: "others" },
  { id: 11, label: "unfavorable", subscale: "others" },
  { id: 12, label: "favorable", subscale: "others" },
  { id: 13, label: "unfavorable", subscale: "situation" },
  { id: 14, label: "favorable", subscale: "situation" },
  { id: 15, label: "unfavorable", subscale: "situation" },
  { id: 16, label: "favorable", subscale: "situation" },
  { id: 17, label: "unfavorable", subscale: "situation" },
  { id: 18, label: "favorable", subscale: "situation" },
];

// --- Jawaban dummy: user isi angka dari skala 1–7
const demoAnswers = {
  "hfs-1": 1,
  "hfs-2": 1,
  "hfs-3": 3,
  "hfs-4": 4,
  "hfs-5": 5,
  "hfs-6": 6,
  "hfs-7": 4,
  "hfs-8": 6,
  "hfs-9": 5,
  "hfs-10": 7,
  "hfs-11": 4,
  "hfs-12": 5,
  "hfs-13": 6,
  "hfs-14": 2,
  "hfs-15": 4,
  "hfs-16": 2,
  "hfs-17": 4,
  "hfs-18": 3,
};

// --- Jalankan kalkulasi
// const result = calculateHfsTotalScore(hfsQuestions, demoAnswers);
const result = calculateHfsTotalScore(hfsQuestions, demoAnswers);
const interpretation = interpretHfsScore(result);
console.log(interpretation);

// --- Tampilkan hasil
console.log("HFS Test Result:");
console.log("Total Skor:", result.total);
console.log("Self     :", result.self);
console.log("Others   :", result.others);
console.log("Situation:", result.situation);
