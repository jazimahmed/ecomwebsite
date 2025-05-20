import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>You have successfully registered to our app. 🎉</p>
      <p>Thanks for joining us!</p>
  </div>
);

export default EmailTemplate;