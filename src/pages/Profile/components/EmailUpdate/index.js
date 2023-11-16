import { MailOutlined } from "@ant-design/icons";
import UpdateForm from "../UpdateForm";

const EmailUpdate = ({ onSubmit, initialValue, loginWithGoogle }) => {
  console.log("loginWithGoogle", loginWithGoogle);
  return (
    <div className="update-container">
      <UpdateForm
        placeholder="Nhập email"
        icon={<MailOutlined />}
        onSubmit={onSubmit}
        initialValue={initialValue}
        loginWithGoogle={loginWithGoogle}
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please enter your E-mail!",
          },
        ]}
      />
    </div>
  );
};

export default EmailUpdate;
