import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@ApiTags('auth')
export class RegisterDto {
    @ApiProperty({ example: 'Naman', description: 'The name of the user' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'test@test.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'The password of the user',
    })
    @MinLength(6)
    password: string;
}

export class LoginDto {
    @ApiProperty({
        example: 'test@test.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'The password of the user',
    })
    @IsNotEmpty()
    password: string;
}

export class ForgotPasswordDto {
    @ApiProperty({
        example: 'test@test.com',
        description: 'The email of the user',
    })
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({
        example: 'password',
        description: 'The new password of the user',
    })
    @MinLength(6)
    password: string;
}
