import React from "react";

const PageHeader = ({ breadcrumbs }) => {
  return (
    <div className="container banner-bg py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-start m-0">
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={index}
              className={`breadcrumb-item heading ${
                breadcrumb.active ? "active text-white" : ""
              }`}
              aria-current={breadcrumb.active ? "page" : undefined}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: "easeOut",
                  delay: 0.08 * index,
                },
              }}
            >
              {breadcrumb.active ? (
                breadcrumb.label
              ) : (
                <a
                  href={breadcrumb.href}
                  className="text-light text-decoration-none"
                >
                  {breadcrumb.icon && (
                    <i className={`bi ${breadcrumb.icon} me-2`}></i>
                  )}
                  {breadcrumb.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageHeader;
