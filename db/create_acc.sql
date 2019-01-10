INSERT INTO account
(
   acc_email, acc_hash
)
VALUES
(
   ${email}, ${hash}
)
RETURNING *; 
-- Returning is immediately giving us back what was inserted into table. 