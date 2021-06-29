import { PageHeader, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useState } from "react";

const Header = ({ signedIn, userName }) => {
  const [visible, setVisable] = useState(false);
  const onClose = () => {
    setVisable(false);
  };

  return (
    <>
      <div
        id="header"
        className="flex bg-blue-300 top-0 fixed w-full overflow-y-hidden z-50 "
      >
        <PageHeader
          className={
            "site-page-header font-mono w-1/3 h-20" +
            (signedIn ? " " : " invisible")
          }
          backIcon={null}
          onBack={() => null}
          title={signedIn ? userName : ""}
        />
        <div className="text-4xl text-center font-bold font-mono mt-4 w-1/3 h-18">
          Travel GO !
        </div>
        <div className="mt-4 w-1/3 h-18"></div>
      </div>
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={document.getElementById("sidebar")}
        style={{ position: "absolute" }}
        width="25%"
      ></Drawer>
    </>
  );
};

export default Header;
