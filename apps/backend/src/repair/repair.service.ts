import { RepairResult } from "./repair.types.js";

export class RepairService {

  private repairs: {
    strategy: string;
    success: boolean;
    time: Date;
  }[] = [];

  record(
    strategy: string,
    success: boolean
  ) {

    this.repairs.push({
      strategy,
      success,
      time: new Date(),
    });

  }

  getLog() {
    return this.repairs;
  }

  clear() {
    this.repairs = [];
  }

}

export const repairService =
  new RepairService();

export function createRepairResult<T>(
  data: T,
  repaired: boolean,
  strategy: string,
  attempts: number
): RepairResult<T> {

  return {
    data,
    repaired,
    strategy,
    attempts,
  };

}