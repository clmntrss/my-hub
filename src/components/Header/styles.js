import styled from 'styled-components';

export const NavWrapper = styled.ul`
  list-style: none;
`;

export const NavList = styled.li`
  display: inline-block;
  a {
    color: #f8f8f8;
    font-weight: normal;
    padding: 15px 20px;
    margin: 20px;
    position: relative;
    text-decoration: none;
    &:after {
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      content: '';
      display: block;
      height: 2px;
      left: 50%;
      position: absolute;
      background: #fff;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }
    &:hover:after {
      width: 100%;
      left: 0;
    }
  }
  .active:after {
    width: 100%;
    left: 0;
  }
`;
