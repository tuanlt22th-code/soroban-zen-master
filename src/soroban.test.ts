import { describe, it, expect } from "vitest";
import { numberToSoroban } from "@/lib/soroban/numberToSoroban";
import { sorobanToNumber } from "@/lib/soroban/sorobanToNumber";
import { parseExerciseFile } from "@/lib/exercises/exerciseParser";

describe("soroban", () => {
  const cases = [0,1,5,9,10,15,99,100,999,1000,9999,99999,999999,99999999999];
  it("round-trips", () => {
    for (const n of cases) expect(sorobanToNumber(numberToSoroban(n))).toBe(n);
  });
  it("column layout", () => {
    const s = numberToSoroban(58327);
    expect(s.length).toBe(11);
    expect(s[6]).toEqual({heaven:true, earth:0});
    expect(s[10]).toEqual({heaven:true, earth:2});
  });
  it("rejects overflow", () => {
    expect(() => numberToSoroban("123456789012")).toThrow();
  });
});

describe("parser", () => {
  it("parses valid and flags invalid", () => {
    const r = parseExerciseFile("125 + 37 - 18\n234 - 56 + 17\n12 * 3\n\n5 +");
    expect(r.exercises.length).toBe(2);
    expect(r.exercises[0]!.result).toBe(144);
    expect(r.exercises[0]!.type).toBe("mixed");
    expect(r.exercises[0]!.opsCount).toBe(2);
    expect(r.exercises[0]!.digits).toBe(3);
    expect(r.errors.map(e=>e.line)).toEqual([3,5]);
  });
});
