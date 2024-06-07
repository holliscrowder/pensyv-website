import { LeaveForm } from "../components/LeaveForm";
import React from "react";
import "./Leave.css"

function Leave() {
    return (
        <>
            <div className = "leave">
                <p>You can remove your user profile and all associated data from Pensyv at any time!</p>
                <br/>
                <p><b> *** NOTE ***</b></p>
                <p><b>Your data will be permanently deleted with no recovery.</b></p>
                <br />
                <p>Please re-enter email and username to confirm profile removal.</p>
            </div>
            <LeaveForm />
        </>
      );
}

export default Leave;