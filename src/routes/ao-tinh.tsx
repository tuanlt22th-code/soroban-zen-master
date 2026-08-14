import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { MentalArithmetic } from "@/components/practice/MentalArithmetic";

export const Route = createFileRoute("/ao-tinh")({
  head: () => ({
    meta: [
      { title: "Ảo tính flash number — Luyện Soroban" },
      {
        name: "description",
        content:
          "Số hiện trong 0,3–2 giây rồi biến mất; ghi nhớ và biểu diễn lại trên bàn tính Soroban.",
      },
      { property: "og:title", content: "Ảo tính flash number" },
      {
        property: "og:description",
        content: "Luyện ghi nhớ số chớp nhoáng rồi biểu diễn lại trên Soroban.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Ảo tính" subtitle="Ghi nhớ số rồi biểu diễn lại">
      <MentalArithmetic />
    </PracticeShell>
  ),
});
