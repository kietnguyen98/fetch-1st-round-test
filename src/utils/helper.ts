import { v4 as uuidv4 } from "uuid";

export function generateUUID() {
  const uuid = uuidv4().replace(/-/g, "");
  const bigInt = BigInt("0x" + uuid.slice(0, 10));
  const numbUuid = Number(bigInt);
  return numbUuid;
}
