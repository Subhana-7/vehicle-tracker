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

const container = new Container();

container.bind<ITripController>(TYPES.ITripController).to(TripController);

container.bind<ITripService>(TYPES.ITripService).to(TripService);

container
  .bind<ITripAnalysisService>(TYPES.ITripAnalysisService)
  .to(TripAnalysisService);

container.bind<ITripRepository>(TYPES.ITripRepository).to(TripRepository);

export default container;
