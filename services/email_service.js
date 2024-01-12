import nodemailer from "nodemailer";
import emailConfig from "../config/email.config.js";

const transporter = nodemailer.createTransport(emailConfig);

export const sendCreateUserEmail = async (email, password) => {
  let htmlContent = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2
            style="text-align: center; text-transform: uppercase;color: teal;"
            >
            Welcome to ESI Products.
            </h2>
            <div style=" font-size: 1.3rem ">
                <p>Congratulations! Your account was successfully created!</p>
                <p> click the button below go to ESI Products Page </p>
                <a
                    href="http://localhost:5173"
                    style="background: crimson; text-decoration: none; color: white; padding: 10px 30px; margin: 10px 0; display: inline-block;  border-radius: 6px;"
                >
                    Go to website
                </a>
                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                    Your login email is : 
                    <span style="color: #4A35EA;">
                        ${email}
                    </span>
                </p>
                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                    Your login password is : 
                    <span style="color: #4A35EA;">
                        ${password}
                    </span>
                </p>
            </div>
        </div>
    `;

  const emailContent = {
    from: emailConfig.auth.user,
    to: email,
    subject: "ESI Account Created",
    html: htmlContent,
  };

  transporter.sendMail(emailContent, function (error, _info) {
    if (error) {
      // if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log('Sending Email error:', error);
      //     console.log('Sending Email error:');
      // }
      console.log("Sending Email error:", error);
      // } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log(`Successfully  send email to ${userEmail}...`);
      // }
    } else {
      console.log(`Successfully  send email to ${email}...`);
    }
  });
};

export const sendDeleteUserEmail = async (email) => {
  let htmlContent = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2
            style="text-align: center; text-transform: uppercase;color: teal;"
            >
            Welcome to ESI Products.
            </h2>
            <div style=" font-size: 1.3rem ">
                <p>I am sorry to see you going! Your account was deleted!</p>
                <p> click the button below go to ESI Products Page </p>
                <a
                    href="http://localhost:5173"
                    style="background: crimson; text-decoration: none; color: white; padding: 10px 30px; margin: 10px 0; display: inline-block;  border-radius: 6px;"
                >
                    Go to website
                </a>
                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                    Your login email is : 
                    <span style="color: #4A35EA;">
                        ${email}
                    </span>
                </p>
            </div>
        </div>
    `;

  const emailContent = {
    from: emailConfig.auth.user,
    to: email,
    subject: "ESI Account Deleted",
    html: htmlContent,
  };

  transporter.sendMail(emailContent, function (error, _info) {
    if (error) {
      // if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log('Sending Email error:', error);
      //     console.log('Sending Email error:');
      // }
      console.log("Sending Email error:", error);
      // } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log(`Successfully  send email to ${userEmail}...`);
      // }
    } else {
      console.log(`Successfully  send email to ${email}...`);
    }
  });
};

export const sendPlaceOrderEmail = async (email, products) => {
  let htmlContent = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2
            style="text-align: center; text-transform: uppercase;color: teal;"
            >
                A new order was placed.
            </h2>
            <div style=" font-size: 1.3rem ">
                Go to <a href="http://localhost:5173/dashboard"> admin/order </a> to view the order.
            </div>
        </div>
    `;

  const emailContent = {
    from: emailConfig.auth.user,
    to: email,
    subject: "ESI an order was placed",
    html: htmlContent,
  };

  transporter.sendMail(emailContent, function (error, _info) {
    if (error) {
      // if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log('Sending Email error:', error);
      //     console.log('Sending Email error:');
      // }
      console.log("Sending Email error:", error);
      // } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      //     console.log(`Successfully  send email to ${userEmail}...`);
      // }
    } else {
      console.log(`Successfully  send email to ${email}...`);
    }
  });
};
