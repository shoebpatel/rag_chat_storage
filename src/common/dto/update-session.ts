import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSessionDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsBoolean()
    isFavorite?: boolean;
}
