import { IO } from "https://deno.land/x/deno_json_rpc@v1.0.0/src/rpc_two.ts";
import { readLines } from "https://deno.land/std@0.180.0/io/read_lines.ts";

export interface OmeggaIO extends IO {
  write(message: string): Promise<void>;
  read(): Promise<string | void>;
}

export function createOmeggaIO(): OmeggaIO {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const lines = readLines(Deno.stdin);
  return {
    read: async function (): Promise<string | void> {
      const line = await lines.next();
      if (line.done) return decoder.decode();
      return line.value;
    },
    write: async function (m: string): Promise<void> {
      await Deno.stdout.write(encoder.encode(m + "\n"));
    },
  };
}
