import { IsString } from "class-validator";

export class ImageVariationDto {
    @IsString()
    baseImage: string;
}