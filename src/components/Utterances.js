import React, { createRef, memo, useLayoutEffect } from "react";

const src = "https://utteranc.es/client.js";

const Utterances = memo(({ repo, theme }) => {
  const containerRef = createRef();

  useLayoutEffect(() => {
    const utterances = document.createElement("script");

    const attributes = {
      src,
      repo,
      theme,
      "issue-term": "pathname",
      label: "✨💬 comments ✨",
      crossOrigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    containerRef.current.appendChild(utterances);
  }, [repo, containerRef, theme]);

  return <div ref={containerRef} />;
});

Utterances.displayName = "Utterances";

export default Utterances;
