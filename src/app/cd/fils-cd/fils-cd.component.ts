import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthUser } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-fils-cd',
  templateUrl: './fils-cd.component.html',
  styleUrls: ['./fils-cd.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilsCdComponent {
  @Input() user!: AuthUser;
  @Input() name!: string;
}
