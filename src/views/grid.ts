import {Grid} from "../grid";
import m from "mithril";


export function GridView(initialVnode: any) {
  let grid: Grid | undefined;

  return {
    oninit: function() {
      grid = new Grid(initialVnode.attrs.numberOfPairs);  
    },

    oncreate: function(vnode: any) {
      vnode.dom.style.setProperty("--number-of-columns", grid!.numOfColsNeededToBeSquare().toString());
    },
    
    onupdate: function(vnode: any) {
      vnode.dom.style.setProperty("--number-of-columns", grid!.numOfColsNeededToBeSquare().toString());
    },

    view: function(vnode: any) {
      grid!.reinitIfNeeded(vnode.attrs.numberOfPairs);
      return m("div",
               {class: "grid"},
               grid!.mapCards(card => m(CardView, {card})));
    }
  }
}


const CardView = {
  view: function(vnode: any) {
    return m("div", { class: "card" },
             vnode.attrs.card.value);
  }
}
