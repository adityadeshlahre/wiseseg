declare interface Doc {
  name: string
  url: URLType
}

declare type DocList = Doc[]

declare interface Report {
  creative_id: number
  creative_name: string
  tags?: string
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
  concept: string
  atype: string
  alanguage: string
  cta: string
  objects: string[]
  ctalanguage: string
  logopresent: string
  cta_placement: string
  bgcolor: string
  bgsetting: string
  ctabgcolor: string
}

declare type ReportsList = Report[]
