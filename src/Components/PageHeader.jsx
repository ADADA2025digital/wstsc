import React from "react";
import Logo from "../assets/Images/logo.jpg";

const PageHeader = ({ breadcrumbs }) => {
  return (
    <div className="container banner-bg py-4">
      <div class="row justify-content-between align-items-center g-2">
        <div className="col-md-6 d-flex gap-3 align-items-center">
          <img src={Logo} alt="" style={{ width: "80px", height: "80px" }} />{" "}
          <h4 className="text-white">Western Sydney Tamil Study Centre</h4>
        </div>
        <div className="col-md-6">
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
      </div>
    </div>
  );
};

export default PageHeader;
