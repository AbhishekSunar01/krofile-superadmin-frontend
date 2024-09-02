import ChangePasswordForm from "../../components/login/ChangePasswordForm";
import CommonAuthLayout from "../../layout/CommonAuthLayout";

const ChangePassword = () => {
  return (
    <>
      <CommonAuthLayout
        backLink={"/dashboard"}
        title={"Change Password"}
        subTitle={
          "Update your password securely to keep your account protected."
        }
        mailImage={true}
      >
        {<ChangePasswordForm />}
      </CommonAuthLayout>
    </>
  );
};

export default ChangePassword;
