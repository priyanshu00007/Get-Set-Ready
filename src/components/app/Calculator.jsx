import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (n) => {
    if (newNum) {
      setDisplay(n.toString());
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? n.toString() : display + n);
    }
  };

  const handleOp = (operation) => {
    setOp(operation);
    setPrev(parseFloat(display));
    setNewNum(true);
  };

  const calculate = () => {
    if (op && prev !== null) {
      const current = parseFloat(display);
      let res = 0;
      switch (op) {
        case '+': res = prev + current; break;
        case '-': res = prev - current; break;
        case '×': res = prev * current; break;
        case '÷': res = prev / current; break;
        default: return;
      }
      setDisplay(res.toString().slice(0, 10)); // Limit length
      setOp(null);
      setPrev(null);
      setNewNum(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setOp(null);
    setPrev(null);
    setNewNum(true);
  };

  const btnClass = "h-12 w-12 rounded-full font-medium transition-filter hover:brightness-110 active:brightness-90 flex items-center justify-center text-lg shadow-sm";
  const grayBtn = "bg-gray-300 dark:bg-gray-700 text-black dark:text-white";
  const orangeBtn = "bg-orange-500 text-white";
  const darkBtn = "bg-gray-200 dark:bg-gray-800 text-black dark:text-white";

  return (
    <div className="h-full bg-gray-100 dark:bg-[#1c1c1c] p-4 flex flex-col justify-end">
      <div className="text-right text-4xl font-light mb-4 px-2 text-black dark:text-white truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {['C', '±', '%', '÷'].map((b, i) => (
          <button key={b} onClick={() => i === 0 ? clear() : i===3 ? handleOp('÷') : null} 
            className={`${btnClass} ${i===3 ? orangeBtn : grayBtn}`}>{b}</button>
        ))}
        {['7', '8', '9', '×'].map((b, i) => (
          <button key={b} onClick={() => i === 3 ? handleOp('×') : handleNum(b)} 
            className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
        ))}
        {['4', '5', '6', '-'].map((b, i) => (
          <button key={b} onClick={() => i === 3 ? handleOp('-') : handleNum(b)} 
            className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
        ))}
        {['1', '2', '3', '+'].map((b, i) => (
          <button key={b} onClick={() => i === 3 ? handleOp('+') : handleNum(b)} 
            className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
        ))}
        <button onClick={() => handleNum(0)} className={`${btnClass} ${darkBtn} col-span-2 w-full !rounded-full text-left pl-6`}>0</button>
        <button onClick={() => setDisplay(display + '.')} className={`${btnClass} ${darkBtn}`}>.</button>
        <button onClick={calculate} className={`${btnClass} ${orangeBtn}`}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
// import React, { useState } from 'react';

// const CalculatorContent = () => {
//   const [display, setDisplay] = useState('0');
//   const [prev, setPrev] = useState(null);
//   const [op, setOp] = useState(null);
//   const [newNum, setNewNum] = useState(true);

//   const handleNum = (n) => {
//     if (newNum) {
//       setDisplay(n.toString());
//       setNewNum(false);
//     } else {
//       setDisplay(display === '0' ? n.toString() : display + n);
//     }
//   };

//   const handleOp = (operation) => {
//     setOp(operation);
//     setPrev(parseFloat(display));
//     setNewNum(true);
//   };

//   const calculate = () => {
//     if (op && prev !== null) {
//       const current = parseFloat(display);
//       let res = 0;
//       switch (op) {
//         case '+': res = prev + current; break;
//         case '-': res = prev - current; break;
//         case '×': res = prev * current; break;
//         case '÷': res = prev / current; break;
//         default: return;
//       }
//       setDisplay(res.toString().slice(0, 10)); // Limit length
//       setOp(null);
//       setPrev(null);
//       setNewNum(true);
//     }
//   };

//   const clear = () => {
//     setDisplay('0');
//     setOp(null);
//     setPrev(null);
//     setNewNum(true);
//   };

//   const btnClass = "h-12 w-12 rounded-full font-medium transition-filter hover:brightness-110 active:brightness-90 flex items-center justify-center text-lg shadow-sm";
//   const grayBtn = "bg-gray-300 dark:bg-gray-700 text-black dark:text-white";
//   const orangeBtn = "bg-orange-500 text-white";
//   const darkBtn = "bg-gray-200 dark:bg-gray-800 text-black dark:text-white";

//   return (
//     <div className="h-full bg-gray-100 dark:bg-[#1c1c1c] p-4 flex flex-col justify-end">
//       <div className="text-right text-4xl font-light mb-4 px-2 text-black dark:text-white truncate">
//         {display}
//       </div>
//       <div className="grid grid-cols-4 gap-3">
//         {['C', '±', '%', '÷'].map((b, i) => (
//           <button key={b} onClick={() => i === 0 ? clear() : i===3 ? handleOp('÷') : null} 
//             className={`${btnClass} ${i===3 ? orangeBtn : grayBtn}`}>{b}</button>
//         ))}
//         {['7', '8', '9', '×'].map((b, i) => (
//           <button key={b} onClick={() => i === 3 ? handleOp('×') : handleNum(b)} 
//             className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
//         ))}
//         {['4', '5', '6', '-'].map((b, i) => (
//           <button key={b} onClick={() => i === 3 ? handleOp('-') : handleNum(b)} 
//             className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
//         ))}
//         {['1', '2', '3', '+'].map((b, i) => (
//           <button key={b} onClick={() => i === 3 ? handleOp('+') : handleNum(b)} 
//             className={`${btnClass} ${i===3 ? orangeBtn : darkBtn}`}>{b}</button>
//         ))}
//         <button onClick={() => handleNum(0)} className={`${btnClass} ${darkBtn} col-span-2 w-full !rounded-full text-left pl-6`}>0</button>
//         <button onClick={() => setDisplay(display + '.')} className={`${btnClass} ${darkBtn}`}>.</button>
//         <button onClick={calculate} className={`${btnClass} ${orangeBtn}`}>=</button>
//       </div>
//     </div>
//   );
// };

// export default CalculatorContent;