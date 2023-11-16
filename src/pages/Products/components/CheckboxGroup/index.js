import { Checkbox } from "antd";
import "./style.scss";

const CheckboxGroup = ({ data, onChange, defaultValue }) => {
  return (
    <div className="checkbox__group-wrapper">
      <div className="checkbox-group">
        <Checkbox.Group
          defaultValue={defaultValue}
          options={data}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CheckboxGroup;
