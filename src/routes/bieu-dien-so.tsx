import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { NumberRepresentation } from "@/components/practice/NumberRepresentation";

export const Route = createFileRoute("/bieu-dien-so")({
  head: () => ({
    meta: [
      { title: "Biểu diễn số trên Soroban — Luyện Soroban" },
      {
        name: "description",
        content: "Luyện đặt số từ 1 đến 11 chữ số lên bàn tính Soroban, có đồng hồ bấm giờ.",
      },
      { property: "og:title", content: "Biểu diễn số trên Soroban" },
      {
        property: "og:description",
        content: "Luyện đặt số lên bàn tính Soroban 11 cột với đồng hồ bấm giờ.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Biểu diễn số" subtitle="Đặt đúng số lên bàn tính">
      <NumberRepresentation />
    </PracticeShell>
  ),
});
