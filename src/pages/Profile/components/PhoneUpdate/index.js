import { PhoneOutlined } from "@ant-design/icons";
import { phoneReg } from "../../../../utils/validations";
import UpdateForm from "../UpdateForm";

const PhoneUpdate = ({ onSubmit, initialValue }) => {
  return (
    <div className="update-container">
      <UpdateForm
        onSubmit={onSubmit}
        placeholder="Nhập số điện thoại"
        icon={<PhoneOutlined />}
        initialValue={initialValue}
        rules={[
          {
            pattern: phoneReg,
            message: "The input is not valid phone number!",
            whitespace: true,
          },
          { required: true, message: "Please enter your phone number!" },
        ]}
        name="phone"
      />
    </div>
  );
};

export default PhoneUpdate;
