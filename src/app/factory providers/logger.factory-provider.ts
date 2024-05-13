import { HttpClient } from "@angular/common/http";
import { LoggerService } from "../services/logger.service"

export const loggerProviderFactory = (http: HttpClient) => {
  return new LoggerService(http);
}
