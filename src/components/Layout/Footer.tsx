import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex mt-auto items-center justify-center gap-3 bg-[#7a62f640] p-3">
      <p>
        <span className="flex gap-3 font-medium text-white">
          <Link to={"https://github.com/modestsp"} target={"_blank"}>
            <img
              src="/github-white.png"
              width={25}
              alt="visit my github profile"
            />{" "}
          </Link>
          Sebastián Perichón © 2023
        </span>
      </p>
    </footer>
  );
};

export default Footer;
