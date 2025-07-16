import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSessionValidations {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    isFavorite?: boolean;
}
