import { Radio } from "antd";
import "./style.scss";

const RadioGroup = ({ data, onChange, defaultValue, name }) => {
  return (
    <div className="radio__group-wrapper">
      <div className="radio-list">
        <Radio.Group
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {data.map((item) => (
            <Radio key={item._id} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
};

export default RadioGroup;
