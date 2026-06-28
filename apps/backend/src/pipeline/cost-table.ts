export const COST_TABLE={

groq:{

input:0.00000059,

output:0.00000079

},

gemini:{

input:0.00000035,

output:0.00000105

},

openai:{

input:0.000005,

output:0.000015

}

};

export function estimateCost(

provider:keyof typeof COST_TABLE,

inputTokens:number,

outputTokens:number

){

const p=COST_TABLE[provider];

return(

inputTokens*p.input+

outputTokens*p.output

);

}