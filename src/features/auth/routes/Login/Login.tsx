import { useNavigate } from "react-router-dom";
import { ContentLayout, LoginForm } from "../../components";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title={"Войдите в свой аккаунт"}>
      <LoginForm onSuccess={() => navigate("/app")} />
    </ContentLayout>
  );
};
