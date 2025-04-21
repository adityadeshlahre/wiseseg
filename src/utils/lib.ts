//tags

import { dataStore, handleSetReportsList } from '@/store/store'
import { useStore } from '@tanstack/react-store'

export const processTagListForFiltering = (): {
  id: number
  lable: string
}[] => {
  const { reportsList } = useStore(dataStore)

  const uniqueTags = {
    Concepts: new Set<string>(),
    Background: new Set<string>(),
    Elements: new Set<string>(),
    CTA_Position: new Set<string>(),
    CTA_Text: new Set<string>(),
  }

  reportsList.forEach((item) => {
    if (item.tags) {
      if (item.tags.Concept) {
        uniqueTags.Concepts.add(item.tags.Concept)
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

  const characterList = [
    { id: 1, lable: 'Select all' },
    ...Array.from(uniqueTags.Concepts).map((concept, index) => ({
      id: index + 2,
      lable: concept,
    })),
    ...Array.from(uniqueTags.Background).map((background, index) => ({
      id: index + 2 + uniqueTags.Concepts.size,
      lable: background,
    })),
    ...Array.from(uniqueTags.Elements).map((element, index) => ({
      id: index + 2 + uniqueTags.Concepts.size + uniqueTags.Background.size,
      lable: element,
    })),
    ...Array.from(uniqueTags.CTA_Position).map((position, index) => ({
      id:
        index +
        2 +
        uniqueTags.Concepts.size +
        uniqueTags.Background.size +
        uniqueTags.Elements.size,
      lable: position,
    })),
    ...Array.from(uniqueTags.CTA_Text).map((cta, index) => ({
      id:
        index +
        2 +
        uniqueTags.Concepts.size +
        uniqueTags.Background.size +
        uniqueTags.Elements.size +
        uniqueTags.CTA_Position.size,
      lable: cta,
    })),
  ]

  return characterList
}

export const filterReportsListBasedOnSelectedTags = (
  // this should be added on apply button
  selectedTags: {
    id: number
    lable: string
    tagListCondition?: { id: number; lable: string }
  }[],
): ReportList => {
  const { reportsList } = useStore(dataStore)

  const updatedReportsList = reportsList.filter((item) => {
    return selectedTags.every((tag) => {
      const tagKey = tag.lable.replace(/ /g, '_')
      return (
        item.tags &&
        (item.tags as Record<string, string>)[tagKey] &&
        (item.tags as Record<string, string>)[tagKey] === tag.lable
      )
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
): ReportList => {
  const { reportsList } = useStore(dataStore)

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
