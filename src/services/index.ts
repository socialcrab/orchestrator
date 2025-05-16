import { getProfileReport } from "./tiktok/profile";
import { getHashtagReport } from "./tiktok/hashtag";

export const getReport = async (service: string, key: string): Promise<any> => {
    switch (service) {
        case 'tiktok-profile':
            return await getProfileReport(key)
            break;
        case 'tiktok-hashtag':
            return await getHashtagReport(key)
            break;
        default:
            return null
            break;
    }
};