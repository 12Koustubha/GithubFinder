import React from "react";

const Repo = ({ repos }) => {
  return (
    <>
      {Array.isArray(repos) && repos.length > 0
        ? repos.map((user, idx) => {
          return  <>
            <div key={idx} className="bg-gray-900 p-3 leading-8">
                <a
                  href={user.html_url}
                  target="_blank"
                  className="text-teal-400 break-words font-semibold hover:underline"
                >
                  {user.full_name}
                </a>
              </div>
              <div className="flex gap-x-5">
                <h1 className="text-sm font-semibold">
                  {" "}
                  {"🟢" + user.language}
                </h1>
                <h1 className="text-sm font-semibold">forks : {user.forks}</h1>
                <h1 className="text-sm font-semibold">
                  stars : {user.stargazers_count}
                </h1>
              </div>
            </>;
          })
        : "No Repos"}
    </>
  );
};

export default Repo;
