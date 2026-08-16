# Northstar Digital Forensics — Request for Proposal

## Organization

Northstar is a fictional three-investigator consultancy supporting small law firms, insurers, and businesses with device and account investigations. All people, cases, data, and evidence in this exercise are synthetic.

## Current workflow

Clients email an investigator, receive a document checklist, and upload files to a manually created folder. Status updates happen by email. The owner cannot quickly answer who submitted an item, whether required metadata is missing, or what client-facing actions occurred.

## Desired outcome

A secure portal where a client can open a case request, supply structured evidence metadata and safe sample files, and see status. Investigators need an assigned queue and review workflow. Administrators need membership management and an activity history.

## Required roles

- **Client:** create/view cases for their organization, submit metadata/sample files, and read client-visible updates.
- **Investigator:** view assigned/authorized cases, review submissions, change workflow status, and request information.
- **Administrator:** manage organization memberships and assignments and view the educational audit history.

## Initial release boundaries

- No real forensic evidence or confidential information.
- No device imaging, forensic processing, malware analysis, billing, court filings, legal holds, external evidence sharing, or automated legal conclusions.
- Activity history is not a legally sufficient or immutable chain-of-custody ledger.
- Sample uploads are small harmless text/image fixtures supplied for training.

## Success criteria

- A client cannot access another organization's cases through UI, URL, API, database, or storage.
- Investigators can identify new work and missing metadata.
- Important actions create safe timestamped audit events.
- A new administrator can deploy and operate the training system from documentation.
