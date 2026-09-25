'use client'

export default function Calculadora () {


   return (
      <div className="flex flex-col items-center justify-center w-full h-screen border border-blue-100"> 
         
      <div className="border w-[400px] h-[600px] text-center text-3xl">

  <div className="flex flex-col border pb-6"> 
    <h1>Calculadora</h1> 
    <div className="flex border justify-end">
      <h1>0</h1>
      <h1></h1>
       <h1>0</h1> 
    </div>
  </div>

   {/*-----------------------------------*/} 
  <div className="flex mx-2  justify-center"> 

    <div className="border grid grid-cols-3 w-[60%] h-[500px]"> 
      <button onClick={}>7</button> 
      <button>8</button> 
      <button>9</button> 
      <button>4</button> 
      <button>5</button> 
      <button>6</button> 
      <button>1</button> 
      <button>2</button> 
      <button>3</button> 
      <button>0</button> 
      <button>00</button> 
      <button>.</button> 
    </div> 

    <div className="grid grid-cols-2 border w-[40%] h-[500px]"> 
      <button>÷</button> 
      <button>X</button> 
      <button>-</button> 
      <button>+</button> 
      <button>C</button> 
      <button>=</button> 
    </div> 
  </div> 
      </div>

</div>

   )

}