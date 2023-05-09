import { info } from "easyimage";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [type, setType] = useState("repo");
  const [infos,setInfos] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BaseURL = "https://api.github.com/users";

  async function GetUserInfo() {
    const res = await fetch(BaseURL + pathname);
    const data = await res.json();
    setUser([data]);
  }
async function GetUrls(){
    const res = await fetch(BaseURL + pathname + `/${type}`);
    const data = await res.json();
    setInfos(data);
}
  useEffect(() => {
    GetUserInfo();
    GetUrls();
  }, [pathname,type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {user &&
        user.map((uinfo, i) => (
          <div
            key={i}
            className="flex justify-center md:flex-row flex-col md:px-0 px-4 gap-10"
          >
            <img
              src={uinfo.avatar_url}
              className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
            />
            <div className="text-lg leading-10 px-3">
              <h1 className="text-3xl pb-4">{uinfo.name}</h1>
              <h1>
                {" "}
                <span className="text-teal-400">Login_name</span> :{uinfo.login}
              </h1>
              <h1>
                {" "}
                <span className="text-teal-400">Followers</span> :
                {uinfo.followers}
              </h1>
              <h1>
                {" "}
                <span className="text-teal-400">Following</span> :
                {uinfo.following}
              </h1>
              <h1>
                {" "}
                <span className="text-teal-400">public_repositories</span> :
                {uinfo.public_repos}
              </h1>
              <h1>
                {" "}
                <span className="text-teal-400">Join</span> :
                {new Date(uinfo.created_at).toLocaleDateString()}
              </h1>
              <a
                href={uinfo.html_url}
                target="_blank"
                className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600
                 my-3 tracking-wide"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      <div className="flex border-b gap-6 mt-[10%] mb-6 pb-4
        justify-center md:text-xl">
        <Tabs type={type} setType={setType}/>
      </div>
      {type === "repos" && (
        <div>
            <Repo user={user}/>
        </div>
      )}
          {/* {type === "received_events_url" && (
        <div>
            <Events user={user}/>
        </div>
      )} */}
       {type === "follwers" && (
        <div>
            <UsersContainer users={infos}/>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
