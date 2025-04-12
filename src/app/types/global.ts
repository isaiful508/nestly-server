export const USER_ROLE = {
    // professional: "professional",
    // employer: "employer",
    // admin: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;