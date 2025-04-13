export const USER_ROLE = {
    LANDLORD: "landlord",
    TENANT: "tenant",
    ADMIN: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;