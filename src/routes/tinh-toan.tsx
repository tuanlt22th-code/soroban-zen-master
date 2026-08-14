import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { CalculationPractice } from "@/components/practice/CalculationPractice";

export const Route = createFileRoute("/tinh-toan")({
  head: () => ({
    meta: [
      { title: "Luyện tính cộng trừ trên Soroban — Luyện Soroban" },
      {
        name: "description",
        content: "Luyện cộng/trừ trên bàn tính Soroban với bộ bài tập bạn tự biên tập và upload.",
      },
      { property: "og:title", content: "Luyện tính cộng trừ trên Soroban" },
      {
        property: "og:description",
        content: "Bài tập cộng trừ do bạn upload, luyện trực tiếp trên bàn tính Soroban.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Tính toán" subtitle="Bài tập cộng/trừ từ bộ bài của bạn">
      <CalculationPractice />
    </PracticeShell>
  ),
});
