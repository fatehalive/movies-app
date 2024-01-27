export interface CounterInterface {
  value: number;
  status: "idle" | "loading" | "failed";
}
