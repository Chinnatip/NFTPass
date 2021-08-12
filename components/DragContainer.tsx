import React, { useEffect, useState } from 'react';

const Dragger = ({ lists }:{lists: any[]}) => {
  const [ items, setItems ] = useState(lists)
  useEffect(() => { setItems(lists) }, [lists]);

  //TODO: fix card style
  return <div className="grid grid-cols-3 md:p-4 p-0 gap-4 mt-4 w-full bg-gray-300 rounded-xl border-gray-500 border-dashed border-2">
    {items.map((item, index) => <img key={index} src={item.imagePreview} className="shadow-nft border-4 border-white bg-white mr-2 rounded-lg p-1" />)}
  </div>
}

export default Dragger;

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const reorder = (list: any[], result: any) => {
//   const { source: {index: startIndex} , destination: { index: endIndex}  } = result
//   const [removed] = list.splice(startIndex, 1);
//   list.splice(endIndex, 0, removed);
//   return list;
// };

// const onDragEnd = (result: any, lists: any[]) => {
//   if (!result.destination) return
//   const items = reorder( lists, result )
//   setItems(items)
// }

// return <DragDropContext onDragEnd={(e) => onDragEnd(e, items)}>
//   <Droppable droppableId="droppable" direction="horizontal">
//     {(provided) => (
//       <div
//         className="z-10 bg-gray-300 rounded-xl border-gray-500 border-dashed border-2 p-4"
//         style={{ display: '-webkit-inline-box', width: `100%`, padding: 'grid', overflow: 'scroll'}}
//         ref={provided.innerRef}
//         {...provided.droppableProps}
//       >
//         {items.map((item, index) => (
//           <Draggable key={item.id} draggableId={item.id} index={index}>
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.draggableProps}
//                 {...provided.dragHandleProps}
//                 className="bg-gray-500 mr-2 rounded-lg p-1 w-32 h-32"
//                 style={{ background: 'white' ,userSelect: 'none', ...provided.draggableProps.style, }}
//               >
//                 <img src={item.imagePreview} className="" />
//               </div>
//             )}
//           </Draggable>
//         ))}
//         {provided.placeholder}
//       </div>
//     )}
//   </Droppable>
// </DragDropContext>
