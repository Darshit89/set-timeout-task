import React, { useState, useCallback, useEffect } from "react";
import invitations from "../../json/invitations.json";
import invitationsUpdate from "../../json/invitations_update.json";
import { Card } from "../card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./invitaionlist.css";

const FETCH_INTERVAL = 5 * 1000;

export const InvitaionListing = ({ currentUser, logout }) => {
  const [invites, setInvites] = useState([]);

  const notify = () => toast("Invitaion add");

  const getInvitesForCurrentUSer = useCallback(
    (invites = []) => {
      const { user_id: currentUserId } = currentUser || {};
      return invites.filter(({ user_id }) => Number(user_id) === currentUserId);
    },
    [currentUser]
  );

  const addInvite = (invite) => {
    setInvites((invites) => [...invites, invite]);
  };

  useEffect(() => {
    const invitesForCurrentUser = getInvitesForCurrentUSer(invitations.invites);
    setInvites(invitesForCurrentUser);
  }, [getInvitesForCurrentUSer, setInvites]);

  useEffect(() => {
    const updatedInvitesForCurrentUser = getInvitesForCurrentUSer(
      invitationsUpdate.invites
    );

    const intervalId = setInterval(function () {
      if (updatedInvitesForCurrentUser.length) {
        addInvite(updatedInvitesForCurrentUser.shift());
        notify();
      }
    }, FETCH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [getInvitesForCurrentUSer]);

  return (
    <div>
      <div className="header">
        <button onClick={logout}>Logout</button>
      </div>
      {invites.length ? (
        <>
          <ToastContainer />
          <Card invitationData={invites} />
        </>
      ) : (
        <div>No data to render.</div>
      )}
    </div>
  );
};
