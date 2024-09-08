import { Link } from "react-router-dom";

import "./styles.css";

const BreadCrumbs = ({ breadCrumbs }) => {
  if (!breadCrumbs?.length) return "I have no Breadcrumbs for you!";
  return (
    <ul className="breadcrumb-wrapper">
      {breadCrumbs.map(({ key, title, isActive, link }, index) => {
        return (
          <li key={key}>
            <Link to={link}>
              <button className="breadcrumb-btn" data-isactivecrumb={isActive}>
                {title}
              </button>
            </Link>
            {index < breadCrumbs.length - 1 && (
              <span style={{ margin: "0 4px" }}>{"/"}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default BreadCrumbs;
