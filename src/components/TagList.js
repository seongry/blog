import React from "react";
import styled from "styled-components";

const TagLayout = styled.div`
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 8px;
`;

const Tag = styled.span`
  color: ${({ theme }) => theme.colors.black};
  padding: 2px 8px;
  font-size: 12px;

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const TagIcon = styled.span`
  font-size: 20px;
`;

export const TagList = ({ tags }) => {
  return (
    <TagLayout>
      <TagIcon className="material-icons">local_offer</TagIcon>
      {tags.length > 0 &&
        tags.map((tag, index) => <Tag key={index}>#{tag}</Tag>)}
    </TagLayout>
  );
};
