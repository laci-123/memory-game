import {Card, Grid} from "../grid";
import m from "mithril";


export function GridView() {
  let grid: Grid | undefined;

  return {
    oninit: function() {
      grid = new Grid(4);      
    },
    view: function() {
      return m("div",
               {class: "grid"},
               // Grid is not `undefined` because it is initalized in `oninit` which runs before `view`.
               grid!.mapCards(card => m(CardView, {card})));
    }
  }
}


const CardView = {
  view: function(vnode: {attrs: {card: Card}}) {
    return m("div", {
               style: `background-color: ${vnode.attrs.card.color}`,
               class: "card",
             },
             "x");
  }
}
