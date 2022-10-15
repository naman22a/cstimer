import { User } from '@prisma/client';

export const excludeUserDetails = (user: User) => {
    const { password, confirmed, ...rest } = user;
    return rest;
};
