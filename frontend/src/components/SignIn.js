import { useState } from "react";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SignIn = ({ userName, setUserName, setSignedIn, displayStatus }) => {
  return (
    <div className="top-1/3 overflow-y-hidden fixed text-center h-screen w-screen ">
      <div>
        <img
          className="block m-auto"
          src="delivery.svg"
          alt="delivery"
          width="150px"
        ></img>
      </div>
      <Input.Search
        className="right-2/4"
        prefix={<UserOutlined />}
        value={userName}
        enterButton="Sign In"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
        size="large"
        style={{ width: 300, margin: 50 }}
        onSearch={(name) => {
          if (!name)
            displayStatus({
              type: "error",
              msg: "Missing user name",
            });
          else {
            displayStatus({
              type: "success",
              msg: "Successfully sign in",
            });
            setSignedIn(true);
          }
        }}
      ></Input.Search>
    </div>
  );
};

export default SignIn;
