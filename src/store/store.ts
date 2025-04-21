import { Store } from '@tanstack/react-store'

export const numberOfFiltersAppliedStore = new Store({
  numberOfFiltersApplied: 0,
})

export const handleSetNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState((prev) => ({
    numberOfFiltersApplied: prev.numberOfFiltersApplied + 1,
  }))
}

export const handleRemoveNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState((prev) => ({
    numberOfFiltersApplied: prev.numberOfFiltersApplied - 1,
  }))
}

export const handleResetNumberOfFiltersApplied = () => {
  numberOfFiltersAppliedStore.setState(() => ({
    numberOfFiltersApplied: 0,
  }))
}

//rpeortsList

export const dataStore = new Store<{
  reportsList: ReportsListData
}>({
  reportsList: [],
})

export const handleSetReportsList = (data: ReportsListData) => {
  dataStore.setState(() => ({
    reportsList: data,
  }))
}
