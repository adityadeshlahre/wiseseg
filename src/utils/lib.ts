//tags

import { dataStore, handleSetReportsList } from '@/store/store'
import { useStore } from '@tanstack/react-store'

export const processTagListForFiltering = (): {
  Character: { id: number; lable: string; category: string }[]
  Background: { id: number; lable: string; category: string }[]
  Elements: { id: number; lable: string; category: string }[]
  CTA_Position: { id: number; lable: string; category: string }[]
  CTA_Text: { id: number; lable: string; category: string }[]
} => {
  const { reportsList } = useStore(dataStore)

  const uniqueTags = {
    Character: new Set<string>(),
    Background: new Set<string>(),
    Elements: new Set<string>(),
    CTA_Position: new Set<string>(),
    CTA_Text: new Set<string>(),
  }

  reportsList.forEach((item) => {
    if (item.tags) {
      if (item.tags.Concept) {
        uniqueTags.Character.add(item.tags.Concept)
      }
      if (item.tags.Background_Colour) {
        uniqueTags.Background.add(item.tags.Background_Colour)
      }
      if (item.tags.Objects) {
        item.tags.Objects.forEach((obj: string) => uniqueTags.Elements.add(obj))
      }
      if (item.tags.CTA_Placement) {
        uniqueTags.CTA_Position.add(item.tags.CTA_Placement)
      }
      if (item.tags.CTA) {
        uniqueTags.CTA_Text.add(item.tags.CTA)
      }
    }
  })

  const characterList = {
    Character: [
      { id: 0, lable: 'Select all', category: 'Character' },
      ...Array.from(uniqueTags.Character).map((val, index) => ({
        id: index + 1,
        lable: val,
        category: 'Character',
      })),
    ],
    Background: [
      { id: 0, lable: 'Select all', category: 'Background' },
      ...Array.from(uniqueTags.Background).map((val, index) => ({
        id: index + 1,
        lable: val,
        category: 'Background',
      })),
    ],
    Elements: [
      { id: 0, lable: 'Select all', category: 'Elements' },
      ...Array.from(uniqueTags.Elements).map((val, index) => ({
        id: index + 1,
        lable: val,
        category: 'Elements',
      })),
    ],
    CTA_Position: [
      { id: 0, lable: 'Select all', category: 'CTA_Position' },
      ...Array.from(uniqueTags.CTA_Position).map((val, index) => ({
        id: index + 1,
        lable: val,
        category: 'CTA_Position',
      })),
    ],
    CTA_Text: [
      { id: 0, lable: 'Select all', category: 'CTA_Text' },
      ...Array.from(uniqueTags.CTA_Text).map((val, index) => ({
        id: index + 1,
        lable: val,
        category: 'CTA_Text',
      })),
    ],
  }

  return characterList
}

export const filterReportsListBasedOnSelectedTags = (
  // this should be added on apply button
  selectedTags: {
    id: number
    lable: string
    tagListCondition?: { id: number; lable: string }
  }[],
  reportsList: ReportList,
): ReportList => {
  const updatedReportsList = reportsList.filter((item) => {
    return selectedTags.every((tag) => {
      const tagKey = tag.lable.replace(/ /g, '_')
      const tagValue = (item.tags as Record<string, string>)?.[tagKey]
      return tagValue !== undefined && tagValue !== ''
    })
  })

  handleSetReportsList(updatedReportsList)

  return updatedReportsList
}

// metrics

export const filterReportsListBasedOnSelectedMetricAndConditions = (
  selectedMetricValue: {
    id: number
    lable: string
    metricListCondition?: {
      id: number
      lable: string
    }
  }[],
  reportsList: ReportList,
): ReportList => {
  const filteredList = reportsList.filter((item) => {
    return selectedMetricValue.every((selectedMetric) => {
      const metricValue = (item as any)[selectedMetric.lable.toLowerCase()]

      if (metricValue === undefined || metricValue === null) {
        return false
      }

      const condition = selectedMetric.metricListCondition?.lable

      switch (condition) {
        case 'Less than':
          return metricValue < selectedMetric.id
        case 'Greater than':
          return metricValue > selectedMetric.id
        case 'Equals':
          return metricValue === selectedMetric.id
        default:
          return false
      }
    })
  })

  handleSetReportsList(filteredList)

  return filteredList
}

// dimensions
