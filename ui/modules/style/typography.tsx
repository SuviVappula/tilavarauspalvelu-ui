import styled from "styled-components";
import { breakpoint } from "../style";

export const SubHeading = styled.div`
  margin-top: var(--spacing-xs);
  font-size: var(--fontsize-heading-l);
  font-family: var(--font-bold);

  @media (max-width: ${breakpoint.s}) {
    font-size: var(--fontsize-heading-m);
  }
`;

export const Strong = styled.span`
  font-family: var(--font-bold);
  font-size: 700;
`;

export const Reqular = styled.span`
  font-family: var(--font-bold);
  font-size: 400;
`;

export const H1 = styled.h1`
  font-size: 1.75rem;
  font-family: var(--font-bold);
  font-weight: 700;
  margin-bottom: var(--spacing-m);
`;

export const H2 = styled.h2`
  font-size: var(--fontsize-heading-m);
  font-family: var(--font-bold);
  font-weight: 700;
  margin-bottom: var(--spacing-m);
`;
