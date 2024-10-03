import EmailVerify from "../../components/login/EmailVerify";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";
import CommonAuthLayout from "../../layout/CommonAuthLayout";

export default function ResetPasswordVerify() {
  useRedirectIfLoggedIn();
  return (
    <CommonAuthLayout
      backLink={"/auth/reset-password"}
      title={"Reset Password"}
      subTitle={
        '"A 5-digit code has just been sent to admin@gmail.com. Enter it below to proceed"'
      }
    >
      {/* <EmailVerify
        verificationCode="123456"
        redirectLink="/auth/set-new-password"
      /> */}
      <div>
        Hi
      </div>
    </CommonAuthLayout>
  );
}
