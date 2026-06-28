export interface StageResult<T>{

  data:T;

  provider:string;

  model:string;

  latency:number;

  retries:number;

  repaired:boolean;

}