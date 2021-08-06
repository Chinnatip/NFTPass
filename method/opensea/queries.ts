import { gql } from '@apollo/client'

export const ACCOUNT_QUERY = gql`
  query accountQuery(
    $categories: [CollectionSlug!]
    $chains: [ChainScalar!]
    $collection: CollectionSlug
    $collectionQuery: String
    $collections: [CollectionSlug!]
    $identity: IdentityInputType
    $creator: IdentityInputType
    $isActivityTab: Boolean!
    $isAssetsTab: Boolean!
    $isOffersTab: Boolean!
    $isCreatedTab: Boolean!
    $isPrivateTab: Boolean!
    $isPrivate: Boolean!
    $isSingleCollection: Boolean!
    $numericTraits: [TraitRangeType!]
    $query: String
    $resultModel: SearchResultModel
    $sortAscending: Boolean
    $sortBy: SearchSortBy
    $stringTraits: [TraitInputType!]
    $toggles: [SearchToggle!]
    $showContextMenu: Boolean!
    $isCurrentUser: Boolean!
  ) {
    account(identity: $identity) {
      address
      imageUrl
      user {
        username
        publicUsername
        id
      }
      ...profilePageQueries_account_1CMIO8
      ...AccountHeader_data
      ...wallet_accountKey
      privateAssetCount
      id
    }
    collection(collection: $collection) {
      description
      imageUrl
      name
      id
    }
    sidebarCollected: query {
      ...profilePageQueries_collected_3StDC7
    }
    sidebarCreated: query {
      ...profilePageQueries_created_3StDC7
    }
    assets: query @include(if: $isAssetsTab) {
      ...AssetSearch_data_3u637c
    }
    activity: query @include(if: $isActivityTab) {
      ...ActivitySearch_data_3v36wc
    }
    offers: query @include(if: $isOffersTab) {
      ...OfferSearch_data_3HWMrt
    }
    created: query @include(if: $isCreatedTab) {
      ...AssetSearch_data_1Wp6pN
    }
    private: query @include(if: $isPrivateTab) {
      ...AssetSearch_data_11hSR7
    }
  }

  fragment AccountHeader_data on AccountType {
    address
    bio
    bannerImageUrl
    config
    metadata {
      discordUsername
      id
    }
    relayId
    names {
      name
      type
    }
    displayName
    ...accounts_url
    ...ProfileImage_data
  }

  fragment ActivitySearchFilter_data_23FYhq on Query {
    ...CollectionFilter_data_5wVB4
  }

  fragment ActivitySearch_data_3v36wc on Query {
    collection(collection: $collection) @include(if: $isSingleCollection) {
      includeTradingHistory
      id
    }
    ...CollectionHeadMetadata_data_2YoIWt
    ...ActivitySearchFilter_data_23FYhq
    ...SearchPills_data_2Kg4Sq
  }

  fragment AssetCardContent_asset on AssetType {
    relayId
    name
    ...AssetMedia_asset
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    tokenId
    collection {
      slug
      id
    }
    isDelisted
  }

  fragment AssetCardContent_assetBundle on AssetBundleType {
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            relayId
            ...AssetMedia_asset
            id
          }
          id
        }
      }
    }
  }

  fragment AssetCardFooter_assetBundle on AssetBundleType {
    name
    assetCount
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            collection {
              name
              relayId
              isVerified
              id
            }
            id
          }
          id
        }
      }
    }
    assetEventData {
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardFooter_asset_1xJxfu on AssetType {
    ownedQuantity(identity: {}) @include(if: $isAssetsTab)
    name
    tokenId
    collection {
      name
      isVerified
      id
    }
    hasUnlockableContent
    isDelisted
    isFrozen
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    decimals
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardFooter_asset_206ilR on AssetType {
    ownedQuantity(identity: $identity)
    name
    tokenId
    collection {
      name
      isVerified
      id
    }
    hasUnlockableContent
    isDelisted
    isFrozen
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    decimals
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardFooter_asset_3RLB6f on AssetType {
    ownedQuantity(identity: $identity) @include(if: $isAssetsTab)
    name
    tokenId
    collection {
      name
      isVerified
      id
    }
    hasUnlockableContent
    isDelisted
    isFrozen
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    decimals
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardHeader_data_27d9G3 on AssetType {
    relayId
    favoritesCount
    isDelisted
    isFavorite
    ...AssetContextMenu_data_3z4lq0 @include(if: $showContextMenu)
  }

  fragment AssetContextMenu_data_3z4lq0 on AssetType {
    ...asset_edit_url
    ...itemEvents_data
    isDelisted
    isEditable {
      value
      reason
    }
    isListable
    ownership(identity: {}) {
      isPrivate
      quantity
    }
    creator {
      address
      id
    }
    collection {
      isAuthorizedEditor
      id
    }
  }

  fragment AssetMedia_asset on AssetType {
    animationUrl
    collection {
      displayData {
        cardDisplayStyle
      }
      id
    }
    isDelisted
    displayImageUrl
  }

  fragment AssetQuantity_data on AssetQuantityType {
    asset {
      ...Price_data
      id
    }
    quantity
  }

  fragment AssetSearchList_data_164hN9 on SearchResultType {
    asset {
      assetContract {
        address
        chain
        id
      }
      relayId
      tokenId
      ...AssetSelectionItem_data
      ...asset_url
      id
    }
    assetBundle {
      relayId
      id
    }
    ...Asset_data_164hN9
  }

  fragment AssetSearchList_data_19CeED on SearchResultType {
    asset {
      assetContract {
        address
        chain
        id
      }
      relayId
      tokenId
      ...AssetSelectionItem_data
      ...asset_url
      id
    }
    assetBundle {
      relayId
      id
    }
    ...Asset_data_19CeED
  }

  fragment AssetSearchList_data_4UtZc on SearchResultType {
    asset {
      assetContract {
        address
        chain
        id
      }
      relayId
      tokenId
      ...AssetSelectionItem_data
      ...asset_url
      id
    }
    assetBundle {
      relayId
      id
    }
    ...Asset_data_4UtZc
  }

  fragment AssetSearch_data_11hSR7 on Query {
    ...CollectionHeadMetadata_data_2YoIWt
    ...SearchPills_data_2Kg4Sq
    search(
      chains: $chains
      categories: $categories
      collections: $collections
      first: 32
      identity: $identity
      numericTraits: $numericTraits
      querystring: $query
      resultType: $resultModel
      sortAscending: $sortAscending
      sortBy: $sortBy
      stringTraits: $stringTraits
      toggles: $toggles
      isPrivate: $isPrivate
    ) {
      edges {
        node {
          ...AssetSearchList_data_4UtZc
          __typename
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment AssetSearch_data_1Wp6pN on Query {
    ...CollectionHeadMetadata_data_2YoIWt
    ...SearchPills_data_2Kg4Sq
    search(
      chains: $chains
      categories: $categories
      collections: $collections
      first: 32
      numericTraits: $numericTraits
      querystring: $query
      resultType: $resultModel
      sortAscending: $sortAscending
      sortBy: $sortBy
      stringTraits: $stringTraits
      toggles: $toggles
      creator: $creator
    ) {
      edges {
        node {
          ...AssetSearchList_data_164hN9
          __typename
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment AssetSearch_data_3u637c on Query {
    ...CollectionHeadMetadata_data_2YoIWt
    ...SearchPills_data_2Kg4Sq
    search(
      chains: $chains
      categories: $categories
      collections: $collections
      first: 32
      identity: $identity
      numericTraits: $numericTraits
      querystring: $query
      resultType: $resultModel
      sortAscending: $sortAscending
      sortBy: $sortBy
      stringTraits: $stringTraits
      toggles: $toggles
    ) {
      edges {
        node {
          ...AssetSearchList_data_19CeED
          __typename
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment AssetSelectionItem_data on AssetType {
    backgroundColor
    collection {
      displayData {
        cardDisplayStyle
      }
      imageUrl
      id
    }
    imageUrl
    name
    relayId
  }

  fragment Asset_data_164hN9 on SearchResultType {
    asset {
      assetContract {
        chain
        id
      }
      isDelisted
      ...AssetCardHeader_data_27d9G3
      ...AssetCardContent_asset
      ...AssetCardFooter_asset_1xJxfu
      ...AssetMedia_asset
      ...asset_url
      ...itemEvents_data
      id
    }
    assetBundle {
      slug
      ...AssetCardContent_assetBundle
      ...AssetCardFooter_assetBundle
      id
    }
  }

  fragment Asset_data_19CeED on SearchResultType {
    asset {
      assetContract {
        chain
        id
      }
      isDelisted
      ...AssetCardHeader_data_27d9G3
      ...AssetCardContent_asset
      ...AssetCardFooter_asset_3RLB6f
      ...AssetMedia_asset
      ...asset_url
      ...itemEvents_data
      id
    }
    assetBundle {
      slug
      ...AssetCardContent_assetBundle
      ...AssetCardFooter_assetBundle
      id
    }
  }

  fragment Asset_data_4UtZc on SearchResultType {
    asset {
      assetContract {
        chain
        id
      }
      isDelisted
      ...AssetCardHeader_data_27d9G3
      ...AssetCardContent_asset
      ...AssetCardFooter_asset_206ilR
      ...AssetMedia_asset
      ...asset_url
      ...itemEvents_data
      id
    }
    assetBundle {
      slug
      ...AssetCardContent_assetBundle
      ...AssetCardFooter_assetBundle
      id
    }
  }

  fragment CollectionFilter_data_5wVB4 on Query {
    selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
        }
      }
    }
    collections(
      chains: $chains
      first: 100
      includeHidden: false
      parents: $categories
      query: $collectionQuery
      sortBy: SEVEN_DAY_VOLUME
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment CollectionHeadMetadata_data_2YoIWt on Query {
    collection(collection: $collection) {
      bannerImageUrl
      description
      imageUrl
      name
      id
    }
  }

  fragment CollectionModalContent_data on CollectionType {
    description
    imageUrl
    name
    slug
  }

  fragment OfferSearchFilter_data_23FYhq on Query {
    ...CollectionFilter_data_5wVB4
  }

  fragment OfferSearch_data_3HWMrt on Query {
    ...OfferSearchFilter_data_23FYhq
    ...SearchPills_data_2Kg4Sq
  }

  fragment Price_data on AssetType {
    decimals
    imageUrl
    symbol
    usdSpotPrice
    assetContract {
      blockExplorerLink
      chain
      id
    }
  }

  fragment ProfileImage_data on AccountType {
    imageUrl
    address
  }

  fragment SearchPills_data_2Kg4Sq on Query {
    selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
      edges {
        node {
          imageUrl
          name
          slug
          ...CollectionModalContent_data
          id
        }
      }
    }
  }

  fragment accounts_url on AccountType {
    address
    user {
      publicUsername
      id
    }
  }

  fragment asset_edit_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
    collection {
      slug
      id
    }
  }

  fragment asset_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment itemEvents_data on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment profilePageQueries_account_1CMIO8 on AccountType {
    user {
      favoriteAssetCount
      id
    }
    privateAssetCount @include(if: $isCurrentUser)
  }

  fragment profilePageQueries_collected_3StDC7 on Query {
    search(identity: $identity, first: 0) {
      totalCount
    }
  }

  fragment profilePageQueries_created_3StDC7 on Query {
    search(creator: $identity, first: 0, resultType: ASSETS) {
      totalCount
    }
  }

  fragment wallet_accountKey on AccountType {
    address
  }
`

export const ASSET_SEARCH_QUERY = gql`
  query AssetSearchQuery(
    $categories: [CollectionSlug!]
    $chains: [ChainScalar!]
    $collection: CollectionSlug
    $collectionQuery: String
    $collectionSortBy: CollectionSort
    $collections: [CollectionSlug!]
    $count: Int
    $cursor: String
    $identity: IdentityInputType
    $includeHiddenCollections: Boolean
    $numericTraits: [TraitRangeType!]
    $paymentAssets: [PaymentAssetSymbol!]
    $priceFilter: PriceFilterType
    $query: String
    $resultModel: SearchResultModel
    $showContextMenu: Boolean = false
    $shouldShowQuantity: Boolean = false
    $sortAscending: Boolean
    $sortBy: SearchSortBy
    $stringTraits: [TraitInputType!]
    $toggles: [SearchToggle!]
    $creator: IdentityInputType
    $assetOwner: IdentityInputType
    $isPrivate: Boolean
    $safelistRequestStatuses: [SafelistRequestStatus!]
  ) {
    query {
      ...AssetSearch_data_2hBjZ1
    }
  }

  fragment AssetCardContent_asset on AssetType {
    relayId
    name
    ...AssetMedia_asset
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    tokenId
    collection {
      slug
      id
    }
    isDelisted
  }

  fragment AssetCardContent_assetBundle on AssetBundleType {
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            relayId
            ...AssetMedia_asset
            id
          }
          id
        }
      }
    }
  }

  fragment AssetCardFooter_assetBundle on AssetBundleType {
    name
    assetCount
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            collection {
              name
              relayId
              isVerified
              id
            }
            id
          }
          id
        }
      }
    }
    assetEventData {
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardFooter_asset_fdERL on AssetType {
    ownedQuantity(identity: $identity) @include(if: $shouldShowQuantity)
    name
    tokenId
    collection {
      name
      isVerified
      id
    }
    hasUnlockableContent
    isDelisted
    isFrozen
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    decimals
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardHeader_data_27d9G3 on AssetType {
    relayId
    favoritesCount
    isDelisted
    isFavorite
    ...AssetContextMenu_data_3z4lq0 @include(if: $showContextMenu)
  }

  fragment AssetContextMenu_data_3z4lq0 on AssetType {
    ...asset_edit_url
    ...itemEvents_data
    isDelisted
    isEditable {
      value
      reason
    }
    isListable
    ownership(identity: {}) {
      isPrivate
      quantity
    }
    creator {
      address
      id
    }
    collection {
      isAuthorizedEditor
      id
    }
  }

  fragment AssetMedia_asset on AssetType {
    animationUrl
    collection {
      displayData {
        cardDisplayStyle
      }
      id
    }
    isDelisted
    displayImageUrl
  }

  fragment AssetQuantity_data on AssetQuantityType {
    asset {
      ...Price_data
      id
    }
    quantity
  }

  fragment AssetSearchFilter_data_3KTzFc on Query {
    ...CollectionFilter_data_2qccfC
    collection(collection: $collection) {
      numericTraits {
        key
        value {
          max
          min
        }
        ...NumericTraitFilter_data
      }
      stringTraits {
        key
        ...StringTraitFilter_data
      }
      id
    }
    ...PaymentFilter_data_2YoIWt
  }

  fragment AssetSearchList_data_3Aax2O on SearchResultType {
    asset {
      assetContract {
        address
        chain
        id
      }
      collection {
        isVerified
        id
      }
      relayId
      tokenId
      ...AssetSelectionItem_data
      ...asset_url
      id
    }
    assetBundle {
      relayId
      id
    }
    ...Asset_data_3Aax2O
  }

  fragment AssetSearch_data_2hBjZ1 on Query {
    ...CollectionHeadMetadata_data_2YoIWt
    ...AssetSearchFilter_data_3KTzFc
    ...SearchPills_data_2Kg4Sq
    search(
      after: $cursor
      chains: $chains
      categories: $categories
      collections: $collections
      first: $count
      identity: $identity
      numericTraits: $numericTraits
      paymentAssets: $paymentAssets
      priceFilter: $priceFilter
      querystring: $query
      resultType: $resultModel
      sortAscending: $sortAscending
      sortBy: $sortBy
      stringTraits: $stringTraits
      toggles: $toggles
      creator: $creator
      isPrivate: $isPrivate
      safelistRequestStatuses: $safelistRequestStatuses
    ) {
      edges {
        node {
          ...AssetSearchList_data_3Aax2O
          __typename
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment AssetSelectionItem_data on AssetType {
    backgroundColor
    collection {
      displayData {
        cardDisplayStyle
      }
      imageUrl
      id
    }
    imageUrl
    name
    relayId
  }

  fragment Asset_data_3Aax2O on SearchResultType {
    asset {
      assetContract {
        chain
        id
      }
      isDelisted
      ...AssetCardHeader_data_27d9G3
      ...AssetCardContent_asset
      ...AssetCardFooter_asset_fdERL
      ...AssetMedia_asset
      ...asset_url
      ...itemEvents_data
      id
    }
    assetBundle {
      slug
      ...AssetCardContent_assetBundle
      ...AssetCardFooter_assetBundle
      id
    }
  }

  fragment CollectionFilter_data_2qccfC on Query {
    selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
        }
      }
    }
    collections(
      assetOwner: $assetOwner
      assetCreator: $creator
      onlyPrivateAssets: $isPrivate
      chains: $chains
      first: 100
      includeHidden: $includeHiddenCollections
      parents: $categories
      query: $collectionQuery
      sortBy: $collectionSortBy
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment CollectionHeadMetadata_data_2YoIWt on Query {
    collection(collection: $collection) {
      bannerImageUrl
      description
      imageUrl
      name
      id
    }
  }

  fragment CollectionModalContent_data on CollectionType {
    description
    imageUrl
    name
    slug
  }

  fragment NumericTraitFilter_data on NumericTraitTypePair {
    key
    value {
      max
      min
    }
  }

  fragment PaymentFilter_data_2YoIWt on Query {
    paymentAssets(first: 10) {
      edges {
        node {
          symbol
          relayId
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    PaymentFilter_collection: collection(collection: $collection) {
      paymentAssets {
        symbol
        relayId
        id
      }
      id
    }
  }

  fragment Price_data on AssetType {
    decimals
    imageUrl
    symbol
    usdSpotPrice
    assetContract {
      blockExplorerLink
      chain
      id
    }
  }

  fragment SearchPills_data_2Kg4Sq on Query {
    selectedCollections: collections(first: 25, collections: $collections, includeHidden: true) {
      edges {
        node {
          imageUrl
          name
          slug
          ...CollectionModalContent_data
          id
        }
      }
    }
  }

  fragment StringTraitFilter_data on StringTraitType {
    counts {
      count
      value
    }
    key
  }

  fragment asset_edit_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
    collection {
      slug
      id
    }
  }

  fragment asset_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment itemEvents_data on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }
`
