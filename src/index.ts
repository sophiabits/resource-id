import KSUID from 'ksuid-edge';
import { debase62 } from 'ksuid-edge/lib/base62';

export function generate(prefix: string) {
  const ksuid = KSUID.randomSync();
  return `${prefix}_${ksuid.toJSON()}`;
}

export function compare(id1: string, id2: string) {
  if (!isValid(id1) || !isValid(id2)) {
    return 0;
  }

  const ksuid1 = KSUID.parse(parse(id1).ksuid);
  const ksuid2 = KSUID.parse(parse(id2).ksuid);

  return ksuid1.compare(ksuid2);
}

export function isValid(resourceId: string): boolean {
  if (!resourceId.includes('_')) {
    return false;
  }

  const [_prefix, ksuid, ...rest] = resourceId.split('_');
  if (rest.length > 0) {
    return false;
  }

  return KSUID.isValid(debase62(ksuid));
}

export function parse(input: string): { ksuid: string; prefix: string } {
  if (!isValid(input)) {
    throw new TypeError(`resource-id: Failed to parse provided ID "${input}"`);
  }

  const [prefix, ksuid] = input.split('_');
  return { ksuid, prefix };
}
