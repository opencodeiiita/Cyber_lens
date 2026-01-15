import pool from "../db";
import type { OwnerContext } from "../constants/owner";
import type { IocType } from "../constants/provider.interface";

interface LogIocHistoryParams {
  owner: OwnerContext;
  iocType: IocType;
  iocValue: string;
  verdict?: string;
}

export async function logIocHistory({
  owner,
  iocType,
  iocValue,
  verdict,
}: LogIocHistoryParams): Promise<void> {
  await pool.query(
    `
    INSERT INTO ioc_history (owner_type, owner_id, ioc_type, ioc_value, verdict)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [owner.type, owner.id, iocType, iocValue, verdict]
  );
}
  