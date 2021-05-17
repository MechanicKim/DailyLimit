/* 고정 수입 */
export const FixedInSchema = {
  name: 'FixedIn',
  properties: {
    in: 'int',
    limit: 'int'
  }
};

/* 고정 지출 */
export const FixedOutSchema = {
  name: 'FixedOutRecord',
  properties: {
    id: 'int',
    desc: 'string',
    out: 'int'
  }
};

/* 지출 내역 2 */
export const OutRecordSchema = {
  name: 'OutRecord',
  properties: {
    id: 'int',
    todayId: 'int',
    title: 'string',
    out: {type: 'int', default: 0}
  }
};

/* 지출 내역 1 */
export const TodaySchema = {
  name: 'Today',
  properties: {
    id: 'int',
    out: {type: 'int', default: 0},
    balance: {type: 'int', default: 0},
    records: 'OutRecord[]'
  }
};

export const SchemaVersion = 1;
