import KSUID from 'ksuid';
import { decode } from 'ksuid/base62';

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

export function isValid(friendlyId: string): boolean {
  if (!friendlyId.includes('_')) {
    return false;
  }

  const [_prefix, ksuid, ...rest] = friendlyId.split('_');
  if (rest.length) {
    return false;
  }

  return KSUID.isValid(decode(ksuid));
}

export function parse(friendlyId: string): { ksuid: string; prefix: string } {
  if (!isValid(friendlyId)) {
    throw new TypeError('');
  }

  const [prefix, ksuid] = friendlyId.split('_');
  return { ksuid, prefix };
}
