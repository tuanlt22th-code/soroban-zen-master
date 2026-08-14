import { createFileRoute } from "@tanstack/react-router";
import { PracticeShell } from "@/components/practice/PracticeShell";
import { ExerciseLibrary } from "@/components/exercises/ExerciseLibrary";

export const Route = createFileRoute("/bo-bai-tap")({
  head: () => ({
    meta: [
      { title: "Bộ bài tập Soroban — Upload CSV/TXT" },
      {
        name: "description",
        content: "Upload, đặt tên, xem và xóa các bộ bài tập cộng trừ dạng CSV hoặc TXT.",
      },
      { property: "og:title", content: "Bộ bài tập Soroban" },
      {
        property: "og:description",
        content: "Quản lý bộ bài tập cộng trừ dạng CSV/TXT cho luyện Soroban.",
      },
    ],
  }),
  component: () => (
    <PracticeShell title="Bộ bài tập" subtitle="Upload và quản lý bài cộng/trừ">
      <ExerciseLibrary />
    </PracticeShell>
  ),
});
