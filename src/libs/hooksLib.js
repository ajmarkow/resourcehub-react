import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}

// export function useContentFields(initialState) {
//   const [content, setContent] = useState(initialState);

//   return [
//     content,
//     function (event) {
//       setContent({
//         ...content,
//         [event.target.id]: event.target.value,
//       });
//     },
//   ];
// }
