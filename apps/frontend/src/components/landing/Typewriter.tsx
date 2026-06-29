"use client";

import {

useEffect,

useState

}

from "react";

const prompts=[

"Build a CRM with Slack integration",

"Generate an ERP System",

"Create an AI SaaS Dashboard",

"Inventory Management System",

"Hospital Management Platform"

];

export default function Typewriter(){

const[display,setDisplay]=

useState("");

const[index,setIndex]=

useState(0);

const[char,setChar]=

useState(0);

useEffect(()=>{

const current=

prompts[index];

const timer=

setTimeout(()=>{

if(char<current.length){

setDisplay(

current.slice(

0,

char+1

)

);

setChar(

char+1

);

}

else{

setTimeout(()=>{

setChar(0);

setDisplay("");

setIndex(

(index+1)%prompts.length

);

},1800);

}

},45);

return()=>clearTimeout(timer);

},[char,index]);

return(

<p className="text-cyan-300 text-lg font-medium">

{display}

<span className="animate-pulse">

|

</span>

</p>

);

}