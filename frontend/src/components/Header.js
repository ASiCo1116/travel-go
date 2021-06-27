import { PageHeader, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const Header = () => {
  return (
    <div className="flex justify-around bg-blue-300">
      <PageHeader
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        className="site-page-header font-mono"
        backIcon={false}
        onBack={() => null}
        title="Travel GO !"
      />
      <div className="self-center font-mono text-xl">William</div>
    </div>
  );
};

export default Header;
