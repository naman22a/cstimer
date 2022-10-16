export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface ResetPasswordDto {
    token: string;
    password: string;
}
