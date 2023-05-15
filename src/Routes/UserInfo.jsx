import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Events from "../components/Events";
import Repo from "../components/Repo";
import Tabs from "../components/Tabs";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

const UserInfo = () => {
  const [user, setUser] = useState({});
  const [type, setType] = useState("repo");
  const [infos, setInfos] = useState([]);
  const [loading,setLoading]  = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let BaseURL = "https://api.github.com/users";

  async function GetUserInfo() {
    setLoading(true);
    const res = await fetch(BaseURL + pathname);
    const data = await res.json();
    setUser(data);
    setLoading(null);
  }
  const GetUrls = useCallback(async (typ) => {
    setUser([]);
    setLoading(true);
    const res = await fetch(BaseURL + pathname + `/${typ}`);
    const data = await res.json();
    setInfos(data);
    setLoading(null);
  }, []);
  useEffect(() => {
    GetUserInfo();
    GetUrls(type);
    return () => {
      setInfos([]);
    };
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200"
      >
        BACK
      </button>
      {Object.keys(user).length > 0 && (
        <div className="flex justify-center md:flex-row flex-col md:px-0 px-4 gap-10">
          <img
            src={user.avatar_url}
            className="w-[350px] border-4 border-teal-400 md:mx-0 mx-auto"
          />
          <div className="text-lg leading-10 px-3">
            <h1 className="text-3xl pb-4">{user.name}</h1>
            <h1>
              {" "}
              <span className="text-teal-400">Login_name</span> :{user.login}
            </h1>
            <h1>
              {" "}
              <span className="text-teal-400">Followers</span> :{user.followers}
            </h1>
            <h1>
              {" "}
              <span className="text-teal-400">Following</span> :{user.following}
            </h1>
            <h1>
              {" "}
              <span className="text-teal-400">public_repositories</span> :
              {user.public_repos}
            </h1>
            <h1>
              {" "}
              <span className="text-teal-400">Join</span> :
              {new Date(user.created_at).toLocaleDateString()}
            </h1>
            <a
              href={user.html_url}
              target="_blank"
              className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600
                 my-3 tracking-wide"
            >
              Visit
            </a>
          </div>
        </div>
      )}
      <div
        className="flex border-b gap-6 mt-[10%] mb-6 pb-4
        justify-center md:text-xl"
      >
        <Tabs type={type} setType={setType} />
      </div>
      {loading && <Loading />}
      {type === "repos" && 
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {!loading && infos && <Repo repos={infos}/>}
        </div>
      }
     
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
       {infos &&   <Events events = {infos}/>}
        </div>
      )}
      {type === "followers" && (
        <div>{type === "followers" && <UsersContainer users={infos} />}</div>
      )}
    </div>
  );
};

export default UserInfo;
