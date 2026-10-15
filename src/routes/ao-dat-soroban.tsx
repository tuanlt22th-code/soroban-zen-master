import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { FlashSoroban } from "@/components/practice/FlashSoroban";

export const Route = createFileRoute("/ao-dat-soroban")({
  head: () => ({
    meta: [
      { title: "Ảo đặt số Soroban — Luyện Soroban" },
      {
        name: "description",
        content:
          "Hạt Soroban hiện trong 0,3–2 giây rồi biến mất; ghi nhớ và biểu diễn lại trên bàn tính của bạn.",
      },
      { property: "og:title", content: "Ảo đặt số Soroban" },
      {
        property: "og:description",
        content: "Nhìn hạt chớp nhoáng trên bàn tính mẫu rồi biểu diễn lại trên Soroban.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Ảo đặt số Soroban" subtitle="Nhìn hạt rồi biểu diễn lại trên bàn tính">
      <FlashSoroban />
    </PracticeShell>
  ),
});
