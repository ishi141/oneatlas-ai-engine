import {
LLMProvider,
LLMRequest,
LLMResponse
}
from "./types.js";

export async function executeWithFallback(

providers:LLMProvider[],

request:LLMRequest

):Promise<LLMResponse>{

let last;

for(const provider of providers){

try{

return await provider.generate(request);

}

catch(err){

last=err;

}

}

throw last;

}