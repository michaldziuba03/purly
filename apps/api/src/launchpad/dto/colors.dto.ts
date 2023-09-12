import { IsHexColor } from 'class-validator';
import { HexColor } from '../../shared/hex.transformer';

export class ColorsDto {
  @IsHexColor()
  @HexColor()
  bgColor = '#F3F4F6';

  @IsHexColor()
  @HexColor()
  btnColor = '#D1D5DB';

  @IsHexColor()
  @HexColor()
  btnTextColor = '#0F172A';

  @IsHexColor()
  @HexColor()
  textColor = '#0F172A';
}
