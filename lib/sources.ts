import sources, { type Source } from "@/data/sources"

export function getAllSources(): Source[] {
  return sources
}

export function getSourceById(id: string): Source | undefined {
  return sources.find((s) => s.id === id)
}

export function getSourcesForPolicy(sourceIds: string[]): Source[] {
  return sourceIds
    .map((id) => sources.find((s) => s.id === id))
    .filter((s): s is Source => s !== undefined)
}
