import EmailVerify from "../../components/login/EmailVerify";
import useRedirectIfLoggedIn from "../../hooks/useRedirectIfLoggedIn";
import CommonAuthLayout from "../../layout/CommonAuthLayout";

export default function ResetPasswordVerify() {
  useRedirectIfLoggedIn();
  return (
    <CommonAuthLayout
      backLink={"/auth/reset-password"}
      title={"Reset Password"}
      subTitle={`"A 6-digit code has just been sent to ${localStorage.getItem(
        "reset-email"
      )}. Enter it below to proceed"`}
    >
      <EmailVerify

        type="ResetPassword"
        redirectLink="/auth/set-new-password"
      />
    </CommonAuthLayout>
  );
}
