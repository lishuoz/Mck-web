import { Player }      from './player';
import { Team }        from './team';
import { Season }      from './season';
import { Edition }     from './edition';
import { Level }       from './level';
import { Size }        from './size';
import { Item }        from './item';
import { Loa }         from './loa';
import { SaleStatus }  from './saleStatus';

export class Product {
  id?: number;
  user?: string;
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
  back_iamge?;
  level_images?;
  loa_images?;
  other_images?;

}