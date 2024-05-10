import { IsDefined, IsEmail, IsString, ValidateNested } from 'class-validator';

export class CreatePersonDto {
  @ValidateNested({ each: true })
  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsEmail()
  @IsDefined()
  email: string;
}
