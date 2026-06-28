import { COST_TABLE } from "./cost.table.js";

import {

estimateTokens

}

from "./token-estimator.js";

import {

CostEntry,

CostSummary

}

from "./cost.types.js";

export class CostService{

private readonly logs=

new Map<string,CostEntry[]>();

record(

jobId:string,

stage:string,

provider:string,

model:string,

latency:number,

input:string,

output:string

){

const inputTokens=

estimateTokens(input);

const outputTokens=

estimateTokens(output);

const table=

COST_TABLE[
provider as keyof typeof COST_TABLE
];

if(!table){

return;

}

const estimatedCost=

inputTokens*table.input+

outputTokens*table.output;

const entry:CostEntry={

stage,

provider,

model,

latency,

inputTokens,

outputTokens,

estimatedCost,

timestamp:new Date().toISOString()

};

const current=

this.logs.get(jobId)??[];

current.push(entry);

this.logs.set(

jobId,

current

);

}

summary(

jobId:string

):CostSummary{

const entries=

this.logs.get(jobId)??[];

return{

totalCost:

entries.reduce(

(a,b)=>

a+b.estimatedCost,

0

),

totalInputTokens:

entries.reduce(

(a,b)=>

a+b.inputTokens,

0

),

totalOutputTokens:

entries.reduce(

(a,b)=>

a+b.outputTokens,

0

),

totalLatency:

entries.reduce(

(a,b)=>

a+b.latency,

0

),

entries

};

}

}

export const

costService=

new CostService();