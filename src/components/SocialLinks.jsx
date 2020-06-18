import React from 'react';

import githubLogo from '../images/github_logo.svg';

const SocialLinks = () => (
  <div>
    <a href="https://github.com/kael89/kill-the-king" target="_blank" rel="noopener noreferrer">
      <img src={githubLogo} alt="Github Logo" width="60" />
    </a>
  </div>
);

export default SocialLinks;
