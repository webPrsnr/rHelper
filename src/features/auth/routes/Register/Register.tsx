import { useNavigate } from "react-router-dom";
import { ContentLayout, RegisterForm } from "../../components";

export const Register = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title={"Зарегестрируйте свой аккаунт"}>
      <RegisterForm onSuccess={() => navigate("/app")} />
    </ContentLayout>
  );
};
