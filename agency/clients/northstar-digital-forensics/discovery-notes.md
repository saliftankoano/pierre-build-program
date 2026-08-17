# Northstar Discovery Notes

## Stakeholders

- Renee Foster, founder and investigator.
- Alex Kim, investigator.
- Morgan Price, law-firm client representative.
- Maya Chen, account manager.

## Findings

- A client organization can have several users, but a user belongs to only one organization in the training release.
- Cases use `new`, `needs_information`, `ready_for_review`, `in_review`, and `closed` statuses. Status changes must follow documented transitions.
- Clients may edit draft intake details but cannot silently change evidence metadata after investigator review; corrections create a new event.
- Investigators need a queue filtered by assignment and status, not a global search across unauthorized cases.
- Sample files must be private. A short-lived signed link is acceptable for authorized viewing.
- Email notifications must contain only case reference and action summary, never uploaded contents or sensitive descriptions.
- The owner initially requested “tamper-proof chain of custody.” The approved training wording is “timestamped activity history.” Legal sufficiency and immutability are out of scope.

## Questions you must resolve

- Which status transitions may each role perform?
- What metadata is required before a case becomes ready for review?
- What belongs in an audit event without leaking sensitive content?
- How will a deleted or disabled membership affect existing cases?
- What happens when storage or notification delivery fails after the database action succeeds?
