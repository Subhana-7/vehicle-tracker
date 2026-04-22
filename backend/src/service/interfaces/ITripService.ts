export interface ITripService {
  createTripFromFile(userId: string, filePath: string): Promise<any>;
  getTripAnalysis(id: string,userId:string): Promise<any>;
  getAllTrips(userId:string):Promise<any>;
}
