import pool from "../db";

export interface HistoryQueryParams {
  ownerType: string;
  ownerId: string;
  limit: number;
  offset: number;
}

export async function queryHistory({
  ownerType,
  ownerId,
  limit,
  offset,
}: HistoryQueryParams) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      owner_type,
      owner_id,
      ioc_type,
      ioc_value,
      verdict,
      created_at
    FROM ioc_history
    WHERE owner_type = $1
      AND owner_id = $2
    ORDER BY created_at DESC
    LIMIT $3 OFFSET $4
    `,
    [ownerType, ownerId, limit, offset]
  );

  return rows;
}

