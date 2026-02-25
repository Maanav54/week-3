import React, { useState } from "react";

function Use() {
  let [f] = useState("🍎");
  return <h1>fruit : {f}</h1>;
}

export default Use;
