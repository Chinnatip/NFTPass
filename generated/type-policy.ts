import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type artworkKeySpecifier = ('assetFailedReason' | 'assetIPFSPath' | 'assetId' | 'assetJobId' | 'assetProcessor' | 'assetStatus' | 'assetVersion' | 'auctionStartTxHash' | 'auctions' | 'blurHash' | 'createdAt' | 'deletedAt' | 'description' | 'duration' | 'event' | 'follower' | 'follower_aggregate' | 'height' | 'hiddenAt' | 'id' | 'latestTxDate' | 'metadataIPFSPath' | 'mimeType' | 'mintTxHash' | 'moderationStatus' | 'name' | 'publicKey' | 'status' | 'tokenId' | 'updatedAt' | 'user' | 'width' | artworkKeySpecifier)[];
export type artworkFieldPolicy = {
	assetFailedReason?: FieldPolicy<any> | FieldReadFunction<any>,
	assetIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	assetId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetJobId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetProcessor?: FieldPolicy<any> | FieldReadFunction<any>,
	assetStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionStartTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	auctions?: FieldPolicy<any> | FieldReadFunction<any>,
	blurHash?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	follower?: FieldPolicy<any> | FieldReadFunction<any>,
	follower_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	latestTxDate?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	mimeType?: FieldPolicy<any> | FieldReadFunction<any>,
	mintTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	moderationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_aggregateKeySpecifier = ('aggregate' | 'nodes' | artwork_aggregateKeySpecifier)[];
export type artwork_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_aggregate_fieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddev_pop' | 'stddev_samp' | 'sum' | 'var_pop' | 'var_samp' | 'variance' | artwork_aggregate_fieldsKeySpecifier)[];
export type artwork_aggregate_fieldsFieldPolicy = {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	var_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	var_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_avg_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_avg_fieldsKeySpecifier)[];
export type artwork_avg_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_max_fieldsKeySpecifier = ('assetFailedReason' | 'assetIPFSPath' | 'assetId' | 'assetJobId' | 'assetVersion' | 'auctionStartTxHash' | 'blurHash' | 'createdAt' | 'deletedAt' | 'description' | 'duration' | 'height' | 'hiddenAt' | 'id' | 'latestTxDate' | 'metadataIPFSPath' | 'mimeType' | 'mintTxHash' | 'name' | 'publicKey' | 'tokenId' | 'updatedAt' | 'width' | artwork_max_fieldsKeySpecifier)[];
export type artwork_max_fieldsFieldPolicy = {
	assetFailedReason?: FieldPolicy<any> | FieldReadFunction<any>,
	assetIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	assetId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetJobId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionStartTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	blurHash?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	latestTxDate?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	mimeType?: FieldPolicy<any> | FieldReadFunction<any>,
	mintTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_min_fieldsKeySpecifier = ('assetFailedReason' | 'assetIPFSPath' | 'assetId' | 'assetJobId' | 'assetVersion' | 'auctionStartTxHash' | 'blurHash' | 'createdAt' | 'deletedAt' | 'description' | 'duration' | 'height' | 'hiddenAt' | 'id' | 'latestTxDate' | 'metadataIPFSPath' | 'mimeType' | 'mintTxHash' | 'name' | 'publicKey' | 'tokenId' | 'updatedAt' | 'width' | artwork_min_fieldsKeySpecifier)[];
export type artwork_min_fieldsFieldPolicy = {
	assetFailedReason?: FieldPolicy<any> | FieldReadFunction<any>,
	assetIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	assetId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetJobId?: FieldPolicy<any> | FieldReadFunction<any>,
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionStartTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	blurHash?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	latestTxDate?: FieldPolicy<any> | FieldReadFunction<any>,
	metadataIPFSPath?: FieldPolicy<any> | FieldReadFunction<any>,
	mimeType?: FieldPolicy<any> | FieldReadFunction<any>,
	mintTxHash?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_stddev_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_stddev_fieldsKeySpecifier)[];
export type artwork_stddev_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_stddev_pop_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_stddev_pop_fieldsKeySpecifier)[];
export type artwork_stddev_pop_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_stddev_samp_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_stddev_samp_fieldsKeySpecifier)[];
export type artwork_stddev_samp_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_sum_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_sum_fieldsKeySpecifier)[];
export type artwork_sum_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_var_pop_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_var_pop_fieldsKeySpecifier)[];
export type artwork_var_pop_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_var_samp_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_var_samp_fieldsKeySpecifier)[];
export type artwork_var_samp_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type artwork_variance_fieldsKeySpecifier = ('assetVersion' | 'duration' | 'height' | 'tokenId' | 'width' | artwork_variance_fieldsKeySpecifier)[];
export type artwork_variance_fieldsFieldPolicy = {
	assetVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type auctionKeySpecifier = ('artwork' | 'createdAt' | 'endsAt' | 'highestBidAmount' | 'highestBidder' | 'id' | 'status' | 'tokenId' | 'updatedAt' | 'user' | auctionKeySpecifier)[];
export type auctionFieldPolicy = {
	artwork?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	endsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	highestBidAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	highestBidder?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type eventKeySpecifier = ('artwork' | 'blockTimestamp' | 'createdAt' | 'creatorFollower' | 'creatorFollower_aggregate' | 'data' | 'eventType' | 'follower' | 'follower_aggregate' | 'id' | 'publicKey' | 'tokenCreator' | 'tokenId' | 'updatedAt' | 'user' | 'userByTokencreator' | eventKeySpecifier)[];
export type eventFieldPolicy = {
	artwork?: FieldPolicy<any> | FieldReadFunction<any>,
	blockTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorFollower?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorFollower_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	follower?: FieldPolicy<any> | FieldReadFunction<any>,
	follower_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userByTokencreator?: FieldPolicy<any> | FieldReadFunction<any>
};
export type followKeySpecifier = ('createdAt' | 'followedUser' | 'id' | 'isFollowing' | 'updatedAt' | 'user' | 'userByFollowedUser' | 'userByFollowingUser' | followKeySpecifier)[];
export type followFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	followedUser?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isFollowing?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userByFollowedUser?: FieldPolicy<any> | FieldReadFunction<any>,
	userByFollowingUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type follow_aggregateKeySpecifier = ('aggregate' | 'nodes' | follow_aggregateKeySpecifier)[];
export type follow_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type follow_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | follow_aggregate_fieldsKeySpecifier)[];
export type follow_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type follow_max_fieldsKeySpecifier = ('createdAt' | 'followedUser' | 'id' | 'updatedAt' | 'user' | follow_max_fieldsKeySpecifier)[];
export type follow_max_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	followedUser?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type follow_min_fieldsKeySpecifier = ('createdAt' | 'followedUser' | 'id' | 'updatedAt' | 'user' | follow_min_fieldsKeySpecifier)[];
export type follow_min_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	followedUser?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type invite_codeKeySpecifier = ('createdAt' | 'redeemedAt' | 'redeemerPublicKey' | 'senderPublicKey' | 'updatedAt' | invite_codeKeySpecifier)[];
export type invite_codeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemerPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	senderPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type invite_code_aggregateKeySpecifier = ('aggregate' | 'nodes' | invite_code_aggregateKeySpecifier)[];
export type invite_code_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type invite_code_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | invite_code_aggregate_fieldsKeySpecifier)[];
export type invite_code_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type invite_code_max_fieldsKeySpecifier = ('createdAt' | 'redeemedAt' | 'redeemerPublicKey' | 'senderPublicKey' | 'updatedAt' | invite_code_max_fieldsKeySpecifier)[];
export type invite_code_max_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemerPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	senderPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type invite_code_min_fieldsKeySpecifier = ('createdAt' | 'redeemedAt' | 'redeemerPublicKey' | 'senderPublicKey' | 'updatedAt' | invite_code_min_fieldsKeySpecifier)[];
export type invite_code_min_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	redeemerPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	senderPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type one_time_actionKeySpecifier = ('actionType' | 'createdAt' | 'id' | 'publicKey' | 'user' | one_time_actionKeySpecifier)[];
export type one_time_actionFieldPolicy = {
	actionType?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type query_rootKeySpecifier = ('artwork' | 'artwork_aggregate' | 'artwork_by_pk' | 'auction' | 'auction_by_pk' | 'event' | 'event_by_pk' | 'follow' | 'follow_aggregate' | 'follow_by_pk' | 'invite_code' | 'invite_code_aggregate' | 'invite_code_by_pk' | 'one_time_action' | 'one_time_action_by_pk' | 'ranked_waitlist' | 'social_verification' | 'social_verification_by_pk' | 'user' | 'user_aggregate' | 'user_by_pk' | 'waitlist_vote' | 'waitlist_vote_aggregate' | 'waitlist_vote_by_pk' | query_rootKeySpecifier)[];
export type query_rootFieldPolicy = {
	artwork?: FieldPolicy<any> | FieldReadFunction<any>,
	artwork_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	artwork_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auction_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	event_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	follow?: FieldPolicy<any> | FieldReadFunction<any>,
	follow_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	follow_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	one_time_action?: FieldPolicy<any> | FieldReadFunction<any>,
	one_time_action_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	ranked_waitlist?: FieldPolicy<any> | FieldReadFunction<any>,
	social_verification?: FieldPolicy<any> | FieldReadFunction<any>,
	social_verification_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	user_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ranked_waitlistKeySpecifier = ('joinedWaitlistAt' | 'publicKey' | 'rankNumber' | 'user' | 'voteCount' | ranked_waitlistKeySpecifier)[];
export type ranked_waitlistFieldPolicy = {
	joinedWaitlistAt?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	rankNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	voteCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type social_verificationKeySpecifier = ('createdAt' | 'expiresAt' | 'failedReason' | 'id' | 'isValid' | 'lastCheckedAt' | 'service' | 'socialVerificationURL' | 'status' | 'updatedAt' | 'user' | 'userId' | 'username' | 'verificationText' | social_verificationKeySpecifier)[];
export type social_verificationFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	failedReason?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isValid?: FieldPolicy<any> | FieldReadFunction<any>,
	lastCheckedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	service?: FieldPolicy<any> | FieldReadFunction<any>,
	socialVerificationURL?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	verificationText?: FieldPolicy<any> | FieldReadFunction<any>
};
export type subscription_rootKeySpecifier = ('artwork' | 'artwork_aggregate' | 'artwork_by_pk' | 'auction' | 'auction_by_pk' | 'event' | 'event_by_pk' | 'follow' | 'follow_aggregate' | 'follow_by_pk' | 'invite_code' | 'invite_code_aggregate' | 'invite_code_by_pk' | 'one_time_action' | 'one_time_action_by_pk' | 'ranked_waitlist' | 'social_verification' | 'social_verification_by_pk' | 'user' | 'user_aggregate' | 'user_by_pk' | 'waitlist_vote' | 'waitlist_vote_aggregate' | 'waitlist_vote_by_pk' | subscription_rootKeySpecifier)[];
export type subscription_rootFieldPolicy = {
	artwork?: FieldPolicy<any> | FieldReadFunction<any>,
	artwork_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	artwork_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auction_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	event_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	follow?: FieldPolicy<any> | FieldReadFunction<any>,
	follow_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	follow_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	invite_code_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	one_time_action?: FieldPolicy<any> | FieldReadFunction<any>,
	one_time_action_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	ranked_waitlist?: FieldPolicy<any> | FieldReadFunction<any>,
	social_verification?: FieldPolicy<any> | FieldReadFunction<any>,
	social_verification_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	user_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	user_by_pk?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlist_vote_by_pk?: FieldPolicy<any> | FieldReadFunction<any>
};
export type userKeySpecifier = ('acceptedInvite' | 'artworks' | 'artworks_aggregate' | 'bio' | 'coverImageUrl' | 'createdAt' | 'firstName' | 'following' | 'following_aggregate' | 'follows' | 'follows_aggregate' | 'hiddenAt' | 'highestBidAuctions' | 'inviteCodes' | 'inviteCodes_aggregate' | 'isAdmin' | 'isApprovedCreator' | 'joinedWaitlistAt' | 'lastName' | 'lastReadNotificationsAt' | 'links' | 'moderationStatus' | 'name' | 'oneTimeActions' | 'profileImageUrl' | 'providerType' | 'publicKey' | 'socialVerifications' | 'updatedAt' | 'userIndex' | 'username' | 'waitlistInfo' | 'waitlistVotesBy' | 'waitlistVotesBy_aggregate' | 'waitlistVotesFor' | 'waitlistVotesFor_aggregate' | userKeySpecifier)[];
export type userFieldPolicy = {
	acceptedInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	artworks?: FieldPolicy<any> | FieldReadFunction<any>,
	artworks_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	following?: FieldPolicy<any> | FieldReadFunction<any>,
	following_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	follows?: FieldPolicy<any> | FieldReadFunction<any>,
	follows_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	highestBidAuctions?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteCodes?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteCodes_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	isAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	isApprovedCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	joinedWaitlistAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastReadNotificationsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	moderationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	oneTimeActions?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	providerType?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	socialVerifications?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlistInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlistVotesBy?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlistVotesBy_aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlistVotesFor?: FieldPolicy<any> | FieldReadFunction<any>,
	waitlistVotesFor_aggregate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_aggregateKeySpecifier = ('aggregate' | 'nodes' | user_aggregateKeySpecifier)[];
export type user_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_aggregate_fieldsKeySpecifier = ('avg' | 'count' | 'max' | 'min' | 'stddev' | 'stddev_pop' | 'stddev_samp' | 'sum' | 'var_pop' | 'var_samp' | 'variance' | user_aggregate_fieldsKeySpecifier)[];
export type user_aggregate_fieldsFieldPolicy = {
	avg?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	stddev_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	sum?: FieldPolicy<any> | FieldReadFunction<any>,
	var_pop?: FieldPolicy<any> | FieldReadFunction<any>,
	var_samp?: FieldPolicy<any> | FieldReadFunction<any>,
	variance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_avg_fieldsKeySpecifier = ('userIndex' | user_avg_fieldsKeySpecifier)[];
export type user_avg_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_max_fieldsKeySpecifier = ('bio' | 'coverImageUrl' | 'createdAt' | 'firstName' | 'hiddenAt' | 'joinedWaitlistAt' | 'lastName' | 'lastReadNotificationsAt' | 'name' | 'profileImageUrl' | 'publicKey' | 'updatedAt' | 'userIndex' | 'username' | user_max_fieldsKeySpecifier)[];
export type user_max_fieldsFieldPolicy = {
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	joinedWaitlistAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastReadNotificationsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_min_fieldsKeySpecifier = ('bio' | 'coverImageUrl' | 'createdAt' | 'firstName' | 'hiddenAt' | 'joinedWaitlistAt' | 'lastName' | 'lastReadNotificationsAt' | 'name' | 'profileImageUrl' | 'publicKey' | 'updatedAt' | 'userIndex' | 'username' | user_min_fieldsKeySpecifier)[];
export type user_min_fieldsFieldPolicy = {
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	hiddenAt?: FieldPolicy<any> | FieldReadFunction<any>,
	joinedWaitlistAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastReadNotificationsAt?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	publicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_stddev_fieldsKeySpecifier = ('userIndex' | user_stddev_fieldsKeySpecifier)[];
export type user_stddev_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_stddev_pop_fieldsKeySpecifier = ('userIndex' | user_stddev_pop_fieldsKeySpecifier)[];
export type user_stddev_pop_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_stddev_samp_fieldsKeySpecifier = ('userIndex' | user_stddev_samp_fieldsKeySpecifier)[];
export type user_stddev_samp_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_sum_fieldsKeySpecifier = ('userIndex' | user_sum_fieldsKeySpecifier)[];
export type user_sum_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_var_pop_fieldsKeySpecifier = ('userIndex' | user_var_pop_fieldsKeySpecifier)[];
export type user_var_pop_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_var_samp_fieldsKeySpecifier = ('userIndex' | user_var_samp_fieldsKeySpecifier)[];
export type user_var_samp_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type user_variance_fieldsKeySpecifier = ('userIndex' | user_variance_fieldsKeySpecifier)[];
export type user_variance_fieldsFieldPolicy = {
	userIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type waitlist_voteKeySpecifier = ('createdAt' | 'deletedAt' | 'id' | 'updatedAt' | 'userVoteBy' | 'userVoteFor' | 'voteByUserPublicKey' | 'voteForUserPublicKey' | waitlist_voteKeySpecifier)[];
export type waitlist_voteFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userVoteBy?: FieldPolicy<any> | FieldReadFunction<any>,
	userVoteFor?: FieldPolicy<any> | FieldReadFunction<any>,
	voteByUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	voteForUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type waitlist_vote_aggregateKeySpecifier = ('aggregate' | 'nodes' | waitlist_vote_aggregateKeySpecifier)[];
export type waitlist_vote_aggregateFieldPolicy = {
	aggregate?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type waitlist_vote_aggregate_fieldsKeySpecifier = ('count' | 'max' | 'min' | waitlist_vote_aggregate_fieldsKeySpecifier)[];
export type waitlist_vote_aggregate_fieldsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type waitlist_vote_max_fieldsKeySpecifier = ('createdAt' | 'deletedAt' | 'id' | 'updatedAt' | 'voteByUserPublicKey' | 'voteForUserPublicKey' | waitlist_vote_max_fieldsKeySpecifier)[];
export type waitlist_vote_max_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	voteByUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	voteForUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type waitlist_vote_min_fieldsKeySpecifier = ('createdAt' | 'deletedAt' | 'id' | 'updatedAt' | 'voteByUserPublicKey' | 'voteForUserPublicKey' | waitlist_vote_min_fieldsKeySpecifier)[];
export type waitlist_vote_min_fieldsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	voteByUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>,
	voteForUserPublicKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	artwork?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artworkKeySpecifier | (() => undefined | artworkKeySpecifier),
		fields?: artworkFieldPolicy,
	},
	artwork_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_aggregateKeySpecifier | (() => undefined | artwork_aggregateKeySpecifier),
		fields?: artwork_aggregateFieldPolicy,
	},
	artwork_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_aggregate_fieldsKeySpecifier | (() => undefined | artwork_aggregate_fieldsKeySpecifier),
		fields?: artwork_aggregate_fieldsFieldPolicy,
	},
	artwork_avg_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_avg_fieldsKeySpecifier | (() => undefined | artwork_avg_fieldsKeySpecifier),
		fields?: artwork_avg_fieldsFieldPolicy,
	},
	artwork_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_max_fieldsKeySpecifier | (() => undefined | artwork_max_fieldsKeySpecifier),
		fields?: artwork_max_fieldsFieldPolicy,
	},
	artwork_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_min_fieldsKeySpecifier | (() => undefined | artwork_min_fieldsKeySpecifier),
		fields?: artwork_min_fieldsFieldPolicy,
	},
	artwork_stddev_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_stddev_fieldsKeySpecifier | (() => undefined | artwork_stddev_fieldsKeySpecifier),
		fields?: artwork_stddev_fieldsFieldPolicy,
	},
	artwork_stddev_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_stddev_pop_fieldsKeySpecifier | (() => undefined | artwork_stddev_pop_fieldsKeySpecifier),
		fields?: artwork_stddev_pop_fieldsFieldPolicy,
	},
	artwork_stddev_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_stddev_samp_fieldsKeySpecifier | (() => undefined | artwork_stddev_samp_fieldsKeySpecifier),
		fields?: artwork_stddev_samp_fieldsFieldPolicy,
	},
	artwork_sum_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_sum_fieldsKeySpecifier | (() => undefined | artwork_sum_fieldsKeySpecifier),
		fields?: artwork_sum_fieldsFieldPolicy,
	},
	artwork_var_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_var_pop_fieldsKeySpecifier | (() => undefined | artwork_var_pop_fieldsKeySpecifier),
		fields?: artwork_var_pop_fieldsFieldPolicy,
	},
	artwork_var_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_var_samp_fieldsKeySpecifier | (() => undefined | artwork_var_samp_fieldsKeySpecifier),
		fields?: artwork_var_samp_fieldsFieldPolicy,
	},
	artwork_variance_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | artwork_variance_fieldsKeySpecifier | (() => undefined | artwork_variance_fieldsKeySpecifier),
		fields?: artwork_variance_fieldsFieldPolicy,
	},
	auction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | auctionKeySpecifier | (() => undefined | auctionKeySpecifier),
		fields?: auctionFieldPolicy,
	},
	event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | eventKeySpecifier | (() => undefined | eventKeySpecifier),
		fields?: eventFieldPolicy,
	},
	follow?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | followKeySpecifier | (() => undefined | followKeySpecifier),
		fields?: followFieldPolicy,
	},
	follow_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | follow_aggregateKeySpecifier | (() => undefined | follow_aggregateKeySpecifier),
		fields?: follow_aggregateFieldPolicy,
	},
	follow_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | follow_aggregate_fieldsKeySpecifier | (() => undefined | follow_aggregate_fieldsKeySpecifier),
		fields?: follow_aggregate_fieldsFieldPolicy,
	},
	follow_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | follow_max_fieldsKeySpecifier | (() => undefined | follow_max_fieldsKeySpecifier),
		fields?: follow_max_fieldsFieldPolicy,
	},
	follow_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | follow_min_fieldsKeySpecifier | (() => undefined | follow_min_fieldsKeySpecifier),
		fields?: follow_min_fieldsFieldPolicy,
	},
	invite_code?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | invite_codeKeySpecifier | (() => undefined | invite_codeKeySpecifier),
		fields?: invite_codeFieldPolicy,
	},
	invite_code_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | invite_code_aggregateKeySpecifier | (() => undefined | invite_code_aggregateKeySpecifier),
		fields?: invite_code_aggregateFieldPolicy,
	},
	invite_code_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | invite_code_aggregate_fieldsKeySpecifier | (() => undefined | invite_code_aggregate_fieldsKeySpecifier),
		fields?: invite_code_aggregate_fieldsFieldPolicy,
	},
	invite_code_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | invite_code_max_fieldsKeySpecifier | (() => undefined | invite_code_max_fieldsKeySpecifier),
		fields?: invite_code_max_fieldsFieldPolicy,
	},
	invite_code_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | invite_code_min_fieldsKeySpecifier | (() => undefined | invite_code_min_fieldsKeySpecifier),
		fields?: invite_code_min_fieldsFieldPolicy,
	},
	one_time_action?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | one_time_actionKeySpecifier | (() => undefined | one_time_actionKeySpecifier),
		fields?: one_time_actionFieldPolicy,
	},
	query_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | query_rootKeySpecifier | (() => undefined | query_rootKeySpecifier),
		fields?: query_rootFieldPolicy,
	},
	ranked_waitlist?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ranked_waitlistKeySpecifier | (() => undefined | ranked_waitlistKeySpecifier),
		fields?: ranked_waitlistFieldPolicy,
	},
	social_verification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | social_verificationKeySpecifier | (() => undefined | social_verificationKeySpecifier),
		fields?: social_verificationFieldPolicy,
	},
	subscription_root?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | subscription_rootKeySpecifier | (() => undefined | subscription_rootKeySpecifier),
		fields?: subscription_rootFieldPolicy,
	},
	user?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | userKeySpecifier | (() => undefined | userKeySpecifier),
		fields?: userFieldPolicy,
	},
	user_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_aggregateKeySpecifier | (() => undefined | user_aggregateKeySpecifier),
		fields?: user_aggregateFieldPolicy,
	},
	user_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_aggregate_fieldsKeySpecifier | (() => undefined | user_aggregate_fieldsKeySpecifier),
		fields?: user_aggregate_fieldsFieldPolicy,
	},
	user_avg_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_avg_fieldsKeySpecifier | (() => undefined | user_avg_fieldsKeySpecifier),
		fields?: user_avg_fieldsFieldPolicy,
	},
	user_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_max_fieldsKeySpecifier | (() => undefined | user_max_fieldsKeySpecifier),
		fields?: user_max_fieldsFieldPolicy,
	},
	user_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_min_fieldsKeySpecifier | (() => undefined | user_min_fieldsKeySpecifier),
		fields?: user_min_fieldsFieldPolicy,
	},
	user_stddev_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_stddev_fieldsKeySpecifier | (() => undefined | user_stddev_fieldsKeySpecifier),
		fields?: user_stddev_fieldsFieldPolicy,
	},
	user_stddev_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_stddev_pop_fieldsKeySpecifier | (() => undefined | user_stddev_pop_fieldsKeySpecifier),
		fields?: user_stddev_pop_fieldsFieldPolicy,
	},
	user_stddev_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_stddev_samp_fieldsKeySpecifier | (() => undefined | user_stddev_samp_fieldsKeySpecifier),
		fields?: user_stddev_samp_fieldsFieldPolicy,
	},
	user_sum_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_sum_fieldsKeySpecifier | (() => undefined | user_sum_fieldsKeySpecifier),
		fields?: user_sum_fieldsFieldPolicy,
	},
	user_var_pop_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_var_pop_fieldsKeySpecifier | (() => undefined | user_var_pop_fieldsKeySpecifier),
		fields?: user_var_pop_fieldsFieldPolicy,
	},
	user_var_samp_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_var_samp_fieldsKeySpecifier | (() => undefined | user_var_samp_fieldsKeySpecifier),
		fields?: user_var_samp_fieldsFieldPolicy,
	},
	user_variance_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | user_variance_fieldsKeySpecifier | (() => undefined | user_variance_fieldsKeySpecifier),
		fields?: user_variance_fieldsFieldPolicy,
	},
	waitlist_vote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | waitlist_voteKeySpecifier | (() => undefined | waitlist_voteKeySpecifier),
		fields?: waitlist_voteFieldPolicy,
	},
	waitlist_vote_aggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | waitlist_vote_aggregateKeySpecifier | (() => undefined | waitlist_vote_aggregateKeySpecifier),
		fields?: waitlist_vote_aggregateFieldPolicy,
	},
	waitlist_vote_aggregate_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | waitlist_vote_aggregate_fieldsKeySpecifier | (() => undefined | waitlist_vote_aggregate_fieldsKeySpecifier),
		fields?: waitlist_vote_aggregate_fieldsFieldPolicy,
	},
	waitlist_vote_max_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | waitlist_vote_max_fieldsKeySpecifier | (() => undefined | waitlist_vote_max_fieldsKeySpecifier),
		fields?: waitlist_vote_max_fieldsFieldPolicy,
	},
	waitlist_vote_min_fields?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | waitlist_vote_min_fieldsKeySpecifier | (() => undefined | waitlist_vote_min_fieldsKeySpecifier),
		fields?: waitlist_vote_min_fieldsFieldPolicy,
	}
};