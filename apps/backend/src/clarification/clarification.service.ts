const requiredKeywords = [

"crm",
"dashboard",
"inventory",
"erp",
"ecommerce",
"blog",
"chat",
"authentication"

];

export function needsClarification(
prompt:string
){

const lower=
prompt.toLowerCase();

const found=
requiredKeywords.some(

k=>lower.includes(k)

);

if(found){

return{

required:false,

questions:[]

};

}

return{

required:true,

questions:[

"What type of application do you want?",

"Which entities should exist?",

"Do you need authentication?",

"Which integrations are required?"

]

};

}