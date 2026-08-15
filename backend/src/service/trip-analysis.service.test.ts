import { describe, expect, it } from "vitest";
import { TripAnalysisService } from "./trip-analysis.service";
import type { GPSData } from "../dtos/trip.dto";

describe("TripAnalysisService", () => {
  const service = new TripAnalysisService();

  describe("calculateTrip", () => {
    it("should calculate total distance and speed", () => {
      const data: GPSData[] = [
        {
          latitude: 0,
          longitude: 0,
          timestamp: "2026-08-15T10:00:00Z",
          ignition: "ON",
          speed: 0,
        },
        {
          latitude: 0,
          longitude: 0.001,
          timestamp: "2026-08-15T10:00:10Z",
          ignition: "ON",
          speed: 0,
        },
      ];

      const result = service.calculateTrip(data);

      expect(result.totalDistance).toBeGreaterThan(100);
      expect(result.totalDistance).toBeLessThan(120);

      expect(result.data[1].speed).toBeGreaterThan(0);
    });

    it("should throw an error when there are fewer than two GPS points", () => {
      const data: GPSData[] = [
        {
          latitude: 0,
          longitude: 0,
          timestamp: "2026-08-15T10:00:00Z",
          ignition: "ON",
          speed: 0,
        },
      ];

      expect(() => service.calculateTrip(data)).toThrow();
    });
  });

  describe("analyzeTrip", () => {
    it("should calculate stoppage and idling time", () => {
      const data = [
        {
          latitude: 0,
          longitude: 0,
          timestamp: "2026-08-15T10:00:00Z",
          ignition: "ON" as const,
          speed: 10,
        },
        {
          latitude: 0,
          longitude: 0.001,
          timestamp: "2026-08-15T10:00:10Z",
          ignition: "OFF" as const,
          speed: 0,
        },
        {
          latitude: 0,
          longitude: 0.002,
          timestamp: "2026-08-15T10:00:20Z",
          ignition: "ON" as const,
          speed: 0,
        },
      ];

      const result = service.analyzeTrip(data);

      expect(result.stoppageTime).toBe(10);
      expect(result.idlingTime).toBe(10);
    });

    it("should return zero when there is insufficient data", () => {
      const result = service.analyzeTrip([]);

      expect(result).toEqual({
        idlingTime: 0,
        stoppageTime: 0,
      });
    });
  });
});