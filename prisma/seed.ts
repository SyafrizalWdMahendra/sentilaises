import prisma from "@/lib/prisma";

async function main() {
  console.log("Sedang memulai proses seeding...");

  const modelData = [
    {
      modelName: "Model XGBoost (Baseline)",
      description:
        "Model awal menggunakan parameter default XGBoost (learning_rate=0.3, max_depth=6) pada dataset yang tidak seimbang.",
      accuracy: 0.71,
      macroF1: 0.62,
      f1Negative: 0.67,
      f1Neutral: 0.34,
      isActive: false,
    },
    {
      modelName: "Model XGBoost (Tuned)",
      description:
        "Model dengan optimasi Hyperparameter menggunakan Grid Search untuk mencari kombinasi learning_rate dan max_depth terbaik.",
      accuracy: 0.73,
      macroF1: 0.66,
      f1Negative: 0.69,
      f1Neutral: 0.42,
      isActive: false,
    },
    {
      modelName: "Model XGBoost (Optimized)",
      description:
        "Model final menggunakan teknik SMOTE untuk menyeimbangkan kelas, seleksi fitur Chi-Square, dan optimasi Grid Search.",
      accuracy: 0.72,
      macroF1: 0.66,
      f1Negative: 0.68,
      f1Neutral: 0.43,
      isActive: true,
    },
  ];

  for (const data of modelData) {
    const model = await prisma.model.create({
      data: data,
    });
    console.log(`Berhasil membuat model: ${model.modelName}`);
  }

  console.log("Proses seeding selesai.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
