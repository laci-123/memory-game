import {Card} from "./grid";


export class Game {
  state: GameState;
  cards: Array<Card>;
  
  constructor(numberOfPairs: number) {
    this.state = { tag: "all_cards_down" };
    this.cards = new Array<Card>();
    this.initCards(numberOfPairs);
  }

  reinitIfNeeded(numberOfPairs: number) {
    if(numberOfPairs !== this.cards.length / 2) {
      this.state = { tag: "all_cards_down" };
      this.cards = new Array<Card>();
      this.initCards(numberOfPairs);
    }
  }

  numOfColsNeededToBeSquare(): number {
    return Math.ceil(Math.sqrt(this.cards.length));
  }

  clickOnCard(card: Card) {
    switch(this.state.tag) {
      case "all_cards_down":
        card.facing = "up";
        this.state = {
          tag: "one_card_up",
          card,
        };
        break;

      case "one_card_up":
        card.facing = "up";
        this.state = {
          tag: "two_cards_up",
          card1: this.state.card,
          card2: card,
        };
        break;

      case "two_cards_up":
        if(this.state.card1.value === this.state.card2.value) {
          this.state.card1.facing = "removed";
          this.state.card2.facing = "removed";
        }
        else {
          this.state.card1.facing = "down";
          this.state.card2.facing = "down";
        }
        if(this.remainingCards() === 0) {
          this.state = {
            tag: "game_finished",
          }  
        }
        else {
          this.state = {
            tag: "all_cards_down",
          };
        }
        break;

      case "game_finished":
        alert("You won!");
        break;

      default:
        throw this.state satisfies never;
    }
  }

  mapCards<T>(f: (card: Card) => T): Array<T> {
    return this.cards.map(f);
  }

  private initCards(numberOfPairs: number) {
    for(let i = 0; i < numberOfPairs; ++i) {
      const card = new Card(i);
      this.cards.push(card);
      this.cards.push(new Card(card));
    }

    shuffleArray(this.cards);
  }

  private remainingCards(): number {
    let count = 0;
    for(const card of this.cards) {
      if(card.facing !== "removed") {
        count += 1;
      }
    }
    return count;
  }
}


type GameState = { tag: "all_cards_down" }
               | { tag: "one_card_up", card: Card }
               | { tag: "two_cards_up", card1: Card, card2: Card }
               | { tag: "game_finished" };

               
function shuffleArray<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
}
