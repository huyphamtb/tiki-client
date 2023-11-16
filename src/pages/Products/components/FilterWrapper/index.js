import "./style.scss";

const FilterWrapper = ({ title, children }) => {
  return (
    <div className="filter__field-container">
      <h3 className="filter__field-title">{title}</h3>
      <div className="filter__field-field">{children}</div>
    </div>
  );
};

export default FilterWrapper;
