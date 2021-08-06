export const accountQueryVariables = (username: string) => {
  return {
    categories: null,
    chains: null,
    collection: null,
    collectionQuery: null,
    collections: [],
    eventTypes: null,
    identity: {
      username,
    },
    creator: {
      username,
    },
    isActivityTab: false,
    isAssetsTab: false,
    isOffersTab: false,
    isCreatedTab: true,
    isPrivateTab: false,
    isPrivate: false,
    isSingleCollection: false,
    numericTraits: null,
    query: null,
    resultModel: 'ASSETS',
    sortAscending: null,
    sortBy: 'CREATED_DATE',
    stringTraits: null,
    toggles: null,
    showContextMenu: false,
    isCurrentUser: false,
  }
}

export const assetSearchVariables = (cursor: string, username: string, count = 50) => {
  return {
    categories: null,
    chains: null,
    collection: null,
    collectionQuery: null,
    collectionSortBy: 'NAME',
    collections: [],
    count,
    cursor,
    identity: null,
    includeHiddenCollections: null,
    numericTraits: null,
    paymentAssets: null,
    priceFilter: null,
    query: null,
    resultModel: 'ASSETS',
    showContextMenu: false,
    shouldShowQuantity: false,
    sortAscending: null,
    sortBy: 'CREATED_DATE',
    stringTraits: null,
    toggles: null,
    creator: {
      username,
    },
    assetOwner: null,
    isPrivate: null,
    safelistRequestStatuses: null,
  }
}
