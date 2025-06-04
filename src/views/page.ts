import {GridView} from "./grid";
import m from "mithril";


export function Page() {
  let numberOfPairs = 4;
  
  return {
      view: function() {
        return m("main", [
          m("h1", "Memory Game"),
          m("input", {
            type: "number",
            value: numberOfPairs,
            min: 2,
            max: 20,
            onchange: function(e: Event) {
              const inputElem = e.target as HTMLInputElement;
              const inputValue = parseInt(inputElem.value);
              if(isFinite(inputValue)) {
                numberOfPairs = inputValue;                
              }
              else {
                inputElem.value = numberOfPairs.toString();
              }
            },
          }),
          m(GridView, {numberOfPairs}),
        ])
      }
  };
}
