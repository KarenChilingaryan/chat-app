import { IsInt, IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
