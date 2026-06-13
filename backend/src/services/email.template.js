export const verificationMailHtml = (link)=>`
  <h2>Email Verification</h2>
  <p>Click on the link bellow to verify yourself:</p><br>
  <a href="${link}">Verify Email</a>
  <p>Link will expire in <b>one day</b></p>
  `