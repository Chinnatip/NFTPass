import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  artwork_assetprocessor_enum: any;
  artwork_assetstatus_enum: any;
  artwork_moderationstatus_enum: any;
  artwork_status_enum: any;
  auction_status_enum: any;
  bigint: any;
  citext: any;
  event_eventtype_enum: any;
  jsonb: any;
  numeric: any;
  social_verification_service_enum: any;
  social_verification_status_enum: any;
  timestamp: any;
  user_moderationstatus_enum: any;
  user_providertype_enum: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Float. All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: Maybe<Scalars['Float']>;
  _gt?: Maybe<Scalars['Float']>;
  _gte?: Maybe<Scalars['Float']>;
  _in?: Maybe<Array<Scalars['Float']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Float']>;
  _lte?: Maybe<Scalars['Float']>;
  _neq?: Maybe<Scalars['Float']>;
  _nin?: Maybe<Array<Scalars['Float']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "artwork" */
export type Artwork = {
  __typename?: 'artwork';
  assetFailedReason?: Maybe<Scalars['String']>;
  assetIPFSPath?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  assetJobId?: Maybe<Scalars['String']>;
  assetProcessor: Scalars['artwork_assetprocessor_enum'];
  assetStatus: Scalars['artwork_assetstatus_enum'];
  assetVersion: Scalars['Int'];
  auctionStartTxHash?: Maybe<Scalars['String']>;
  /** An array relationship */
  auctions: Array<Auction>;
  blurHash?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  deletedAt?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  /** An array relationship */
  event: Array<Event>;
  /** An array relationship */
  follower: Array<Follow>;
  /** An aggregated array relationship */
  follower_aggregate: Follow_Aggregate;
  height?: Maybe<Scalars['Int']>;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  id: Scalars['uuid'];
  latestTxDate?: Maybe<Scalars['timestamp']>;
  metadataIPFSPath?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  mintTxHash?: Maybe<Scalars['String']>;
  moderationStatus: Scalars['artwork_moderationstatus_enum'];
  name?: Maybe<Scalars['String']>;
  publicKey: Scalars['String'];
  status: Scalars['artwork_status_enum'];
  tokenId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['timestamp'];
  /** An object relationship */
  user?: Maybe<User>;
  width?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "artwork" */
export type ArtworkAuctionsArgs = {
  distinct_on?: Maybe<Array<Auction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Auction_Order_By>>;
  where?: Maybe<Auction_Bool_Exp>;
};


/** columns and relationships of "artwork" */
export type ArtworkEventArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** columns and relationships of "artwork" */
export type ArtworkFollowerArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "artwork" */
export type ArtworkFollower_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};

/** aggregated selection of "artwork" */
export type Artwork_Aggregate = {
  __typename?: 'artwork_aggregate';
  aggregate?: Maybe<Artwork_Aggregate_Fields>;
  nodes: Array<Artwork>;
};

/** aggregate fields of "artwork" */
export type Artwork_Aggregate_Fields = {
  __typename?: 'artwork_aggregate_fields';
  avg?: Maybe<Artwork_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Artwork_Max_Fields>;
  min?: Maybe<Artwork_Min_Fields>;
  stddev?: Maybe<Artwork_Stddev_Fields>;
  stddev_pop?: Maybe<Artwork_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Artwork_Stddev_Samp_Fields>;
  sum?: Maybe<Artwork_Sum_Fields>;
  var_pop?: Maybe<Artwork_Var_Pop_Fields>;
  var_samp?: Maybe<Artwork_Var_Samp_Fields>;
  variance?: Maybe<Artwork_Variance_Fields>;
};


/** aggregate fields of "artwork" */
export type Artwork_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Artwork_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "artwork" */
export type Artwork_Aggregate_Order_By = {
  avg?: Maybe<Artwork_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Artwork_Max_Order_By>;
  min?: Maybe<Artwork_Min_Order_By>;
  stddev?: Maybe<Artwork_Stddev_Order_By>;
  stddev_pop?: Maybe<Artwork_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Artwork_Stddev_Samp_Order_By>;
  sum?: Maybe<Artwork_Sum_Order_By>;
  var_pop?: Maybe<Artwork_Var_Pop_Order_By>;
  var_samp?: Maybe<Artwork_Var_Samp_Order_By>;
  variance?: Maybe<Artwork_Variance_Order_By>;
};


/** expression to compare columns of type artwork_assetprocessor_enum. All fields are combined with logical 'AND'. */
export type Artwork_Assetprocessor_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _gt?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _gte?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _in?: Maybe<Array<Scalars['artwork_assetprocessor_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _lte?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _neq?: Maybe<Scalars['artwork_assetprocessor_enum']>;
  _nin?: Maybe<Array<Scalars['artwork_assetprocessor_enum']>>;
};


/** expression to compare columns of type artwork_assetstatus_enum. All fields are combined with logical 'AND'. */
export type Artwork_Assetstatus_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _gt?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _gte?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _in?: Maybe<Array<Scalars['artwork_assetstatus_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _lte?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _neq?: Maybe<Scalars['artwork_assetstatus_enum']>;
  _nin?: Maybe<Array<Scalars['artwork_assetstatus_enum']>>;
};

/** aggregate avg on columns */
export type Artwork_Avg_Fields = {
  __typename?: 'artwork_avg_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "artwork" */
export type Artwork_Avg_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "artwork". All fields are combined with a logical 'AND'. */
export type Artwork_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Artwork_Bool_Exp>>>;
  _not?: Maybe<Artwork_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Artwork_Bool_Exp>>>;
  assetFailedReason?: Maybe<String_Comparison_Exp>;
  assetIPFSPath?: Maybe<String_Comparison_Exp>;
  assetId?: Maybe<String_Comparison_Exp>;
  assetJobId?: Maybe<String_Comparison_Exp>;
  assetProcessor?: Maybe<Artwork_Assetprocessor_Enum_Comparison_Exp>;
  assetStatus?: Maybe<Artwork_Assetstatus_Enum_Comparison_Exp>;
  assetVersion?: Maybe<Int_Comparison_Exp>;
  auctionStartTxHash?: Maybe<String_Comparison_Exp>;
  auctions?: Maybe<Auction_Bool_Exp>;
  blurHash?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  deletedAt?: Maybe<Timestamp_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  duration?: Maybe<Float_Comparison_Exp>;
  event?: Maybe<Event_Bool_Exp>;
  follower?: Maybe<Follow_Bool_Exp>;
  height?: Maybe<Int_Comparison_Exp>;
  hiddenAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  latestTxDate?: Maybe<Timestamp_Comparison_Exp>;
  metadataIPFSPath?: Maybe<String_Comparison_Exp>;
  mimeType?: Maybe<String_Comparison_Exp>;
  mintTxHash?: Maybe<String_Comparison_Exp>;
  moderationStatus?: Maybe<Artwork_Moderationstatus_Enum_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  publicKey?: Maybe<String_Comparison_Exp>;
  status?: Maybe<Artwork_Status_Enum_Comparison_Exp>;
  tokenId?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  width?: Maybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Artwork_Max_Fields = {
  __typename?: 'artwork_max_fields';
  assetFailedReason?: Maybe<Scalars['String']>;
  assetIPFSPath?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  assetJobId?: Maybe<Scalars['String']>;
  assetVersion?: Maybe<Scalars['Int']>;
  auctionStartTxHash?: Maybe<Scalars['String']>;
  blurHash?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  deletedAt?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Int']>;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  latestTxDate?: Maybe<Scalars['timestamp']>;
  metadataIPFSPath?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  mintTxHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  width?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "artwork" */
export type Artwork_Max_Order_By = {
  assetFailedReason?: Maybe<Order_By>;
  assetIPFSPath?: Maybe<Order_By>;
  assetId?: Maybe<Order_By>;
  assetJobId?: Maybe<Order_By>;
  assetVersion?: Maybe<Order_By>;
  auctionStartTxHash?: Maybe<Order_By>;
  blurHash?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  hiddenAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latestTxDate?: Maybe<Order_By>;
  metadataIPFSPath?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  mintTxHash?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Artwork_Min_Fields = {
  __typename?: 'artwork_min_fields';
  assetFailedReason?: Maybe<Scalars['String']>;
  assetIPFSPath?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  assetJobId?: Maybe<Scalars['String']>;
  assetVersion?: Maybe<Scalars['Int']>;
  auctionStartTxHash?: Maybe<Scalars['String']>;
  blurHash?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  deletedAt?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Int']>;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  latestTxDate?: Maybe<Scalars['timestamp']>;
  metadataIPFSPath?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  mintTxHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  width?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "artwork" */
export type Artwork_Min_Order_By = {
  assetFailedReason?: Maybe<Order_By>;
  assetIPFSPath?: Maybe<Order_By>;
  assetId?: Maybe<Order_By>;
  assetJobId?: Maybe<Order_By>;
  assetVersion?: Maybe<Order_By>;
  auctionStartTxHash?: Maybe<Order_By>;
  blurHash?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  hiddenAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latestTxDate?: Maybe<Order_By>;
  metadataIPFSPath?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  mintTxHash?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};


/** expression to compare columns of type artwork_moderationstatus_enum. All fields are combined with logical 'AND'. */
export type Artwork_Moderationstatus_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _gt?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _gte?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _in?: Maybe<Array<Scalars['artwork_moderationstatus_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _lte?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _neq?: Maybe<Scalars['artwork_moderationstatus_enum']>;
  _nin?: Maybe<Array<Scalars['artwork_moderationstatus_enum']>>;
};

/** ordering options when selecting data from "artwork" */
export type Artwork_Order_By = {
  assetFailedReason?: Maybe<Order_By>;
  assetIPFSPath?: Maybe<Order_By>;
  assetId?: Maybe<Order_By>;
  assetJobId?: Maybe<Order_By>;
  assetProcessor?: Maybe<Order_By>;
  assetStatus?: Maybe<Order_By>;
  assetVersion?: Maybe<Order_By>;
  auctionStartTxHash?: Maybe<Order_By>;
  blurHash?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  follower_aggregate?: Maybe<Follow_Aggregate_Order_By>;
  height?: Maybe<Order_By>;
  hiddenAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latestTxDate?: Maybe<Order_By>;
  metadataIPFSPath?: Maybe<Order_By>;
  mimeType?: Maybe<Order_By>;
  mintTxHash?: Maybe<Order_By>;
  moderationStatus?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  width?: Maybe<Order_By>;
};

/** primary key columns input for table: "artwork" */
export type Artwork_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "artwork" */
export enum Artwork_Select_Column {
  /** column name */
  AssetFailedReason = 'assetFailedReason',
  /** column name */
  AssetIpfsPath = 'assetIPFSPath',
  /** column name */
  AssetId = 'assetId',
  /** column name */
  AssetJobId = 'assetJobId',
  /** column name */
  AssetProcessor = 'assetProcessor',
  /** column name */
  AssetStatus = 'assetStatus',
  /** column name */
  AssetVersion = 'assetVersion',
  /** column name */
  AuctionStartTxHash = 'auctionStartTxHash',
  /** column name */
  BlurHash = 'blurHash',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Description = 'description',
  /** column name */
  Duration = 'duration',
  /** column name */
  Height = 'height',
  /** column name */
  HiddenAt = 'hiddenAt',
  /** column name */
  Id = 'id',
  /** column name */
  LatestTxDate = 'latestTxDate',
  /** column name */
  MetadataIpfsPath = 'metadataIPFSPath',
  /** column name */
  MimeType = 'mimeType',
  /** column name */
  MintTxHash = 'mintTxHash',
  /** column name */
  ModerationStatus = 'moderationStatus',
  /** column name */
  Name = 'name',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  Status = 'status',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Width = 'width'
}


/** expression to compare columns of type artwork_status_enum. All fields are combined with logical 'AND'. */
export type Artwork_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['artwork_status_enum']>;
  _gt?: Maybe<Scalars['artwork_status_enum']>;
  _gte?: Maybe<Scalars['artwork_status_enum']>;
  _in?: Maybe<Array<Scalars['artwork_status_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['artwork_status_enum']>;
  _lte?: Maybe<Scalars['artwork_status_enum']>;
  _neq?: Maybe<Scalars['artwork_status_enum']>;
  _nin?: Maybe<Array<Scalars['artwork_status_enum']>>;
};

/** aggregate stddev on columns */
export type Artwork_Stddev_Fields = {
  __typename?: 'artwork_stddev_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "artwork" */
export type Artwork_Stddev_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Artwork_Stddev_Pop_Fields = {
  __typename?: 'artwork_stddev_pop_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "artwork" */
export type Artwork_Stddev_Pop_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Artwork_Stddev_Samp_Fields = {
  __typename?: 'artwork_stddev_samp_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "artwork" */
export type Artwork_Stddev_Samp_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Artwork_Sum_Fields = {
  __typename?: 'artwork_sum_fields';
  assetVersion?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Int']>;
  tokenId?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "artwork" */
export type Artwork_Sum_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Artwork_Var_Pop_Fields = {
  __typename?: 'artwork_var_pop_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "artwork" */
export type Artwork_Var_Pop_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Artwork_Var_Samp_Fields = {
  __typename?: 'artwork_var_samp_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "artwork" */
export type Artwork_Var_Samp_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Artwork_Variance_Fields = {
  __typename?: 'artwork_variance_fields';
  assetVersion?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "artwork" */
export type Artwork_Variance_Order_By = {
  assetVersion?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  width?: Maybe<Order_By>;
};

/** columns and relationships of "auction" */
export type Auction = {
  __typename?: 'auction';
  /** An object relationship */
  artwork: Artwork;
  createdAt: Scalars['timestamp'];
  endsAt?: Maybe<Scalars['timestamp']>;
  highestBidAmount?: Maybe<Scalars['numeric']>;
  highestBidder?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  status: Scalars['auction_status_enum'];
  tokenId: Scalars['Int'];
  updatedAt: Scalars['timestamp'];
  /** An object relationship */
  user?: Maybe<User>;
};

/** Boolean expression to filter rows from the table "auction". All fields are combined with a logical 'AND'. */
export type Auction_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Auction_Bool_Exp>>>;
  _not?: Maybe<Auction_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Auction_Bool_Exp>>>;
  artwork?: Maybe<Artwork_Bool_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  endsAt?: Maybe<Timestamp_Comparison_Exp>;
  highestBidAmount?: Maybe<Numeric_Comparison_Exp>;
  highestBidder?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  status?: Maybe<Auction_Status_Enum_Comparison_Exp>;
  tokenId?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "auction" */
export type Auction_Order_By = {
  artwork?: Maybe<Artwork_Order_By>;
  createdAt?: Maybe<Order_By>;
  endsAt?: Maybe<Order_By>;
  highestBidAmount?: Maybe<Order_By>;
  highestBidder?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
};

/** primary key columns input for table: "auction" */
export type Auction_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "auction" */
export enum Auction_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  EndsAt = 'endsAt',
  /** column name */
  HighestBidAmount = 'highestBidAmount',
  /** column name */
  HighestBidder = 'highestBidder',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  UpdatedAt = 'updatedAt'
}


/** expression to compare columns of type auction_status_enum. All fields are combined with logical 'AND'. */
export type Auction_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['auction_status_enum']>;
  _gt?: Maybe<Scalars['auction_status_enum']>;
  _gte?: Maybe<Scalars['auction_status_enum']>;
  _in?: Maybe<Array<Scalars['auction_status_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['auction_status_enum']>;
  _lte?: Maybe<Scalars['auction_status_enum']>;
  _neq?: Maybe<Scalars['auction_status_enum']>;
  _nin?: Maybe<Array<Scalars['auction_status_enum']>>;
};


/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};


/** expression to compare columns of type citext. All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: Maybe<Scalars['citext']>;
  _gt?: Maybe<Scalars['citext']>;
  _gte?: Maybe<Scalars['citext']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['citext']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['citext']>;
  _lte?: Maybe<Scalars['citext']>;
  _neq?: Maybe<Scalars['citext']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['citext']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "event" */
export type Event = {
  __typename?: 'event';
  /** An object relationship */
  artwork?: Maybe<Artwork>;
  blockTimestamp: Scalars['timestamp'];
  createdAt: Scalars['timestamp'];
  /** An array relationship */
  creatorFollower: Array<Follow>;
  /** An aggregated array relationship */
  creatorFollower_aggregate: Follow_Aggregate;
  data: Scalars['jsonb'];
  eventType?: Maybe<Scalars['event_eventtype_enum']>;
  /** An array relationship */
  follower: Array<Follow>;
  /** An aggregated array relationship */
  follower_aggregate: Follow_Aggregate;
  id: Scalars['uuid'];
  publicKey: Scalars['String'];
  tokenCreator: Scalars['String'];
  tokenId: Scalars['Int'];
  updatedAt: Scalars['timestamp'];
  /** An object relationship */
  user: User;
  /** An object relationship */
  userByTokencreator: User;
};


/** columns and relationships of "event" */
export type EventCreatorFollowerArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "event" */
export type EventCreatorFollower_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "event" */
export type EventDataArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "event" */
export type EventFollowerArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "event" */
export type EventFollower_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "event". All fields are combined with a logical 'AND'. */
export type Event_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Event_Bool_Exp>>>;
  _not?: Maybe<Event_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Event_Bool_Exp>>>;
  artwork?: Maybe<Artwork_Bool_Exp>;
  blockTimestamp?: Maybe<Timestamp_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  creatorFollower?: Maybe<Follow_Bool_Exp>;
  data?: Maybe<Jsonb_Comparison_Exp>;
  eventType?: Maybe<Event_Eventtype_Enum_Comparison_Exp>;
  follower?: Maybe<Follow_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  publicKey?: Maybe<String_Comparison_Exp>;
  tokenCreator?: Maybe<String_Comparison_Exp>;
  tokenId?: Maybe<Int_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  userByTokencreator?: Maybe<User_Bool_Exp>;
};


/** expression to compare columns of type event_eventtype_enum. All fields are combined with logical 'AND'. */
export type Event_Eventtype_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['event_eventtype_enum']>;
  _gt?: Maybe<Scalars['event_eventtype_enum']>;
  _gte?: Maybe<Scalars['event_eventtype_enum']>;
  _in?: Maybe<Array<Scalars['event_eventtype_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['event_eventtype_enum']>;
  _lte?: Maybe<Scalars['event_eventtype_enum']>;
  _neq?: Maybe<Scalars['event_eventtype_enum']>;
  _nin?: Maybe<Array<Scalars['event_eventtype_enum']>>;
};

/** ordering options when selecting data from "event" */
export type Event_Order_By = {
  artwork?: Maybe<Artwork_Order_By>;
  blockTimestamp?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  creatorFollower_aggregate?: Maybe<Follow_Aggregate_Order_By>;
  data?: Maybe<Order_By>;
  eventType?: Maybe<Order_By>;
  follower_aggregate?: Maybe<Follow_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  tokenCreator?: Maybe<Order_By>;
  tokenId?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  userByTokencreator?: Maybe<User_Order_By>;
};

/** primary key columns input for table: "event" */
export type Event_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "event" */
export enum Event_Select_Column {
  /** column name */
  BlockTimestamp = 'blockTimestamp',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Data = 'data',
  /** column name */
  EventType = 'eventType',
  /** column name */
  Id = 'id',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  TokenCreator = 'tokenCreator',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "follow" */
export type Follow = {
  __typename?: 'follow';
  createdAt: Scalars['timestamp'];
  followedUser: Scalars['String'];
  id: Scalars['uuid'];
  isFollowing: Scalars['Boolean'];
  updatedAt: Scalars['timestamp'];
  user: Scalars['String'];
  /** An object relationship */
  userByFollowedUser: User;
  /** An object relationship */
  userByFollowingUser: User;
};

/** aggregated selection of "follow" */
export type Follow_Aggregate = {
  __typename?: 'follow_aggregate';
  aggregate?: Maybe<Follow_Aggregate_Fields>;
  nodes: Array<Follow>;
};

/** aggregate fields of "follow" */
export type Follow_Aggregate_Fields = {
  __typename?: 'follow_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Follow_Max_Fields>;
  min?: Maybe<Follow_Min_Fields>;
};


/** aggregate fields of "follow" */
export type Follow_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Follow_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "follow" */
export type Follow_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Follow_Max_Order_By>;
  min?: Maybe<Follow_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "follow". All fields are combined with a logical 'AND'. */
export type Follow_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Follow_Bool_Exp>>>;
  _not?: Maybe<Follow_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Follow_Bool_Exp>>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  followedUser?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  isFollowing?: Maybe<Boolean_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<String_Comparison_Exp>;
  userByFollowedUser?: Maybe<User_Bool_Exp>;
  userByFollowingUser?: Maybe<User_Bool_Exp>;
};

/** aggregate max on columns */
export type Follow_Max_Fields = {
  __typename?: 'follow_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  followedUser?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  user?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "follow" */
export type Follow_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  followedUser?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Follow_Min_Fields = {
  __typename?: 'follow_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  followedUser?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  user?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "follow" */
export type Follow_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  followedUser?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
};

/** ordering options when selecting data from "follow" */
export type Follow_Order_By = {
  createdAt?: Maybe<Order_By>;
  followedUser?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isFollowing?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
  userByFollowedUser?: Maybe<User_Order_By>;
  userByFollowingUser?: Maybe<User_Order_By>;
};

/** primary key columns input for table: "follow" */
export type Follow_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "follow" */
export enum Follow_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FollowedUser = 'followedUser',
  /** column name */
  Id = 'id',
  /** column name */
  IsFollowing = 'isFollowing',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  User = 'user'
}

/** columns and relationships of "invite_code" */
export type Invite_Code = {
  __typename?: 'invite_code';
  createdAt: Scalars['timestamp'];
  redeemedAt?: Maybe<Scalars['timestamp']>;
  redeemerPublicKey?: Maybe<Scalars['String']>;
  senderPublicKey: Scalars['String'];
  updatedAt: Scalars['timestamp'];
};

/** aggregated selection of "invite_code" */
export type Invite_Code_Aggregate = {
  __typename?: 'invite_code_aggregate';
  aggregate?: Maybe<Invite_Code_Aggregate_Fields>;
  nodes: Array<Invite_Code>;
};

/** aggregate fields of "invite_code" */
export type Invite_Code_Aggregate_Fields = {
  __typename?: 'invite_code_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Invite_Code_Max_Fields>;
  min?: Maybe<Invite_Code_Min_Fields>;
};


/** aggregate fields of "invite_code" */
export type Invite_Code_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Invite_Code_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "invite_code" */
export type Invite_Code_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Invite_Code_Max_Order_By>;
  min?: Maybe<Invite_Code_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "invite_code". All fields are combined with a logical 'AND'. */
export type Invite_Code_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Invite_Code_Bool_Exp>>>;
  _not?: Maybe<Invite_Code_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Invite_Code_Bool_Exp>>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  redeemedAt?: Maybe<Timestamp_Comparison_Exp>;
  redeemerPublicKey?: Maybe<String_Comparison_Exp>;
  senderPublicKey?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
};

/** aggregate max on columns */
export type Invite_Code_Max_Fields = {
  __typename?: 'invite_code_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  redeemedAt?: Maybe<Scalars['timestamp']>;
  redeemerPublicKey?: Maybe<Scalars['String']>;
  senderPublicKey?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "invite_code" */
export type Invite_Code_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  redeemedAt?: Maybe<Order_By>;
  redeemerPublicKey?: Maybe<Order_By>;
  senderPublicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Invite_Code_Min_Fields = {
  __typename?: 'invite_code_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  redeemedAt?: Maybe<Scalars['timestamp']>;
  redeemerPublicKey?: Maybe<Scalars['String']>;
  senderPublicKey?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "invite_code" */
export type Invite_Code_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  redeemedAt?: Maybe<Order_By>;
  redeemerPublicKey?: Maybe<Order_By>;
  senderPublicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** ordering options when selecting data from "invite_code" */
export type Invite_Code_Order_By = {
  createdAt?: Maybe<Order_By>;
  redeemedAt?: Maybe<Order_By>;
  redeemerPublicKey?: Maybe<Order_By>;
  senderPublicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

/** primary key columns input for table: "invite_code" */
export type Invite_Code_Pk_Columns_Input = {
  inviteCode: Scalars['String'];
};

/** select columns of table "invite_code" */
export enum Invite_Code_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  RedeemedAt = 'redeemedAt',
  /** column name */
  RedeemerPublicKey = 'redeemerPublicKey',
  /** column name */
  SenderPublicKey = 'senderPublicKey',
  /** column name */
  UpdatedAt = 'updatedAt'
}


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** columns and relationships of "one_time_action" */
export type One_Time_Action = {
  __typename?: 'one_time_action';
  actionType: Scalars['String'];
  createdAt: Scalars['timestamp'];
  id: Scalars['uuid'];
  publicKey: Scalars['String'];
  /** An object relationship */
  user: User;
};

/** Boolean expression to filter rows from the table "one_time_action". All fields are combined with a logical 'AND'. */
export type One_Time_Action_Bool_Exp = {
  _and?: Maybe<Array<Maybe<One_Time_Action_Bool_Exp>>>;
  _not?: Maybe<One_Time_Action_Bool_Exp>;
  _or?: Maybe<Array<Maybe<One_Time_Action_Bool_Exp>>>;
  actionType?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  publicKey?: Maybe<String_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "one_time_action" */
export type One_Time_Action_Order_By = {
  actionType?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
};

/** primary key columns input for table: "one_time_action" */
export type One_Time_Action_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "one_time_action" */
export enum One_Time_Action_Select_Column {
  /** column name */
  ActionType = 'actionType',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  PublicKey = 'publicKey'
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "artwork" */
  artwork: Array<Artwork>;
  /** fetch aggregated fields from the table: "artwork" */
  artwork_aggregate: Artwork_Aggregate;
  /** fetch data from the table: "artwork" using primary key columns */
  artwork_by_pk?: Maybe<Artwork>;
  /** fetch data from the table: "auction" */
  auction: Array<Auction>;
  /** fetch data from the table: "auction" using primary key columns */
  auction_by_pk?: Maybe<Auction>;
  /** fetch data from the table: "event" */
  event: Array<Event>;
  /** fetch data from the table: "event" using primary key columns */
  event_by_pk?: Maybe<Event>;
  /** fetch data from the table: "follow" */
  follow: Array<Follow>;
  /** fetch aggregated fields from the table: "follow" */
  follow_aggregate: Follow_Aggregate;
  /** fetch data from the table: "follow" using primary key columns */
  follow_by_pk?: Maybe<Follow>;
  /** fetch data from the table: "invite_code" */
  invite_code: Array<Invite_Code>;
  /** fetch aggregated fields from the table: "invite_code" */
  invite_code_aggregate: Invite_Code_Aggregate;
  /** fetch data from the table: "invite_code" using primary key columns */
  invite_code_by_pk?: Maybe<Invite_Code>;
  /** fetch data from the table: "one_time_action" */
  one_time_action: Array<One_Time_Action>;
  /** fetch data from the table: "one_time_action" using primary key columns */
  one_time_action_by_pk?: Maybe<One_Time_Action>;
  /** fetch data from the table: "ranked_waitlist" */
  ranked_waitlist: Array<Ranked_Waitlist>;
  /** fetch data from the table: "social_verification" */
  social_verification: Array<Social_Verification>;
  /** fetch data from the table: "social_verification" using primary key columns */
  social_verification_by_pk?: Maybe<Social_Verification>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "waitlist_vote" */
  waitlist_vote: Array<Waitlist_Vote>;
  /** fetch aggregated fields from the table: "waitlist_vote" */
  waitlist_vote_aggregate: Waitlist_Vote_Aggregate;
  /** fetch data from the table: "waitlist_vote" using primary key columns */
  waitlist_vote_by_pk?: Maybe<Waitlist_Vote>;
};


/** query root */
export type Query_RootArtworkArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** query root */
export type Query_RootArtwork_AggregateArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** query root */
export type Query_RootArtwork_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootAuctionArgs = {
  distinct_on?: Maybe<Array<Auction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Auction_Order_By>>;
  where?: Maybe<Auction_Bool_Exp>;
};


/** query root */
export type Query_RootAuction_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootEventArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** query root */
export type Query_RootEvent_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootFollowArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** query root */
export type Query_RootFollow_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** query root */
export type Query_RootFollow_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootInvite_CodeArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** query root */
export type Query_RootInvite_Code_AggregateArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** query root */
export type Query_RootInvite_Code_By_PkArgs = {
  inviteCode: Scalars['String'];
};


/** query root */
export type Query_RootOne_Time_ActionArgs = {
  distinct_on?: Maybe<Array<One_Time_Action_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<One_Time_Action_Order_By>>;
  where?: Maybe<One_Time_Action_Bool_Exp>;
};


/** query root */
export type Query_RootOne_Time_Action_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootRanked_WaitlistArgs = {
  distinct_on?: Maybe<Array<Ranked_Waitlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ranked_Waitlist_Order_By>>;
  where?: Maybe<Ranked_Waitlist_Bool_Exp>;
};


/** query root */
export type Query_RootSocial_VerificationArgs = {
  distinct_on?: Maybe<Array<Social_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Social_Verification_Order_By>>;
  where?: Maybe<Social_Verification_Bool_Exp>;
};


/** query root */
export type Query_RootSocial_Verification_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  publicKey: Scalars['String'];
};


/** query root */
export type Query_RootWaitlist_VoteArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** query root */
export type Query_RootWaitlist_Vote_AggregateArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** query root */
export type Query_RootWaitlist_Vote_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "ranked_waitlist" */
export type Ranked_Waitlist = {
  __typename?: 'ranked_waitlist';
  joinedWaitlistAt?: Maybe<Scalars['timestamp']>;
  publicKey?: Maybe<Scalars['String']>;
  rankNumber?: Maybe<Scalars['bigint']>;
  /** An object relationship */
  user?: Maybe<User>;
  voteCount?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "ranked_waitlist". All fields are combined with a logical 'AND'. */
export type Ranked_Waitlist_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Ranked_Waitlist_Bool_Exp>>>;
  _not?: Maybe<Ranked_Waitlist_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Ranked_Waitlist_Bool_Exp>>>;
  joinedWaitlistAt?: Maybe<Timestamp_Comparison_Exp>;
  publicKey?: Maybe<String_Comparison_Exp>;
  rankNumber?: Maybe<Bigint_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  voteCount?: Maybe<Bigint_Comparison_Exp>;
};

/** ordering options when selecting data from "ranked_waitlist" */
export type Ranked_Waitlist_Order_By = {
  joinedWaitlistAt?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  rankNumber?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  voteCount?: Maybe<Order_By>;
};

/** select columns of table "ranked_waitlist" */
export enum Ranked_Waitlist_Select_Column {
  /** column name */
  JoinedWaitlistAt = 'joinedWaitlistAt',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  RankNumber = 'rankNumber',
  /** column name */
  VoteCount = 'voteCount'
}

/** columns and relationships of "social_verification" */
export type Social_Verification = {
  __typename?: 'social_verification';
  createdAt: Scalars['timestamp'];
  expiresAt?: Maybe<Scalars['timestamp']>;
  failedReason?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  isValid?: Maybe<Scalars['Boolean']>;
  lastCheckedAt?: Maybe<Scalars['timestamp']>;
  service: Scalars['social_verification_service_enum'];
  socialVerificationURL?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['social_verification_status_enum']>;
  updatedAt: Scalars['timestamp'];
  user: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verificationText?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "social_verification". All fields are combined with a logical 'AND'. */
export type Social_Verification_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Social_Verification_Bool_Exp>>>;
  _not?: Maybe<Social_Verification_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Social_Verification_Bool_Exp>>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  expiresAt?: Maybe<Timestamp_Comparison_Exp>;
  failedReason?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  isValid?: Maybe<Boolean_Comparison_Exp>;
  lastCheckedAt?: Maybe<Timestamp_Comparison_Exp>;
  service?: Maybe<Social_Verification_Service_Enum_Comparison_Exp>;
  socialVerificationURL?: Maybe<String_Comparison_Exp>;
  status?: Maybe<Social_Verification_Status_Enum_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<String_Comparison_Exp>;
  userId?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
  verificationText?: Maybe<String_Comparison_Exp>;
};

/** ordering options when selecting data from "social_verification" */
export type Social_Verification_Order_By = {
  createdAt?: Maybe<Order_By>;
  expiresAt?: Maybe<Order_By>;
  failedReason?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  isValid?: Maybe<Order_By>;
  lastCheckedAt?: Maybe<Order_By>;
  service?: Maybe<Order_By>;
  socialVerificationURL?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  user?: Maybe<Order_By>;
  userId?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  verificationText?: Maybe<Order_By>;
};

/** primary key columns input for table: "social_verification" */
export type Social_Verification_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "social_verification" */
export enum Social_Verification_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  FailedReason = 'failedReason',
  /** column name */
  Id = 'id',
  /** column name */
  IsValid = 'isValid',
  /** column name */
  LastCheckedAt = 'lastCheckedAt',
  /** column name */
  Service = 'service',
  /** column name */
  SocialVerificationUrl = 'socialVerificationURL',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  User = 'user',
  /** column name */
  UserId = 'userId',
  /** column name */
  Username = 'username',
  /** column name */
  VerificationText = 'verificationText'
}


/** expression to compare columns of type social_verification_service_enum. All fields are combined with logical 'AND'. */
export type Social_Verification_Service_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['social_verification_service_enum']>;
  _gt?: Maybe<Scalars['social_verification_service_enum']>;
  _gte?: Maybe<Scalars['social_verification_service_enum']>;
  _in?: Maybe<Array<Scalars['social_verification_service_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['social_verification_service_enum']>;
  _lte?: Maybe<Scalars['social_verification_service_enum']>;
  _neq?: Maybe<Scalars['social_verification_service_enum']>;
  _nin?: Maybe<Array<Scalars['social_verification_service_enum']>>;
};


/** expression to compare columns of type social_verification_status_enum. All fields are combined with logical 'AND'. */
export type Social_Verification_Status_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['social_verification_status_enum']>;
  _gt?: Maybe<Scalars['social_verification_status_enum']>;
  _gte?: Maybe<Scalars['social_verification_status_enum']>;
  _in?: Maybe<Array<Scalars['social_verification_status_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['social_verification_status_enum']>;
  _lte?: Maybe<Scalars['social_verification_status_enum']>;
  _neq?: Maybe<Scalars['social_verification_status_enum']>;
  _nin?: Maybe<Array<Scalars['social_verification_status_enum']>>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "artwork" */
  artwork: Array<Artwork>;
  /** fetch aggregated fields from the table: "artwork" */
  artwork_aggregate: Artwork_Aggregate;
  /** fetch data from the table: "artwork" using primary key columns */
  artwork_by_pk?: Maybe<Artwork>;
  /** fetch data from the table: "auction" */
  auction: Array<Auction>;
  /** fetch data from the table: "auction" using primary key columns */
  auction_by_pk?: Maybe<Auction>;
  /** fetch data from the table: "event" */
  event: Array<Event>;
  /** fetch data from the table: "event" using primary key columns */
  event_by_pk?: Maybe<Event>;
  /** fetch data from the table: "follow" */
  follow: Array<Follow>;
  /** fetch aggregated fields from the table: "follow" */
  follow_aggregate: Follow_Aggregate;
  /** fetch data from the table: "follow" using primary key columns */
  follow_by_pk?: Maybe<Follow>;
  /** fetch data from the table: "invite_code" */
  invite_code: Array<Invite_Code>;
  /** fetch aggregated fields from the table: "invite_code" */
  invite_code_aggregate: Invite_Code_Aggregate;
  /** fetch data from the table: "invite_code" using primary key columns */
  invite_code_by_pk?: Maybe<Invite_Code>;
  /** fetch data from the table: "one_time_action" */
  one_time_action: Array<One_Time_Action>;
  /** fetch data from the table: "one_time_action" using primary key columns */
  one_time_action_by_pk?: Maybe<One_Time_Action>;
  /** fetch data from the table: "ranked_waitlist" */
  ranked_waitlist: Array<Ranked_Waitlist>;
  /** fetch data from the table: "social_verification" */
  social_verification: Array<Social_Verification>;
  /** fetch data from the table: "social_verification" using primary key columns */
  social_verification_by_pk?: Maybe<Social_Verification>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "waitlist_vote" */
  waitlist_vote: Array<Waitlist_Vote>;
  /** fetch aggregated fields from the table: "waitlist_vote" */
  waitlist_vote_aggregate: Waitlist_Vote_Aggregate;
  /** fetch data from the table: "waitlist_vote" using primary key columns */
  waitlist_vote_by_pk?: Maybe<Waitlist_Vote>;
};


/** subscription root */
export type Subscription_RootArtworkArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootArtwork_AggregateArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootArtwork_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootAuctionArgs = {
  distinct_on?: Maybe<Array<Auction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Auction_Order_By>>;
  where?: Maybe<Auction_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAuction_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootEventArgs = {
  distinct_on?: Maybe<Array<Event_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Event_Order_By>>;
  where?: Maybe<Event_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvent_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootFollowArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFollow_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFollow_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootInvite_CodeArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvite_Code_AggregateArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootInvite_Code_By_PkArgs = {
  inviteCode: Scalars['String'];
};


/** subscription root */
export type Subscription_RootOne_Time_ActionArgs = {
  distinct_on?: Maybe<Array<One_Time_Action_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<One_Time_Action_Order_By>>;
  where?: Maybe<One_Time_Action_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOne_Time_Action_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRanked_WaitlistArgs = {
  distinct_on?: Maybe<Array<Ranked_Waitlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Ranked_Waitlist_Order_By>>;
  where?: Maybe<Ranked_Waitlist_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSocial_VerificationArgs = {
  distinct_on?: Maybe<Array<Social_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Social_Verification_Order_By>>;
  where?: Maybe<Social_Verification_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSocial_Verification_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  publicKey: Scalars['String'];
};


/** subscription root */
export type Subscription_RootWaitlist_VoteArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWaitlist_Vote_AggregateArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootWaitlist_Vote_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An object relationship */
  acceptedInvite?: Maybe<Invite_Code>;
  /** An array relationship */
  artworks: Array<Artwork>;
  /** An aggregated array relationship */
  artworks_aggregate: Artwork_Aggregate;
  bio?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['timestamp'];
  firstName?: Maybe<Scalars['String']>;
  /** An array relationship */
  following: Array<Follow>;
  /** An aggregated array relationship */
  following_aggregate: Follow_Aggregate;
  /** An array relationship */
  follows: Array<Follow>;
  /** An aggregated array relationship */
  follows_aggregate: Follow_Aggregate;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  highestBidAuctions: Array<Auction>;
  /** An array relationship */
  inviteCodes: Array<Invite_Code>;
  /** An aggregated array relationship */
  inviteCodes_aggregate: Invite_Code_Aggregate;
  isAdmin: Scalars['Boolean'];
  isApprovedCreator: Scalars['Boolean'];
  joinedWaitlistAt?: Maybe<Scalars['timestamp']>;
  lastName?: Maybe<Scalars['String']>;
  lastReadNotificationsAt?: Maybe<Scalars['timestamp']>;
  links: Scalars['jsonb'];
  moderationStatus: Scalars['user_moderationstatus_enum'];
  name?: Maybe<Scalars['String']>;
  /** An array relationship */
  oneTimeActions: Array<One_Time_Action>;
  profileImageUrl?: Maybe<Scalars['String']>;
  providerType: Scalars['user_providertype_enum'];
  publicKey: Scalars['String'];
  /** An array relationship */
  socialVerifications: Array<Social_Verification>;
  updatedAt: Scalars['timestamp'];
  userIndex?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['citext']>;
  /** An object relationship */
  waitlistInfo?: Maybe<Ranked_Waitlist>;
  /** An array relationship */
  waitlistVotesBy: Array<Waitlist_Vote>;
  /** An aggregated array relationship */
  waitlistVotesBy_aggregate: Waitlist_Vote_Aggregate;
  /** An array relationship */
  waitlistVotesFor: Array<Waitlist_Vote>;
  /** An aggregated array relationship */
  waitlistVotesFor_aggregate: Waitlist_Vote_Aggregate;
};


/** columns and relationships of "user" */
export type UserArtworksArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserArtworks_AggregateArgs = {
  distinct_on?: Maybe<Array<Artwork_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Artwork_Order_By>>;
  where?: Maybe<Artwork_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFollowingArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFollowing_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFollowsArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserFollows_AggregateArgs = {
  distinct_on?: Maybe<Array<Follow_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Follow_Order_By>>;
  where?: Maybe<Follow_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserHighestBidAuctionsArgs = {
  distinct_on?: Maybe<Array<Auction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Auction_Order_By>>;
  where?: Maybe<Auction_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserInviteCodesArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserInviteCodes_AggregateArgs = {
  distinct_on?: Maybe<Array<Invite_Code_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Invite_Code_Order_By>>;
  where?: Maybe<Invite_Code_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserLinksArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "user" */
export type UserOneTimeActionsArgs = {
  distinct_on?: Maybe<Array<One_Time_Action_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<One_Time_Action_Order_By>>;
  where?: Maybe<One_Time_Action_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSocialVerificationsArgs = {
  distinct_on?: Maybe<Array<Social_Verification_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Social_Verification_Order_By>>;
  where?: Maybe<Social_Verification_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserWaitlistVotesByArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserWaitlistVotesBy_AggregateArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserWaitlistVotesForArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserWaitlistVotesFor_AggregateArgs = {
  distinct_on?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Waitlist_Vote_Order_By>>;
  where?: Maybe<Waitlist_Vote_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
  stddev?: Maybe<User_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Sum_Order_By>;
  var_pop?: Maybe<User_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Var_Samp_Order_By>;
  variance?: Maybe<User_Variance_Order_By>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  acceptedInvite?: Maybe<Invite_Code_Bool_Exp>;
  artworks?: Maybe<Artwork_Bool_Exp>;
  bio?: Maybe<String_Comparison_Exp>;
  coverImageUrl?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  firstName?: Maybe<String_Comparison_Exp>;
  following?: Maybe<Follow_Bool_Exp>;
  follows?: Maybe<Follow_Bool_Exp>;
  hiddenAt?: Maybe<Timestamp_Comparison_Exp>;
  highestBidAuctions?: Maybe<Auction_Bool_Exp>;
  inviteCodes?: Maybe<Invite_Code_Bool_Exp>;
  isAdmin?: Maybe<Boolean_Comparison_Exp>;
  isApprovedCreator?: Maybe<Boolean_Comparison_Exp>;
  joinedWaitlistAt?: Maybe<Timestamp_Comparison_Exp>;
  lastName?: Maybe<String_Comparison_Exp>;
  lastReadNotificationsAt?: Maybe<Timestamp_Comparison_Exp>;
  links?: Maybe<Jsonb_Comparison_Exp>;
  moderationStatus?: Maybe<User_Moderationstatus_Enum_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  oneTimeActions?: Maybe<One_Time_Action_Bool_Exp>;
  profileImageUrl?: Maybe<String_Comparison_Exp>;
  providerType?: Maybe<User_Providertype_Enum_Comparison_Exp>;
  publicKey?: Maybe<String_Comparison_Exp>;
  socialVerifications?: Maybe<Social_Verification_Bool_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  userIndex?: Maybe<Int_Comparison_Exp>;
  username?: Maybe<Citext_Comparison_Exp>;
  waitlistInfo?: Maybe<Ranked_Waitlist_Bool_Exp>;
  waitlistVotesBy?: Maybe<Waitlist_Vote_Bool_Exp>;
  waitlistVotesFor?: Maybe<Waitlist_Vote_Bool_Exp>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  bio?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  firstName?: Maybe<Scalars['String']>;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  joinedWaitlistAt?: Maybe<Scalars['timestamp']>;
  lastName?: Maybe<Scalars['String']>;
  lastReadNotificationsAt?: Maybe<Scalars['timestamp']>;
  name?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  userIndex?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['citext']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  bio?: Maybe<Order_By>;
  coverImageUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  hiddenAt?: Maybe<Order_By>;
  joinedWaitlistAt?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastReadNotificationsAt?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profileImageUrl?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userIndex?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  bio?: Maybe<Scalars['String']>;
  coverImageUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamp']>;
  firstName?: Maybe<Scalars['String']>;
  hiddenAt?: Maybe<Scalars['timestamp']>;
  joinedWaitlistAt?: Maybe<Scalars['timestamp']>;
  lastName?: Maybe<Scalars['String']>;
  lastReadNotificationsAt?: Maybe<Scalars['timestamp']>;
  name?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  publicKey?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  userIndex?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['citext']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  bio?: Maybe<Order_By>;
  coverImageUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  hiddenAt?: Maybe<Order_By>;
  joinedWaitlistAt?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastReadNotificationsAt?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profileImageUrl?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userIndex?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};


/** expression to compare columns of type user_moderationstatus_enum. All fields are combined with logical 'AND'. */
export type User_Moderationstatus_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['user_moderationstatus_enum']>;
  _gt?: Maybe<Scalars['user_moderationstatus_enum']>;
  _gte?: Maybe<Scalars['user_moderationstatus_enum']>;
  _in?: Maybe<Array<Scalars['user_moderationstatus_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['user_moderationstatus_enum']>;
  _lte?: Maybe<Scalars['user_moderationstatus_enum']>;
  _neq?: Maybe<Scalars['user_moderationstatus_enum']>;
  _nin?: Maybe<Array<Scalars['user_moderationstatus_enum']>>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  acceptedInvite?: Maybe<Invite_Code_Order_By>;
  artworks_aggregate?: Maybe<Artwork_Aggregate_Order_By>;
  bio?: Maybe<Order_By>;
  coverImageUrl?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  firstName?: Maybe<Order_By>;
  following_aggregate?: Maybe<Follow_Aggregate_Order_By>;
  follows_aggregate?: Maybe<Follow_Aggregate_Order_By>;
  hiddenAt?: Maybe<Order_By>;
  inviteCodes_aggregate?: Maybe<Invite_Code_Aggregate_Order_By>;
  isAdmin?: Maybe<Order_By>;
  isApprovedCreator?: Maybe<Order_By>;
  joinedWaitlistAt?: Maybe<Order_By>;
  lastName?: Maybe<Order_By>;
  lastReadNotificationsAt?: Maybe<Order_By>;
  links?: Maybe<Order_By>;
  moderationStatus?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  profileImageUrl?: Maybe<Order_By>;
  providerType?: Maybe<Order_By>;
  publicKey?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userIndex?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
  waitlistInfo?: Maybe<Ranked_Waitlist_Order_By>;
  waitlistVotesBy_aggregate?: Maybe<Waitlist_Vote_Aggregate_Order_By>;
  waitlistVotesFor_aggregate?: Maybe<Waitlist_Vote_Aggregate_Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  publicKey: Scalars['String'];
};


/** expression to compare columns of type user_providertype_enum. All fields are combined with logical 'AND'. */
export type User_Providertype_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['user_providertype_enum']>;
  _gt?: Maybe<Scalars['user_providertype_enum']>;
  _gte?: Maybe<Scalars['user_providertype_enum']>;
  _in?: Maybe<Array<Scalars['user_providertype_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['user_providertype_enum']>;
  _lte?: Maybe<Scalars['user_providertype_enum']>;
  _neq?: Maybe<Scalars['user_providertype_enum']>;
  _nin?: Maybe<Array<Scalars['user_providertype_enum']>>;
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CoverImageUrl = 'coverImageUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FirstName = 'firstName',
  /** column name */
  HiddenAt = 'hiddenAt',
  /** column name */
  IsAdmin = 'isAdmin',
  /** column name */
  IsApprovedCreator = 'isApprovedCreator',
  /** column name */
  JoinedWaitlistAt = 'joinedWaitlistAt',
  /** column name */
  LastName = 'lastName',
  /** column name */
  LastReadNotificationsAt = 'lastReadNotificationsAt',
  /** column name */
  Links = 'links',
  /** column name */
  ModerationStatus = 'moderationStatus',
  /** column name */
  Name = 'name',
  /** column name */
  ProfileImageUrl = 'profileImageUrl',
  /** column name */
  ProviderType = 'providerType',
  /** column name */
  PublicKey = 'publicKey',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserIndex = 'userIndex',
  /** column name */
  Username = 'username'
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  userIndex?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  userIndex?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  userIndex?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  userIndex?: Maybe<Order_By>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "waitlist_vote" */
export type Waitlist_Vote = {
  __typename?: 'waitlist_vote';
  createdAt: Scalars['timestamp'];
  deletedAt?: Maybe<Scalars['timestamp']>;
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamp'];
  /** An object relationship */
  userVoteBy: User;
  /** An object relationship */
  userVoteFor: User;
  voteByUserPublicKey: Scalars['String'];
  voteForUserPublicKey: Scalars['String'];
};

/** aggregated selection of "waitlist_vote" */
export type Waitlist_Vote_Aggregate = {
  __typename?: 'waitlist_vote_aggregate';
  aggregate?: Maybe<Waitlist_Vote_Aggregate_Fields>;
  nodes: Array<Waitlist_Vote>;
};

/** aggregate fields of "waitlist_vote" */
export type Waitlist_Vote_Aggregate_Fields = {
  __typename?: 'waitlist_vote_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Waitlist_Vote_Max_Fields>;
  min?: Maybe<Waitlist_Vote_Min_Fields>;
};


/** aggregate fields of "waitlist_vote" */
export type Waitlist_Vote_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Waitlist_Vote_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "waitlist_vote" */
export type Waitlist_Vote_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Waitlist_Vote_Max_Order_By>;
  min?: Maybe<Waitlist_Vote_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "waitlist_vote". All fields are combined with a logical 'AND'. */
export type Waitlist_Vote_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Waitlist_Vote_Bool_Exp>>>;
  _not?: Maybe<Waitlist_Vote_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Waitlist_Vote_Bool_Exp>>>;
  createdAt?: Maybe<Timestamp_Comparison_Exp>;
  deletedAt?: Maybe<Timestamp_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  updatedAt?: Maybe<Timestamp_Comparison_Exp>;
  userVoteBy?: Maybe<User_Bool_Exp>;
  userVoteFor?: Maybe<User_Bool_Exp>;
  voteByUserPublicKey?: Maybe<String_Comparison_Exp>;
  voteForUserPublicKey?: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Waitlist_Vote_Max_Fields = {
  __typename?: 'waitlist_vote_max_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  deletedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  voteByUserPublicKey?: Maybe<Scalars['String']>;
  voteForUserPublicKey?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "waitlist_vote" */
export type Waitlist_Vote_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  voteByUserPublicKey?: Maybe<Order_By>;
  voteForUserPublicKey?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Waitlist_Vote_Min_Fields = {
  __typename?: 'waitlist_vote_min_fields';
  createdAt?: Maybe<Scalars['timestamp']>;
  deletedAt?: Maybe<Scalars['timestamp']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamp']>;
  voteByUserPublicKey?: Maybe<Scalars['String']>;
  voteForUserPublicKey?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "waitlist_vote" */
export type Waitlist_Vote_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  voteByUserPublicKey?: Maybe<Order_By>;
  voteForUserPublicKey?: Maybe<Order_By>;
};

/** ordering options when selecting data from "waitlist_vote" */
export type Waitlist_Vote_Order_By = {
  createdAt?: Maybe<Order_By>;
  deletedAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  userVoteBy?: Maybe<User_Order_By>;
  userVoteFor?: Maybe<User_Order_By>;
  voteByUserPublicKey?: Maybe<Order_By>;
  voteForUserPublicKey?: Maybe<Order_By>;
};

/** primary key columns input for table: "waitlist_vote" */
export type Waitlist_Vote_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "waitlist_vote" */
export enum Waitlist_Vote_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  VoteByUserPublicKey = 'voteByUserPublicKey',
  /** column name */
  VoteForUserPublicKey = 'voteForUserPublicKey'
}

export type ArtworkFieldsFragment = (
  { __typename?: 'artwork' }
  & Pick<Artwork, 'name' | 'publicKey' | 'description' | 'createdAt' | 'deletedAt'>
);

export type UserFieldsFragment = (
  { __typename?: 'user' }
  & Pick<User, 'publicKey' | 'name' | 'username' | 'bio'>
);

export type HasuraFollowFragmentFragment = (
  { __typename?: 'follow' }
  & Pick<Follow, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'followedUser' | 'isFollowing'>
);

export type ArtworksByUserPublicKeyQueryVariables = Exact<{
  userPublicKey: Scalars['String'];
}>;


export type ArtworksByUserPublicKeyQuery = (
  { __typename?: 'query_root' }
  & { artwork: Array<(
    { __typename?: 'artwork' }
    & ArtworkFieldsFragment
  )> }
);

export type UserByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type UserByPublicKeyQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & UserFieldsFragment
  )> }
);

export type UsersByPublicKeysQueryVariables = Exact<{
  publicKeys?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UsersByPublicKeysQuery = (
  { __typename?: 'query_root' }
  & { user: Array<(
    { __typename?: 'user' }
    & UserFieldsFragment
  )> }
);

export type UserFollowersQueryVariables = Exact<{
  publicKey: Scalars['String'];
  currentUserPublicKey: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type UserFollowersQuery = (
  { __typename?: 'query_root' }
  & { follows: Array<(
    { __typename?: 'follow' }
    & Pick<Follow, 'id'>
    & { user: (
      { __typename?: 'user' }
      & Pick<User, 'name' | 'username' | 'profileImageUrl' | 'userIndex' | 'publicKey'>
      & { follows: Array<(
        { __typename?: 'follow' }
        & Pick<Follow, 'createdAt' | 'isFollowing'>
      )> }
    ) }
  )> }
);

export type GetHasuraUserFollowStateQueryVariables = Exact<{
  currentUserPublicKey: Scalars['String'];
  publicKey: Scalars['String'];
}>;


export type GetHasuraUserFollowStateQuery = (
  { __typename?: 'query_root' }
  & { followerCount: (
    { __typename?: 'follow_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'follow_aggregate_fields' }
      & Pick<Follow_Aggregate_Fields, 'count'>
    )> }
  ), followingCount: (
    { __typename?: 'follow_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'follow_aggregate_fields' }
      & Pick<Follow_Aggregate_Fields, 'count'>
    )> }
  ), mutualFollowCount: (
    { __typename?: 'follow_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'follow_aggregate_fields' }
      & Pick<Follow_Aggregate_Fields, 'count'>
    )> }
  ), follows: Array<(
    { __typename?: 'follow' }
    & HasuraFollowFragmentFragment
  )> }
);

export type HasuraUsernameByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type HasuraUsernameByPublicKeyQuery = (
  { __typename?: 'query_root' }
  & { user?: Maybe<(
    { __typename?: 'user' }
    & Pick<User, 'publicKey' | 'username' | 'profileImageUrl' | 'userIndex' | 'isAdmin'>
  )> }
);

export const ArtworkFieldsFragmentDoc = gql`
    fragment ArtworkFields on artwork {
  name
  publicKey
  description
  createdAt
  deletedAt
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on user {
  publicKey
  name
  username
  bio
}
    `;
export const HasuraFollowFragmentFragmentDoc = gql`
    fragment HasuraFollowFragment on follow {
  id
  createdAt
  updatedAt
  user
  followedUser
  isFollowing
}
    `;
export const ArtworksByUserPublicKeyDocument = gql`
    query artworksByUserPublicKey($userPublicKey: String!) {
  artwork(where: {user: {publicKey: {_eq: $userPublicKey}}}) {
    ...ArtworkFields
  }
}
    ${ArtworkFieldsFragmentDoc}`;

/**
 * __useArtworksByUserPublicKeyQuery__
 *
 * To run a query within a React component, call `useArtworksByUserPublicKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtworksByUserPublicKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtworksByUserPublicKeyQuery({
 *   variables: {
 *      userPublicKey: // value for 'userPublicKey'
 *   },
 * });
 */
export function useArtworksByUserPublicKeyQuery(baseOptions: Apollo.QueryHookOptions<ArtworksByUserPublicKeyQuery, ArtworksByUserPublicKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtworksByUserPublicKeyQuery, ArtworksByUserPublicKeyQueryVariables>(ArtworksByUserPublicKeyDocument, options);
      }
export function useArtworksByUserPublicKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtworksByUserPublicKeyQuery, ArtworksByUserPublicKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtworksByUserPublicKeyQuery, ArtworksByUserPublicKeyQueryVariables>(ArtworksByUserPublicKeyDocument, options);
        }
export type ArtworksByUserPublicKeyQueryHookResult = ReturnType<typeof useArtworksByUserPublicKeyQuery>;
export type ArtworksByUserPublicKeyLazyQueryHookResult = ReturnType<typeof useArtworksByUserPublicKeyLazyQuery>;
export type ArtworksByUserPublicKeyQueryResult = Apollo.QueryResult<ArtworksByUserPublicKeyQuery, ArtworksByUserPublicKeyQueryVariables>;
export const UserByPublicKeyDocument = gql`
    query userByPublicKey($publicKey: String!) {
  user(where: {publicKey: {_eq: $publicKey}}) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserByPublicKeyQuery__
 *
 * To run a query within a React component, call `useUserByPublicKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByPublicKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByPublicKeyQuery({
 *   variables: {
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useUserByPublicKeyQuery(baseOptions: Apollo.QueryHookOptions<UserByPublicKeyQuery, UserByPublicKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByPublicKeyQuery, UserByPublicKeyQueryVariables>(UserByPublicKeyDocument, options);
      }
export function useUserByPublicKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByPublicKeyQuery, UserByPublicKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByPublicKeyQuery, UserByPublicKeyQueryVariables>(UserByPublicKeyDocument, options);
        }
export type UserByPublicKeyQueryHookResult = ReturnType<typeof useUserByPublicKeyQuery>;
export type UserByPublicKeyLazyQueryHookResult = ReturnType<typeof useUserByPublicKeyLazyQuery>;
export type UserByPublicKeyQueryResult = Apollo.QueryResult<UserByPublicKeyQuery, UserByPublicKeyQueryVariables>;
export const UsersByPublicKeysDocument = gql`
    query usersByPublicKeys($publicKeys: [String!]) {
  user(where: {publicKey: {_in: $publicKeys}}) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUsersByPublicKeysQuery__
 *
 * To run a query within a React component, call `useUsersByPublicKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByPublicKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByPublicKeysQuery({
 *   variables: {
 *      publicKeys: // value for 'publicKeys'
 *   },
 * });
 */
export function useUsersByPublicKeysQuery(baseOptions?: Apollo.QueryHookOptions<UsersByPublicKeysQuery, UsersByPublicKeysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByPublicKeysQuery, UsersByPublicKeysQueryVariables>(UsersByPublicKeysDocument, options);
      }
export function useUsersByPublicKeysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByPublicKeysQuery, UsersByPublicKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByPublicKeysQuery, UsersByPublicKeysQueryVariables>(UsersByPublicKeysDocument, options);
        }
export type UsersByPublicKeysQueryHookResult = ReturnType<typeof useUsersByPublicKeysQuery>;
export type UsersByPublicKeysLazyQueryHookResult = ReturnType<typeof useUsersByPublicKeysLazyQuery>;
export type UsersByPublicKeysQueryResult = Apollo.QueryResult<UsersByPublicKeysQuery, UsersByPublicKeysQueryVariables>;
export const UserFollowersDocument = gql`
    query userFollowers($publicKey: String!, $currentUserPublicKey: String!, $offset: Int!, $limit: Int!) {
  follows: follow(
    where: {followedUser: {_eq: $publicKey}, isFollowing: {_eq: true}}
    offset: $offset
    limit: $limit
  ) {
    id
    user: userByFollowingUser {
      name
      username
      profileImageUrl
      userIndex
      publicKey
      follows(where: {user: {_eq: $currentUserPublicKey}, isFollowing: {_eq: true}}) {
        createdAt
        isFollowing
      }
    }
  }
}
    `;

/**
 * __useUserFollowersQuery__
 *
 * To run a query within a React component, call `useUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFollowersQuery({
 *   variables: {
 *      publicKey: // value for 'publicKey'
 *      currentUserPublicKey: // value for 'currentUserPublicKey'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUserFollowersQuery(baseOptions: Apollo.QueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
      }
export function useUserFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFollowersQuery, UserFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFollowersQuery, UserFollowersQueryVariables>(UserFollowersDocument, options);
        }
export type UserFollowersQueryHookResult = ReturnType<typeof useUserFollowersQuery>;
export type UserFollowersLazyQueryHookResult = ReturnType<typeof useUserFollowersLazyQuery>;
export type UserFollowersQueryResult = Apollo.QueryResult<UserFollowersQuery, UserFollowersQueryVariables>;
export const GetHasuraUserFollowStateDocument = gql`
    query getHasuraUserFollowState($currentUserPublicKey: String!, $publicKey: String!) {
  followerCount: follow_aggregate(
    where: {followedUser: {_eq: $publicKey}, isFollowing: {_eq: true}}
  ) {
    aggregate {
      count
    }
  }
  followingCount: follow_aggregate(
    where: {user: {_eq: $publicKey}, isFollowing: {_eq: true}}
  ) {
    aggregate {
      count
    }
  }
  mutualFollowCount: follow_aggregate(
    where: {isFollowing: {_eq: true}, _and: [{followedUser: {_eq: $publicKey}}, {userByFollowingUser: {follows: {user: {_eq: $currentUserPublicKey}, isFollowing: {_eq: true}}}}]}
  ) {
    aggregate {
      count
    }
  }
  follows: follow(
    where: {user: {_eq: $currentUserPublicKey}, followedUser: {_eq: $publicKey}, isFollowing: {_eq: true}}
  ) {
    ...HasuraFollowFragment
  }
}
    ${HasuraFollowFragmentFragmentDoc}`;

/**
 * __useGetHasuraUserFollowStateQuery__
 *
 * To run a query within a React component, call `useGetHasuraUserFollowStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHasuraUserFollowStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHasuraUserFollowStateQuery({
 *   variables: {
 *      currentUserPublicKey: // value for 'currentUserPublicKey'
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useGetHasuraUserFollowStateQuery(baseOptions: Apollo.QueryHookOptions<GetHasuraUserFollowStateQuery, GetHasuraUserFollowStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHasuraUserFollowStateQuery, GetHasuraUserFollowStateQueryVariables>(GetHasuraUserFollowStateDocument, options);
      }
export function useGetHasuraUserFollowStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHasuraUserFollowStateQuery, GetHasuraUserFollowStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHasuraUserFollowStateQuery, GetHasuraUserFollowStateQueryVariables>(GetHasuraUserFollowStateDocument, options);
        }
export type GetHasuraUserFollowStateQueryHookResult = ReturnType<typeof useGetHasuraUserFollowStateQuery>;
export type GetHasuraUserFollowStateLazyQueryHookResult = ReturnType<typeof useGetHasuraUserFollowStateLazyQuery>;
export type GetHasuraUserFollowStateQueryResult = Apollo.QueryResult<GetHasuraUserFollowStateQuery, GetHasuraUserFollowStateQueryVariables>;
export const HasuraUsernameByPublicKeyDocument = gql`
    query hasuraUsernameByPublicKey($publicKey: String!) {
  user: user_by_pk(publicKey: $publicKey) {
    publicKey
    username
    profileImageUrl
    userIndex
    isAdmin
  }
}
    `;

/**
 * __useHasuraUsernameByPublicKeyQuery__
 *
 * To run a query within a React component, call `useHasuraUsernameByPublicKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasuraUsernameByPublicKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasuraUsernameByPublicKeyQuery({
 *   variables: {
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useHasuraUsernameByPublicKeyQuery(baseOptions: Apollo.QueryHookOptions<HasuraUsernameByPublicKeyQuery, HasuraUsernameByPublicKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasuraUsernameByPublicKeyQuery, HasuraUsernameByPublicKeyQueryVariables>(HasuraUsernameByPublicKeyDocument, options);
      }
export function useHasuraUsernameByPublicKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasuraUsernameByPublicKeyQuery, HasuraUsernameByPublicKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasuraUsernameByPublicKeyQuery, HasuraUsernameByPublicKeyQueryVariables>(HasuraUsernameByPublicKeyDocument, options);
        }
export type HasuraUsernameByPublicKeyQueryHookResult = ReturnType<typeof useHasuraUsernameByPublicKeyQuery>;
export type HasuraUsernameByPublicKeyLazyQueryHookResult = ReturnType<typeof useHasuraUsernameByPublicKeyLazyQuery>;
export type HasuraUsernameByPublicKeyQueryResult = Apollo.QueryResult<HasuraUsernameByPublicKeyQuery, HasuraUsernameByPublicKeyQueryVariables>;
export const namedOperations = {
  Query: {
    artworksByUserPublicKey: 'artworksByUserPublicKey',
    userByPublicKey: 'userByPublicKey',
    usersByPublicKeys: 'usersByPublicKeys',
    userFollowers: 'userFollowers',
    getHasuraUserFollowState: 'getHasuraUserFollowState',
    hasuraUsernameByPublicKey: 'hasuraUsernameByPublicKey'
  },
  Fragment: {
    ArtworkFields: 'ArtworkFields',
    UserFields: 'UserFields',
    HasuraFollowFragment: 'HasuraFollowFragment'
  }
}