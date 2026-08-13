import { useCallback } from "react";
import { SorobanColumn } from "./SorobanColumn";
import { sorobanToNumber, type ColumnState, type SorobanState } from "@/lib/soroban";

interface SorobanProps {
  state: SorobanState;
  onChange: (next: SorobanState) => void;
  disabled?: boolean;
}

export function Soroban({ state, onChange, disabled }: SorobanProps) {
  const handleColumn = useCallback(
    (index: number, next: ColumnState) => {
      const copy = state.slice();
      copy[index] = next;
      onChange(copy);
    },
    [state, onChange],
  );

  return (
    <div className="soroban-scroll" role="region" aria-label="Bàn tính Soroban">
      <div
        className="soroban-frame"
        aria-label={`Giá trị hiện tại trên bàn tính: ${sorobanToNumber(state)}`}
      >
        <div className="soroban-board">
          {state.map((col, i) => (
            <SorobanColumn
              key={i}
              index={i}
              total={state.length}
              state={col}
              disabled={disabled}
              onChange={handleColumn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
