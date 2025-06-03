import m from "mithril";


function Counter() {
  let count = 0;
  return {
    view: function() {
      return m("div", [m("button", {onclick: function() {count += 1;}},  "Button"),
                       m("p", "value: " + count)]);
    }
  }
};

const CounterPage = {
  view: function() {
    return m("main", [m("h1", {class: "title"}, "This is the title"),
                      m(Counter)])
  }
}

const WellcomePage = {
  view: function() {
    return m("main", [m("h1", {class: "title"}, "Wellcome!"),
                      m("a", {href: "#!/counter"}, "Please enter")]);
  }
}

m.route(document.body, "/wellcome", {
  "/wellcome": WellcomePage,
  "/counter":  CounterPage,
});
