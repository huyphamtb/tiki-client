import { LoadingOutlined } from "@ant-design/icons";

const LoadingSection = ({ size }) => {
  return (
    <div
      style={{
        width: "100%",
        margin: "16px 0",
        background: "white",
        textAlign: "center",
        minHeight: 300
      }}
      className="loading__section-container"
    >
      <LoadingOutlined style={{ fontSize: size || 32 }} />
    </div>
  );
};

export default LoadingSection;
