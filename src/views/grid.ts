import {Card, Grid} from "../grid";
import m from "mithril";


export function GridView(initialVnode: m.Vnode<{numberOfPairs: number}>): m.Component<{numberOfPairs: number}> {
  let grid: Grid | undefined;

  return {
    oninit: function() {
      grid = new Grid(initialVnode.attrs.numberOfPairs);  
    },

    oncreate: function(vnode) {
      (vnode.dom as HTMLElement).style.setProperty("--number-of-columns", grid!.numOfColsNeededToBeSquare().toString());
    },
    
    onupdate: function(vnode) {
      (vnode.dom as HTMLElement).style.setProperty("--number-of-columns", grid!.numOfColsNeededToBeSquare().toString());
    },

    view: function(vnode) {
      grid!.reinitIfNeeded(vnode.attrs.numberOfPairs);
      return m("div",
               {class: "grid"},
               grid!.mapCards(card => m(CardView, {card})));
    }
  }
}


const CardView: m.Component<{card: Card}> = {
  view: function(vnode) {
    const card = vnode.attrs.card;
    const face_class = card.facing === "up" ? "face-up" : "face-down";
    return m("div", { class: `card ${face_class}`,
                      onclick: function() {
                        card.flip();
                      }
                    },
             card.facing === "up" ? card.value : "x");
  }
}
