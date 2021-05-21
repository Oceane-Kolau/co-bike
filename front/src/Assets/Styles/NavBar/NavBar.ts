import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.header`
  width: 100vw;
  height: 100px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  Link {
    color: white;
    text-decoration: none;
  }
`;

export const NavItem = styled(Link)`
    color: white;
    text-decoration: none;
`;
