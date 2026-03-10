import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

test("my_child_model should not reference missing external package", () => {
  const modelSql = readFileSync("models/my_child_model.sql", "utf8");

  assert.equal(
    modelSql.includes("ref('property_management'"),
    false,
    "my_child_model must not depend on the unavailable property_management package"
  );
  assert.equal(
    modelSql.includes("ref('my_second_dbt_model')"),
    true,
    "my_child_model should reference a local model"
  );
});
