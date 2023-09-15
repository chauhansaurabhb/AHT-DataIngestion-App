import { Request, Response } from 'express';
import { Telemetry } from '../models/Telemetry';
import { getRepository } from 'typeorm';

export const postTelemetryData = async (req: Request, res: Response) => {
    try {
      const telemetryRepository = getRepository(Telemetry);
      const telemetryData = req.body;
      const result =  await telemetryRepository.save(telemetryData);
      res.status(201).json(result);
    } catch (error) {
      console.log(`Something went wrong while storing telemetry data ${(error as Error).message}`);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};