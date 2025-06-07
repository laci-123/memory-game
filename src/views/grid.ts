import {Card} from "../card";
import {Game} from "../game";
import m from "mithril";


export function GridView(initialVnode: m.Vnode<{numberOfPairs: number}>): m.Component<{numberOfPairs: number}> {
  let game: Game | undefined;

  return {
    oninit: function() {
      game = new Game(initialVnode.attrs.numberOfPairs);  
    },

    oncreate: function(vnode) {
      (vnode.dom as HTMLElement).style.setProperty("--number-of-columns", game!.numOfColsNeededToBeSquare().toString());
    },
    
    onupdate: function(vnode) {
      (vnode.dom as HTMLElement).style.setProperty("--number-of-columns", game!.numOfColsNeededToBeSquare().toString());
    },

    view: function(vnode) {
      game!.reinitIfNeeded(vnode.attrs.numberOfPairs);
      return m("div",
               {class: "grid"},
               game!.mapCards(card => m(CardView, {card, onclick: (card) => game!.clickOnCard(card)})));
    }
  }
}


const CardView: m.Component<{card: Card, onclick: (card: Card) => void}> = {
  view: function(vnode) {
    const card = vnode.attrs.card;
    return m("div", { class: `card ${cardClass(card)}`,
                      onclick: function() {
                        vnode.attrs.onclick(card);
                      }
                    },
             card.facing === "up" ? card.value : "x");
  }
}


function cardClass(card: Card): string {
  switch(card.facing) {
    case "up":
      return "card-face-up";
    case "down":
      return "card-face-down";
    case "removed":
      return "card-removed";
    default:
      throw card.facing satisfies never;
  }
}
