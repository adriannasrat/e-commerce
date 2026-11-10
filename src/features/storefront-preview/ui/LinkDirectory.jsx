import React from "react";

// End-of-page directory: the family name, its models in large type, then
// shopping and related links in smaller columns.
export default function LinkDirectory({ title, motto, groups }) {
  return (
    <section
      className="rx-directory"
      aria-label={`${title} directory`}
      data-reveal-group=""
    >
      <div className="rx-wrap">
        <div className="rx-directory-head" data-reveal="up">
          <h2>{title}</h2>
          {motto && <p>{motto}</p>}
        </div>
        <div className="rx-directory-grid">
          {groups.map(([heading, links], index) => (
            <div
              key={heading}
              data-reveal="item"
              className={index === 0 ? "rx-directory-primary" : undefined}
            >
              <h3>{heading}</h3>
              <ul>
                {links.map(([text, href]) => (
                  <li key={text}>
                    <a href={href}>{text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
