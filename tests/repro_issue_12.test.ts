const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('issue-12: child model uses local ref only', () => {
  const modelPath = path.resolve(__dirname, '../models/my_child_model.sql');
  const sql = fs.readFileSync(modelPath, 'utf8');

  assert.equal(
    sql.includes("ref('property_management', 'units')"),
    false,
    'my_child_model.sql should not reference missing property_management.units'
  );
  assert.equal(
    sql.includes("ref('my_second_dbt_model')"),
    true,
    'my_child_model.sql should reference an in-project model'
  );
});
