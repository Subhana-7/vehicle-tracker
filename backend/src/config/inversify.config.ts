import { Container } from "inversify";
import { TYPES } from "../types";

import { ITripController } from "../controller/interface/ITripController";
import { TripController } from "../controller/trip.controller";

import { ITripService } from "../service/interfaces/ITripService";
import { TripService } from "../service/trip.service";

import { ITripAnalysisService } from "../service/interfaces/ITripAnalysisService";
import { TripAnalysisService } from "../service/trip-analysis.service";

import { ITripRepository } from "../repository/interfaces/ITripRepository";
import { TripRepository } from "../repository/trip.repository";

import { IAuthController } from "../controller/interface/IAuthController";
import { AuthController } from "../controller/auth.controller";

import { IAuthService } from "../service/interfaces/IAuthService";
import { AuthService } from "../service/auth.service";

import { IUserRepository } from "../repository/interfaces/IUserRepository";
import { UserRepository } from "../repository/user.repository";

import { IEmailService } from "../service/interfaces/IEmailService";
import { EmailService } from "../service/email.service";

const container = new Container();

container.bind<ITripController>(TYPES.ITripController).to(TripController);

container.bind<ITripService>(TYPES.ITripService).to(TripService);

container
  .bind<ITripAnalysisService>(TYPES.ITripAnalysisService)
  .to(TripAnalysisService);

container.bind<ITripRepository>(TYPES.ITripRepository).to(TripRepository);

container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

container.bind<IEmailService>(TYPES.IEmailService).to(EmailService);

export default container;
