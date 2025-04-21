declare interface Doc {
  name: string
  url: URLType
}

declare type DocList = Doc[]

declare interface Report {
  creative_id: number
  creative_name: string
  tags?: tags
  country: string
  ad_network: string
  os: string
  campaign: string
  ad_group: string
  ipm: number
  ctr: number
  spend: number
  impressions: number
  clicks: number
  cpm: number
  cost_per_click: number
  cost_per_install: number
  installs: number
}

// end card elements removal
declare interface tags {
  Concept?: string
  Audio_Type?: string
  Audio_Language?: string
  CTA?: string
  Objects?: string[]
  Language?: string
  Logo_present?: string
  CTA_Placement?: string
  Background_Colour?: string
  Background_setting?: string
  CTA_background_colour?: string
}

declare type ReportsListData = Report[]
