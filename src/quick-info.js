
import React from "react";

export default ({children}) =>
  <article className="message is-info">
    <div className="message-body">
      <span className="icon" role="img" aria-label="info">
        ℹ️
      </span>
      {children}
    </div>
  </article>;