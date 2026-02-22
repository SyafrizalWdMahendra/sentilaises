// // Sample data for the sentiment analysis dashboard
// // Based on Tokopedia laptop reviews analysis

// import { CheckCircle2, Cpu, Target, Zap } from "lucide-react";

// export const sentimentDistribution = [
//   { name: "Positif", value: 2456, color: "hsl(158, 64%, 42%)" },
//   { name: "Negatif", value: 607, color: "hsl(0, 72%, 51%)" },
//   { name: "Netral", value: 382, color: "hsl(43, 74%, 49%)" },
// ];

// export const trendData = [
//   { date: "Jan", positif: 580, negatif: 220, netral: 150 },
//   { date: "Feb", positif: 620, negatif: 245, netral: 175 },
//   { date: "Mar", positif: 750, negatif: 280, netral: 190 },
//   { date: "Apr", positif: 690, negatif: 310, netral: 165 },
//   { date: "Mei", positif: 820, negatif: 265, netral: 210 },
//   { date: "Jun", positif: 780, negatif: 240, netral: 195 },
//   { date: "Jul", positif: 850, negatif: 290, netral: 220 },
//   { date: "Agu", positif: 720, negatif: 255, netral: 180 },
//   { date: "Sep", positif: 680, negatif: 230, netral: 165 },
//   { date: "Okt", positif: 540, negatif: 195, netral: 145 },
//   { date: "Nov", positif: 520, negatif: 175, netral: 150 },
//   { date: "Des", positif: 474, negatif: 140, netral: 136 },
// ];

// export const wordCloudData = [
//   { text: "barang", value: 1086, sentiment: "positive" as const },
//   { text: "sesuai", value: 570, sentiment: "positive" as const },
//   { text: "bagus", value: 523, sentiment: "positive" as const },
//   { text: "seller", value: 478, sentiment: "positive" as const },
//   { text: "cepat", value: 471, sentiment: "positive" as const },
//   { text: "aman", value: 453, sentiment: "positive" as const },
//   { text: "laptop", value: 451, sentiment: "positive" as const },
//   { text: "kirim", value: 449, sentiment: "positive" as const },
//   { text: "baik", value: 396, sentiment: "positive" as const },
//   { text: "mulus", value: 364, sentiment: "positive" as const },
//   { text: "barang", value: 181, sentiment: "negative" as const },
//   { text: "kirim", value: 177, sentiment: "negative" as const },
//   { text: "laptop", value: 129, sentiment: "negative" as const },
//   { text: "beli", value: 124, sentiment: "negative" as const },
//   { text: "lebih", value: 72, sentiment: "negative" as const },
//   { text: "jual", value: 62, sentiment: "negative" as const },
//   { text: "baru", value: 60, sentiment: "negative" as const },
//   { text: "lalu", value: 59, sentiment: "negative" as const },
//   { text: "sesuai", value: 56, sentiment: "negative" as const },
//   { text: "tahun", value: 56, sentiment: "negative" as const },
//   { text: "kirim", value: 106, sentiment: "neutral" as const },
//   { text: "barang", value: 96, sentiment: "neutral" as const },
//   { text: "laptop", value: 78, sentiment: "neutral" as const },
//   { text: "sesuai", value: 48, sentiment: "neutral" as const },
//   { text: "bagus", value: 47, sentiment: "neutral" as const },
//   { text: "lebih", value: 45, sentiment: "neutral" as const },
//   { text: "kurang", value: 44, sentiment: "neutral" as const },
//   { text: "beli", value: 44, sentiment: "neutral" as const },
//   { text: "baik", value: 33, sentiment: "neutral" as const },
//   { text: "baru", value: 32, sentiment: "neutral" as const },
// ];

// export const brandData = [
//   { name: "ASUS", count: 3245 },
//   { name: "Lenovo", count: 2890 },
//   { name: "HP", count: 2456 },
//   { name: "Acer", count: 2134 },
//   { name: "Dell", count: 1725 },
// ];

// export const reviewData = [
//   {
//     id: "1",
//     product: "ASUS VivoBook 15 X515EA Intel Core i5-1135G7",
//     brand: "ASUS",
//     review:
//       "Laptop sangat bagus, performa cepat untuk kerja kantoran. Layar jernih dan keyboard nyaman dipakai mengetik seharian. Pengiriman juga cepat dan aman.",
//     rating: 5,
//     sentiment: "positif" as const,
//     date: "2 hari yang lalu",
//     confidence: 0.945,
//   },
//   {
//     id: "2",
//     product: "Lenovo IdeaPad Slim 3 AMD Ryzen 5 5500U",
//     brand: "Lenovo",
//     review:
//       "Produk sesuai deskripsi. Build quality oke, performa lancar untuk multitasking ringan. Baterai awet bisa 6-7 jam pemakaian normal.",
//     rating: 4,
//     sentiment: "positif" as const,
//     date: "3 hari yang lalu",
//     confidence: 0.887,
//   },
//   {
//     id: "3",
//     product: "HP 14s-dq5001TU Intel Core i5-1235U",
//     brand: "HP",
//     review:
//       "Kecewa dengan produk ini. Baru dipakai 2 minggu sudah sering hang dan restart sendiri. Kipas juga berisik sekali padahal hanya buka browser.",
//     rating: 2,
//     sentiment: "negatif" as const,
//     date: "4 hari yang lalu",
//     confidence: 0.923,
//   },
//   {
//     id: "4",
//     product: "Acer Aspire 5 A515-57 Intel Core i5-1235U",
//     brand: "Acer",
//     review:
//       "Laptop oke lah untuk harga segini. Tidak terlalu cepat tapi juga tidak lemot. Cocok untuk mahasiswa dengan budget terbatas.",
//     rating: 3,
//     sentiment: "netral" as const,
//     date: "5 hari yang lalu",
//     confidence: 0.812,
//   },
//   {
//     id: "5",
//     product: "Dell Inspiron 15 3520 Intel Core i3-1215U",
//     brand: "Dell",
//     review:
//       "Sangat puas dengan pembelian ini! Laptop premium dengan harga terjangkau. Build quality solid, keyboard backlit, dan layar anti-glare sangat membantu.",
//     rating: 5,
//     sentiment: "positif" as const,
//     date: "1 minggu yang lalu",
//     confidence: 0.956,
//   },
//   {
//     id: "6",
//     product: "ASUS TUF Gaming F15 FX506HF RTX 2050",
//     brand: "ASUS",
//     review:
//       "Gaming laptop yang worth it! Main game AAA lancar di medium-high setting. Thermal management bagus, tidak terlalu panas saat gaming marathon.",
//     rating: 5,
//     sentiment: "positif" as const,
//     date: "1 minggu yang lalu",
//     confidence: 0.934,
//   },
//   {
//     id: "7",
//     product: "Lenovo V14 G3 AMD Ryzen 3 5300U",
//     brand: "Lenovo",
//     review:
//       "Laptop datang dalam kondisi rusak, layar ada garis horizontal. Sudah komplain ke seller tapi respon lambat. Sangat mengecewakan.",
//     rating: 1,
//     sentiment: "negatif" as const,
//     date: "1 minggu yang lalu",
//     confidence: 0.967,
//   },
//   {
//     id: "8",
//     product: "HP Pavilion 14-dv2045TX Intel Core i5",
//     brand: "HP",
//     review:
//       "Desain elegan dan performa mumpuni. Cocok untuk pekerja mobile yang butuh laptop stylish. Speaker B&O juga keren suaranya.",
//     rating: 4,
//     sentiment: "positif" as const,
//     date: "2 minggu yang lalu",
//     confidence: 0.891,
//   },
// ];

// export const modelData = {
//   baseline: {
//     name: "Model XGBoost (Baseline)",
//     metrics: [
//       { label: "Accuracy", value: "80.0%", icon: Target },
//       { label: "Macro F1-Score", value: "56.0%", icon: Cpu },
//       { label: "F1-Negatif", value: "61.0%", icon: CheckCircle2 },
//       { label: "F1-Netral", value: "16.0%", icon: Zap },
//     ],
//     description:
//       "Model awal menggunakan parameter default XGBoost (learning_rate=0.3, max_depth=6) pada dataset yang tidak seimbang.",
//   },
//   tuned: {
//     name: "Model XGBoost (Tuned)",
//     metrics: [
//       { label: "Accuracy", value: "81.0%", icon: Target },
//       { label: "Macro F1-Score", value: "58.0%", icon: Cpu },
//       { label: "F1-Negatif", value: "65.0%", icon: CheckCircle2 },
//       { label: "F1-Netral", value: "17.0%", icon: Zap },
//     ],
//     description:
//       "Model dengan optimasi Hyperparameter menggunakan Grid Search untuk mencari kombinasi learning_rate dan max_depth terbaik.",
//   },
//   optimized: {
//     name: "Model XGBoost (Optimized)",
//     metrics: [
//       { label: "Accuracy", value: "82.0%", icon: Target },
//       { label: "Macro F1-Score", value: "61.0%", icon: Cpu },
//       { label: "F1-Negatif", value: "65.0%", icon: CheckCircle2 },
//       { label: "F1-Netral", value: "27.0%", icon: Zap },
//     ],
//     description:
//       "Model final menggunakan teknik SMOTE untuk menyeimbangkan kelas, seleksi fitur Chi-Square, dan optimasi Grid Search.",
//   },
// };
