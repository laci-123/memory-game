export class Card {
  value: number;
  facing: "up" | "down" | "removed";

  constructor(value: number);
  constructor(other: Card);
  constructor(x: number | Card) {
    if(typeof(x) === "number") {
      this.value = x;
      this.facing = "down";
    }
    else if(x instanceof Card){
      this.value = x.value;
      this.facing = x.facing;
    }
    else {
      throw x satisfies never;
    }
  }
}

