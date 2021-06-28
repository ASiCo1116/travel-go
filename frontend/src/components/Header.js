import { PageHeader, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const Header = () => {
  return (
    <div className="bg-blue-300 top-0 fixed w-full overflow-y-hidden z-50 pb-2">
      <PageHeader
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        className="site-page-header font-mono"
        backIcon={false}
        onBack={() => null}
        title="Travel GO !"
      />
    </div>
  );
};

export default Header;
