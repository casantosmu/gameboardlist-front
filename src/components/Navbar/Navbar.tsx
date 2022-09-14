import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Container from "../Container/Container";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
import StyledNavbar from "./StyledNavbar";

interface Page {
  label: string;
  path: string;
}

interface NavbarProps {
  pages: Array<Page>;
}

const Navbar = ({ pages }: NavbarProps): JSX.Element => {
  return (
    <StyledNavbar>
      <Container breakpoint="large">
        <div className="navbar__row">
          <div className="navbar__col">
            <Link to="/">
              <img
                src="/favicon.webp"
                alt="GameboardsList logo"
                height={26}
                width={26}
              />
            </Link>
          </div>
          <div className="navbar__col">
            <nav className="navbar__navigation">
              <ul className="navbar__list">
                {pages.map(({ path, label }) => (
                  <li className="navbar__list-item" key={path}>
                    <Link to={path} className="navbar__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button onChange={() => {}} semantic="secondary">
              <FontAwesomeIcon icon="power-off" aria-hidden="true" />
              <VisuallyHidden>Logout</VisuallyHidden>
            </Button>
          </div>
        </div>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
