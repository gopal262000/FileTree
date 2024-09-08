import clsx from "clsx";
import "./styles.css";

const Button = ({ icon, type, onClick, children, ...rest }) => {
  return (
    <button
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={clsx({ "btn-link": type === "link" })}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
