import EmailVerify from "../../components/login/EmailVerify";
import CommonAuthLayout from "../../layout/CommonAuthLayout";

export default function ResetPasswordVerify() {
  return (
    <CommonAuthLayout
      backLink={"/auth/reset-password"}
      title={"Reset Password"}
      subTitle={
        '"A 5-digit code has just been sent to admin@gmail.com. Enter it below to proceed"'
      }
    >
      <EmailVerify
        verificationCode="123456"
        redirectLink="/auth/set-new-password"
      />
    </CommonAuthLayout>
  );
}
