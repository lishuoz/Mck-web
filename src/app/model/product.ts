import { Player } from './player';
import { Team } from './team';
import { Season } from './season';
import { Edition } from './edition';
import { Level } from './level';
import { Size } from './size';
import { Item } from './item';
import { Loa } from './loa';

export class Product {
  id?: number;
  price?: number;
  note?: string;
  user?: string;
  forSale?: boolean;
  tradeMethod?: string;
  quotedMethod?: string;
  description?: string;
  images?: any;
  players?: Player[];
  team?: Team;
  seasons?: Season[];
  edition?: Edition;
  level?: Level;
  sizes?: Size[];
  items?: Item[];
  loas?: Loa[];
  product_image?;

}