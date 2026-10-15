import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Calculator, Grid3x3, Library, Sparkles, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luyện Soroban Online — Biểu diễn số, Ảo tính, Tính toán" },
      {
        name: "description",
        content:
          "Bàn tính Soroban 11 cột tương tác: luyện biểu diễn số, ảo tính flash number 0.3–2 giây và luyện cộng trừ từ bộ bài tập của bạn.",
      },
      { property: "og:title", content: "Luyện Soroban Online" },
      {
        property: "og:description",
        content: "Bàn tính Soroban tương tác cho luyện biểu diễn số, ảo tính và tính toán.",
      },
    ],
  }),
  component: Home,
});

const MODES = [
  {
    to: "/bieu-dien-so" as const,
    title: "BIỂU DIỄN SỐ",
    desc: "Luyện đặt số lên bàn tính.",
    icon: Grid3x3,
  },
  {
    to: "/ao-tinh" as const,
    title: "ẢO ĐẶT SỐ",
    desc: "Nhìn số trong thời gian rất ngắn rồi ghi nhớ và biểu diễn lại.",
    icon: Brain,
  },
  {
    to: "/flashcard" as const,
    title: "FLASHCARD",
    desc: "Hạt hiện chớp nhoáng trên bàn tính, đọc số và nhập kết quả.",
    icon: Zap,
  },
  {
    to: "/ao-dat-soroban" as const,
    title: "ẢO ĐẶT SỐ SOROBAN",
    desc: "Hạt hiện chớp nhoáng trên bàn tính mẫu, ghi nhớ và biểu diễn lại trên bàn tính của bạn.",
    icon: Sparkles,
  },
  {
    to: "/tinh-toan" as const,
    title: "TÍNH TOÁN",
    desc: "Luyện cộng/trừ từ bộ bài tập do bạn upload.",
    icon: Calculator,
  },
];

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="border-b border-border bg-card/80 px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-xl font-black tracking-tight text-foreground">Luyện Soroban</h1>
          <p className="text-sm text-muted-foreground">Bàn tính 11 cột · luyện tập mỗi ngày</p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl space-y-3 px-4 py-6">
        <h2 className="sr-only">Chọn chế độ luyện tập</h2>
        {MODES.map((mode) => (
          <Link
            key={mode.to}
            to={mode.to}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <mode.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black tracking-tight text-foreground">{mode.title}</span>
              <span className="block text-sm text-muted-foreground">{mode.desc}</span>
            </span>
          </Link>
        ))}

        <Link
          to="/bo-bai-tap"
          className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent"
        >
          <Library className="h-5 w-5 shrink-0" aria-hidden="true" />
          Bộ bài tập
        </Link>
      </main>
    </div>
  );
}
