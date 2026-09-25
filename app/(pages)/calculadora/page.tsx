'use client'

export default function Calculadora () {
   const n1 = 1
   const n2 = 2
   const n3 = 3
   const n4 = 4
   const n5 = 5
   const n6 = 6
   const n7 = 7
   const n8 = 8
   const n9 = 9
   const primeiroN = 0
   const segundoN = 0
   const res = "."


   return (
      <div className="flex flex-col items-center justify-center w-full h-screen border border-blue-100"> 
         
      <div className="border w-[400px] h-[600px] text-center text-3xl">

  <div className="flex flex-col border pb-6"> 
    <h1>Calculadora</h1> 
    <div className="flex border justify-end">
      <h1>{primeiroN}</h1>
      <h1>{res}</h1>
       <h1>{segundoN}</h1> 
    </div>
  </div>

   {/*-----------------------------------*/} 
  <div className="flex mx-2  justify-center"> 

    <div className="border grid grid-cols-3 w-[60%] h-[500px]"> 
      <button>7</button> 
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