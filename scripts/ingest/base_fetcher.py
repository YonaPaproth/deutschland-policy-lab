"""
Base class for all DPL data ingestion agents.
"""

from abc import ABC, abstractmethod
from pathlib import Path
import hashlib
import json
from datetime import datetime


class BaseFetcher(ABC):
    """Base class for all DPL data ingestion agents.

    Each concrete fetcher represents one data source (Destatis, OECD, etc.)
    and implements the fetch/parse/store lifecycle.
    """

    source_id: str  # e.g. "destatis", "oecd", "bundestag"

    @abstractmethod
    def fetch(self, **kwargs) -> list[dict]:
        """Fetch raw data from the external API. Returns list of raw response dicts."""
        ...

    @abstractmethod
    def parse(self, raw_data: dict) -> list[dict]:
        """Parse a single raw API response into a list of normalised record dicts."""
        ...

    def content_hash(self, content: str) -> str:
        """SHA-256 fingerprint of text content (first 16 hex chars = 64-bit)."""
        return hashlib.sha256(content.encode()).hexdigest()[:16]

    def store_raw(self, data: dict, filename: str) -> Path:
        """Store raw API response as JSON under data/raw/<source_id>/YYYY-MM-DD/."""
        today = datetime.now().strftime("%Y-%m-%d")
        path = Path(f"data/raw/{self.source_id}/{today}/{filename}")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
        return path

    def evidence_quality(self) -> int:
        """Return the evidence quality score (0–5) for this source type.

        Override in subclasses if the source has variable quality.
        """
        quality_map = {
            "destatis": 5,
            "oecd": 4,
            "bundestag": 3,
            "eurlex": 3,
            "arxiv": 2,
        }
        return quality_map.get(self.source_id, 1)

    def run(self) -> None:
        """Full lifecycle: fetch → parse → store raw → save Parquet."""
        raise NotImplementedError(
            "Subclasses should implement run() or use the helper in destatis_fetcher.py"
        )
