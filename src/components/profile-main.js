import React from 'react';
import { scale } from "../utils/typography"
import { Link } from "gatsby"
import Bio from "./bio"


function ProfileMain(props) {
  return (
    <header className='section__header main'>
      <div className="title"
           style={{
             ...scale(1.5),
           }}>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          <p>나 같은</p>
          <p>사람을 위한</p>
          <p>개발로그</p>
        </Link>
      </div>
      <div className="profile-section">
        <div className="profile">
          <Bio/>
        </div>
      </div>
    </header>
  );
}

export default ProfileMain