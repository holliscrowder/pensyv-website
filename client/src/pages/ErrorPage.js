import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {

    return (
        <>
          <div className = "error_page">
            <p>Whoops! Something went wrong.</p>
            <Link to="/">Home</Link>
          </div>

        </>
      );
}

export default ErrorPage;