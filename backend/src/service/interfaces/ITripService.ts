export interface ITripService {
  createTripFromFile(userId: string, filePath: string): Promise<any>;
  getTripAnalysis(id: string): Promise<any>;
}
