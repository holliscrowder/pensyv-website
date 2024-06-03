import { LeaveForm } from "../components/LeaveForm";
import React from "react";
import "./Leave.css"

function Leave() {
    return (
        <>
            <div className = "leave">
                <h2 className = "leave">You can remove your user profile and all associated data from Pensyv at any time!</h2>
                <p className = "leave"> *** <b className = "leave">NOTE</b> ***</p>
                <p className = "leave"><b className = "leave">Your data will be permanently deleted with no recovery.</b></p>
                <p className = "leave">Please re-enter email and username to confirm profile removal.</p>
            </div>
            <LeaveForm />
        </>
      );
}

export default Leave;