import { Component, Inject } from '@angular/core';
import { LOGGER_TOKEN } from './provider tokens/logger.injection-token';
import { LoggerService } from './services/logger.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // logger = new LoggerService();
  constructor(
    @Inject(LoggerService) private loggers: LoggerService[]
  ) {
    this.loggers.forEach(logger => {logger.logger('cc logged form injected service logger');})
  }
  title = 'Starting Advanced Topics';
}
