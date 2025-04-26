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

export const processDimensionListForFiltering = (): {
  country: { id: number; lable: string; key: string }[]
  ad_network: { id: number; lable: string; key: string }[]
  os: { id: number; lable: string; key: string }[]
  campaign: { id: number; lable: string; key: string }[]
  ad_group: { id: number; lable: string; key: string }[]
} => {
  const { reportsList } = useStore(dataStore)

  const uniqueDimensions = {
    country: new Set<string>(),
    ad_network: new Set<string>(),
    os: new Set<string>(),
    campaign: new Set<string>(),
    ad_group: new Set<string>(),
  }

  reportsList.forEach((item) => {
    if (item.country) {
      uniqueDimensions.country.add(item.country)
    }
    if (item.ad_network) {
      uniqueDimensions.ad_network.add(item.ad_network)
    }
    if (item.os) {
      uniqueDimensions.os.add(item.os)
    }
    if (item.campaign) {
      uniqueDimensions.campaign.add(item.campaign)
    }
    if (item.ad_group) {
      uniqueDimensions.ad_group.add(item.ad_group)
    }
  })

  const dimensionList = {
    country: [
      { id: 0, lable: 'Select all', key: 'country' },
      ...Array.from(uniqueDimensions.country).map((val, index) => ({
        id: index + 1,
        lable: val,
        key: 'country',
      })),
    ],
    ad_network: [
      { id: 0, lable: 'Select all', key: 'ad_network' },
      ...Array.from(uniqueDimensions.ad_network).map((val, index) => ({
        id: index + 1,
        lable: val,
        key: 'ad_network',
      })),
    ],
    os: [
      { id: 0, lable: 'Select all', key: 'os' },
      ...Array.from(uniqueDimensions.os).map((val, index) => ({
        id: index + 1,
        lable: val,
        key: 'os',
      })),
    ],
    campaign: [
      { id: 0, lable: 'Select all', key: 'campaign' },
      ...Array.from(uniqueDimensions.campaign).map((val, index) => ({
        id: index + 1,
        lable: val,
        key: 'campaign',
      })),
    ],
    ad_group: [
      { id: 0, lable: 'Select all', key: 'ad_group' },
      ...Array.from(uniqueDimensions.ad_group).map((val, index) => ({
        id: index + 1,
        lable: val,
        key: 'ad_group',
      })),
    ],
  }

  return dimensionList
}

export const processMetricListForFiltering = (): {
  ipm: { id: number; lable: string; key: string }[]
  ctr: { id: number; lable: string; key: string }[]
  spend: { id: number; lable: string; key: string }[]
  clicks: { id: number; lable: string; key: string }[]
  cpm: { id: number; lable: string; key: string }[]
} => {
  const { reportsList } = useStore(dataStore)

  const uniqueMetrics = {
    ipm: new Set<number>(),
    ctr: new Set<number>(),
    spend: new Set<number>(),
    clicks: new Set<number>(),
    cpm: new Set<number>(),
  }

  reportsList.forEach((item) => {
    if (item.ipm) {
      uniqueMetrics.ipm.add(item.ipm)
    }
    if (item.ctr) {
      uniqueMetrics.ctr.add(item.ctr)
    }
    if (item.spend) {
      uniqueMetrics.spend.add(item.spend)
    }
    if (item.clicks) {
      uniqueMetrics.clicks.add(item.clicks)
    }
    if (item.cpm) {
      uniqueMetrics.cpm.add(item.cpm)
    }
  })

  const metricsList = {
    ipm: [
      { id: 0, lable: 'Select all', key: 'ipm' },
      ...Array.from(uniqueMetrics.ipm).map((val, index) => ({
        id: index + 1,
        lable: val.toString(),
        key: 'ipm',
      })),
    ],
    ctr: [
      { id: 0, lable: 'Select all', key: 'ctr' },
      ...Array.from(uniqueMetrics.ctr).map((val, index) => ({
        id: index + 1,
        lable: val.toString(),
        key: 'ctr',
      })),
    ],
    spend: [
      { id: 0, lable: 'Select all', key: 'spend' },
      ...Array.from(uniqueMetrics.spend).map((val, index) => ({
        id: index + 1,
        lable: val.toString(),
        key: 'spend',
      })),
    ],
    clicks: [
      { id: 0, lable: 'Select all', key: 'clicks' },
      ...Array.from(uniqueMetrics.clicks).map((val, index) => ({
        id: index + 1,
        lable: val.toString(),
        key: 'clicks',
      })),
    ],
    cpm: [
      { id: 0, lable: 'Select all', key: 'cpm' },
      ...Array.from(uniqueMetrics.cpm).map((val, index) => ({
        id: index + 1,
        lable: val.toString(),
        key: 'cpm',
      })),
    ],
  }

  return metricsList
}

export const filterReportsListBasedOnSelectedTags = (
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

export const filterReportsListBasedOnSelectedDimensionAndConditions = (
  selectedDimensionValue: {
    id: number
    lable: string
    key: string
  }[],
  reportsList: ReportList,
): ReportList => {
  const filteredList = reportsList.filter((item) => {
    return selectedDimensionValue.every((selectedDimension) => {
      const dimensionValue = (item as any)[selectedDimension.key]

      if (dimensionValue === undefined || dimensionValue === null) {
        return false
      }

      const condition = selectedDimension.lable

      switch (condition) {
        case 'Contains':
          return dimensionValue.includes(selectedDimension.id.toString())
        case 'Does not contain':
          return !dimensionValue.includes(selectedDimension.id.toString())
        case 'is':
          return dimensionValue === selectedDimension.id.toString()
        case 'is not':
          return dimensionValue !== selectedDimension.id.toString()
        default:
          return false
      }
    })
  })

  handleSetReportsList(filteredList)

  return filteredList
}
