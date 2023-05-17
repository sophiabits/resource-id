declare module 'ksuid/base62' {
  export function decode(input: string, fixedLength?: number): Buffer;
}
