import { Player }      from './player';
import { Team }        from './team';
import { Season }      from './season';
import { Edition }     from './edition';
import { Level }       from './level';
import { Size }        from './size';
import { Item }        from './item';
import { Loa }         from './loa';
import { SaleStatus }  from './saleStatus';
import { User } from './user';

export class Product {
  id?: number;
  user?: User;
  status?: string;
  players?: Player[];
  team?: Team;
  seasons?: Season[];
  edition?: Edition;
  level?: Level;
  sizes?: Size[];
  items?: Item[];
  loas?: Loa[];
  note?: string;
  description?: string;
  sale_status?: SaleStatus;
  front_image?;
  back_image?;
  level_images?;
  loa_images?;
  other_images?;
}