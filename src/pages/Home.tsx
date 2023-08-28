import { LinkButton } from "../components/layout/LinkButton";
import savings from "../img/savings.svg";

export function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center p-3 sm:p-16">
      <h1 className="font-bold text-4xl mb-5 text-center">
        Welcome to{" "}
        <span className="text-yellow-500 px-2 sm:inline block bg-gray-800">
          Costs
        </span>
      </h1>
      <p className="mb-6 text-gray-500 text-center">
        Start managing your projects right now!
      </p>
      <LinkButton to="/newproject">Create a new project</LinkButton>
      <img src={savings} alt="Costs" className="w-[350px] my-8 mx-0" />
    </section>
  );
}
