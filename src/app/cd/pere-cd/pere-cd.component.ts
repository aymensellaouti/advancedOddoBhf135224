import { Component } from '@angular/core';
import { AuthUser } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-pere-cd',
  templateUrl: './pere-cd.component.html',
  styleUrls: ['./pere-cd.component.css']
})
export class PereCdComponent {
  user :  AuthUser = {id: 1, email: 'foo@bar.com'};
  name = 'pere-cd';
}
