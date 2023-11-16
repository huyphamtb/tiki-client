import { notification } from "antd";
import { PayPalButton } from "react-paypal-button-v2";

const PaypalPayment = ({ onSuccess, amount }) => {
  return (
    <div>
      <PayPalButton
        amount="100"
        onSuccess={(details, data) => {
          onSuccess();
          notification.success({
            placement: "topRight",
            message: "Thanh toán thành công",
            description:
              "Bạn vừa thực hiện thanh toán qua PayPal, hãy tiếp tục hoàn thiện đơn hàng!",
            duration: 3,
          });
        }}
      />
    </div>
  );
};

export default PaypalPayment;
