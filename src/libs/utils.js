import { sha1 } from 'crypto-hash'

export async function toKeyHash (string) {
  return sha1(string)
}
