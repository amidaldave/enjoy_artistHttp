import { ApiProperty } from "@nestjs/swagger";

export class BookCategoryDto{
    
    @ApiProperty()
    bookCategory: string;
    
}