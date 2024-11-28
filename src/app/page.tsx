import * as React from "@/react";
console.log("React import is not ignored: ", React);

const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

// const container = document.getElementById("root");
// if (!container) {
//   throw "No Container!";
// }
// ReactDOM.render(element, container)

console.log("Parent: ", element);
console.log("Children: ", element.props.children);
