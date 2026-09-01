import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { FlashcardNumber } from "@/components/practice/FlashcardNumber";

export const Route = createFileRoute("/flashcard")({
  head: () => ({
    meta: [
      { title: "Flashcard ảo biểu diễn số — Luyện Soroban" },
      {
        name: "description",
        content:
          "Hạt Soroban hiện trong 0,3–2 giây rồi biến mất; đọc số trên bàn tính và nhập kết quả, 5 hoặc 10 câu mỗi lượt.",
      },
      { property: "og:title", content: "Flashcard ảo biểu diễn số" },
      {
        property: "og:description",
        content: "Đọc nhanh số hiển thị bằng hạt trên bàn tính Soroban rồi nhập kết quả.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Flashcard" subtitle="Đọc số trên bàn tính rồi nhập kết quả">
      <FlashcardNumber />
    </PracticeShell>
  ),
});
