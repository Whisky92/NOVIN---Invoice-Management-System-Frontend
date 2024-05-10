import LoginForm from "./component/forms/login_form/login_form";
import RegisterForm from "./component/forms/register_form/register_form";

export default function Home() {
  return (
    <section className="home_section">
      <LoginForm />
    </section>
  );
}
