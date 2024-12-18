import * as React from "@/react";
import * as ReactDOM from "@/react-dom";

const element = (
  <div id="foo">
    <a>bar</a>
    <b />
    <div>i'm a child!</div>
  </div>
) as unknown as React.Element;

const container = document.getElementById("root");

if (!container) {
  throw "No Container!";
}

ReactDOM.render(element, container);
