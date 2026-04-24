"""
PST Inventory v3 - @carsi.com.au address search.

Uses Aspose.Email-for-Python-via-NET which has Windows wheels and reads
Unicode (!BDN) PST files without needing Outlook COM or a C toolchain.

READ-ONLY. Does not write message bodies to disk or stdout. Addresses +
counts only.
"""

from __future__ import annotations

import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

PST_PATH = Path(
    r"C:\Users\Phill\OneDrive - Disaster Recovery\Documents\Outlook Files\archive.pst"
)
NEEDLE = "carsi.com.au"


def _to_py_dt(dt) -> datetime | None:
    if dt is None:
        return None
    try:
        return datetime(dt.year, dt.month, dt.day, dt.hour, dt.minute, dt.second)
    except Exception:
        return None


def main() -> int:
    if not PST_PATH.exists():
        print(f"ERROR: PST not found at {PST_PATH}", file=sys.stderr)
        return 2

    from aspose.email.storage.pst import PersonalStorage  # type: ignore

    total_messages = 0
    carsi_messages = 0
    carsi_senders: Counter[str] = Counter()
    carsi_recipients: Counter[str] = Counter()
    dates: list[datetime] = []
    folders_scanned = 0
    errors = 0
    carsi_folder_hit = False

    pst = PersonalStorage.from_file(str(PST_PATH))
    root = pst.root_folder

    def walk(folder, path: str) -> None:
        nonlocal total_messages, carsi_messages, folders_scanned, errors, carsi_folder_hit
        folders_scanned += 1
        name = folder.display_name or ""
        full = f"{path}/{name}" if path else name
        if "CARSI" in name.upper() or NEEDLE in name.lower():
            carsi_folder_hit = True
            print(f"[folder-match] {full} (count={folder.content_count})", file=sys.stderr)

        try:
            for mapi in folder.enumerate_mapi_messages():
                total_messages += 1
                try:
                    sender = ""
                    for attr in ("sender_smtp_address", "sender_email_address"):
                        v = getattr(mapi, attr, None)
                        if v:
                            sender = v.lower()
                            break
                    recipients: list[str] = []
                    try:
                        for r in mapi.recipients:
                            # prefer SMTP; fall back to email_address
                            addr = (
                                getattr(r, "smtp_address", None)
                                or getattr(r, "email_address", None)
                                or ""
                            )
                            if addr:
                                recipients.append(addr.lower())
                    except Exception:
                        pass

                    matched = NEEDLE in sender or any(NEEDLE in r for r in recipients)
                    if matched:
                        carsi_messages += 1
                        if NEEDLE in sender:
                            carsi_senders[sender] += 1
                        for r in recipients:
                            if NEEDLE in r:
                                carsi_recipients[r] += 1
                        dt = _to_py_dt(
                            getattr(mapi, "delivery_time", None)
                            or getattr(mapi, "client_submit_time", None)
                        )
                        if dt:
                            dates.append(dt)
                except Exception:
                    errors += 1
                    continue
        except Exception as exc:
            errors += 1
            print(f"  [warn] enumerate failed for {full}: {exc}", file=sys.stderr)

        try:
            for sub in folder.get_sub_folders():
                walk(sub, full)
        except Exception as exc:
            errors += 1
            print(f"  [warn] cannot list subfolders of {full}: {exc}", file=sys.stderr)

    walk(root, "")

    print("=" * 60)
    print("PST Inventory v3 - archive.pst")
    print("=" * 60)
    print(f"Folders scanned        : {folders_scanned}")
    print(f"Total messages scanned : {total_messages}")
    print(f"Errors (skipped)       : {errors}")
    print(f"CARSI-named folder     : {'yes' if carsi_folder_hit else 'no'}")
    print(f"Messages with @{NEEDLE}: {carsi_messages}")
    if carsi_messages and dates:
        print(f"  Earliest date        : {min(dates).isoformat()}")
        print(f"  Latest date          : {max(dates).isoformat()}")
    print()
    print(f"Top @{NEEDLE} senders:")
    for addr, n in carsi_senders.most_common(10):
        print(f"  {n:>5}  {addr}")
    print()
    print(f"Top @{NEEDLE} recipients:")
    for addr, n in carsi_recipients.most_common(10):
        print(f"  {n:>5}  {addr}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
