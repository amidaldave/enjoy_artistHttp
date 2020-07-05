import { ApiProperty } from "@nestjs/swagger";

export class RedactionDto {

    @ApiProperty()
    authorFirstName: string;

    @ApiProperty()
    authorLastName: string;

    @ApiProperty()
    authorMiddleName?: string;

    @ApiProperty()
    authorDod: Date;

    @ApiProperty()
    authorPob: string;

    @ApiProperty()
    authorSexe: string;
    
    @ApiProperty()
    authorPhoneMobile?: string;

    @ApiProperty()
    authorPhoneWork?: string;

    @ApiProperty()
    authorMail?: string;

    @ApiProperty()
    authorAdress?: string;

    @ApiProperty()
    authorPhoto?: string;

    @ApiProperty()
    authorCategory?: string;

}