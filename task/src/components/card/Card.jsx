import React from "react";
import "./card.css";

export const Card = ({ invitationData }) => {
  return (
    <div className="container">
      {invitationData.map((invites) => {
        return (
          <div key={invites.invite_id} className="card">
            <p>
              <span>sender:</span>
              {invites.sender_id}
            </p>

            <p>
              <span>Invite:</span>
              {invites.invite}
            </p>
            <p>
              <span>Vector:</span>
              {invites.vector}
            </p>
            <p>
              <span>Invite Time:</span>
              {new Date(invites.invite_time).toISOString().slice(11, 19)}
            </p>
            <p>
              <span>status:</span>
              <span className={invites.status === "read" ? "read" : "unread"}>
                {invites.status}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};
