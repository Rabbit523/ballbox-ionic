import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable()
export class GlobalProvider {
  public current_user: User;
}
