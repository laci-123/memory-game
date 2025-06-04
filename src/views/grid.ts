import {Card, Grid} from "../grid";
import m from "mithril";


export function GridView(initialVnode: {attrs: {numberOfPairs: number}}) {
  let grid: Grid | undefined;

  return {
    oninit: function() {
      grid = new Grid(initialVnode.attrs.numberOfPairs);  
    },
    view: function(vnode: {attrs: {numberOfPairs: number}}) {
      grid!.reinitIfNeeded(vnode.attrs.numberOfPairs);
      return m("div",
               {class: "grid"},
               grid!.mapCards(card => m(CardView, {card})));
    }
  }
}


const CardView = {
  view: function(vnode: {attrs: {card: Card}}) {
    return m("div", { class: "card" },
             vnode.attrs.card.value);
  }
}
