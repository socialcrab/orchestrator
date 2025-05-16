import { subscribe } from "../services/message-queue";

export const PROFILE_RESULT = "res_tiktok_profile_1" as const;
export const HASHTAG_RESULT = "res_tiktok_hashtag_1" as const;

export const initTiktokHashtagWorker = async (socket: any) => {
  subscribe<History>(HASHTAG_RESULT, 'tiktok_hashtag', socket);
};

export const initTiktokProfileWorker = async (socket: any) => {
  subscribe<History>(PROFILE_RESULT, 'tiktok_profile', socket);
};
