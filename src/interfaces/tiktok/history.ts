export type THistory = {
    userId: string;
    service: string;
    query: string;
    monitoring: boolean;
    postCount: number;
    status: string;
    statusLog: StatusLog[];

    createdAt: Date | null;
    updatedAt?: Date | null;
}

export type StatusLog = {
    status: string;
}

export const SERVICE = {
    PROFILE: "tiktok-profile",
    HASHTAG: "tiktok-hashtag",
} as const

export const REPORT_STATUS = {
    REQUESTED: "requested",
    QUEUED: "queued",
    PROCESSING: "processing",
    FINISH: "finish",
    CLOSED: "closed",
    NOT_FOUND: "not-found",
    PRIVATE: "private",
    FORBIDDEN: "forbidden",
    BAG_GATEWAY: "bad-gateway",
} as const

export type ReportStatusKey = keyof typeof REPORT_STATUS;
export type ReportStatusValue<Key extends ReportStatusKey> = typeof REPORT_STATUS[Key];