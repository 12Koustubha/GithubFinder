import React from "react";
import { format } from "timeago.js";

const Events = ({ events }) => {
  return (
    <>
      {Array.isArray(events) && events.length > 0 ? (
        events?.map((ev, i) => {
          return (
            <div key={i} className="flex gap-4 items-center">
              <img
                src={ev.actor?.avatar_url}
                alt=""
                className="w-16 rounded-full"
              />
              <h1 className="break-words">
                {ev?.actor?.login} {ev.type}
                <br />
                {ev?.repo?.name}
                <br />
                <span className="text-sm">{format(ev?.created_at)}</span>
              </h1>
            </div>
          );
        })
      ) : (
        <>No Events</>
      )}
    </>
  );
};

export default Events;
