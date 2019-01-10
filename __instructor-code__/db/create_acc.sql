INSERT INTO account
(
  acc_email, acc_hash
)
VALUES
(
  ${email}, ${hash}
)
RETURNING *;