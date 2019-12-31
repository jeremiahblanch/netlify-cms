import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { translate } from 'react-polyglot';
import { Link } from 'react-router-dom';
import { Icon, components, buttons, shadows, colors } from 'netlify-cms-ui-default';
import { VIEW_STYLE_LIST, VIEW_STYLE_GRID } from 'Constants/collectionViews';

const CollectionTopContainer = styled.div`
  ${components.cardTop};
`;

const CollectionTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CollectionTopHeading = styled.h1`
  ${components.cardTopHeading};
`;

const CollectionTopNewButton = styled(Link)`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;
`;

const CollectionTopDescription = styled.p`
  ${components.cardTopDescription};
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ViewControlsText = styled.span`
  font-size: 14px;
  color: ${colors.text};
  margin-right: 12px;
`;

const ViewControlsButton = styled.button`
  ${buttons.button};
  color: ${props => (props.isActive ? colors.active : '#b3b9c4')};
  background-color: transparent;
  display: block;
  padding: 0;
  margin: 0 4px;

  &:last-child {
    margin-right: 0;
  }

  ${Icon} {
    display: block;
  }
`;

const FilterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 24px;
`;

const FilterControlsInput = styled.input`
  border: 1px #ccc solid;
  box-shadow: 0 0 1px 1px #cccccc33;
`;

const FilterControlsButton = styled.button`
  ${buttons.button};
  color: ${props => (props.isActive ? colors.active : '#b3b9c4')};
  background-color: #0000000d;
  font-size: 12px;
  display: block;
  padding: 4px;
  margin: 0 2px;
`;

const CollectionTop = ({
  collectionLabel,
  collectionLabelSingular,
  collectionDescription,
  listFilter,
  viewStyle,
  onChangeViewStyle,
  onChangeListFilter,
  newEntryUrl,
  t,
}) => {

  return (
    <CollectionTopContainer>
      <CollectionTopRow>
        <CollectionTopHeading>{collectionLabel}</CollectionTopHeading>
        {newEntryUrl ? (
          <CollectionTopNewButton to={newEntryUrl}>
            {t('collection.collectionTop.newButton', {
              collectionLabel: collectionLabelSingular || collectionLabel,
            })}
          </CollectionTopNewButton>
        ) : null}
      </CollectionTopRow>
      {collectionDescription ? (
        <CollectionTopDescription>{collectionDescription}</CollectionTopDescription>
      ) : null}
      <ViewControls>
        <ViewControlsText>{t('collection.collectionTop.viewAs')}:</ViewControlsText>
        <ViewControlsButton
          isActive={viewStyle === VIEW_STYLE_LIST}
          onClick={() => onChangeViewStyle(VIEW_STYLE_LIST)}
        >
          <Icon type="list" />
        </ViewControlsButton>
        <ViewControlsButton
          isActive={viewStyle === VIEW_STYLE_GRID}
          onClick={() => onChangeViewStyle(VIEW_STYLE_GRID)}
        >
          <Icon type="grid" />
        </ViewControlsButton>
      </ViewControls>
      <FilterControls>
        <ViewControlsText>Filter</ViewControlsText>
        <FilterControlsInput
          onBlur={(e) => onChangeListFilter({ field: e.target.value })}
        ></FilterControlsInput>
        <FilterControlsInput
          onBlur={(e) => onChangeListFilter({ 'value': e.target.value })}
        ></FilterControlsInput>
        <FilterControlsButton
          isActive={listFilter === 'label'}
          class="label"
          onClick={() => onChangeListFilter('label')}
        >
            Current
        </FilterControlsButton>
        <FilterControlsButton onClick={() => onChangeListFilter('low')}>
          Low On Stock
        </FilterControlsButton>
        <FilterControlsButton onClick={() => onChangeListFilter('out')}>
          Out of Stock
        </FilterControlsButton>
      </FilterControls>
    </CollectionTopContainer>
  );
};

CollectionTop.propTypes = {
  collectionLabel: PropTypes.string.isRequired,
  collectionLabelSingular: PropTypes.string,
  collectionDescription: PropTypes.string,
  listFilter: PropTypes.object,
  viewStyle: PropTypes.oneOf([VIEW_STYLE_LIST, VIEW_STYLE_GRID]).isRequired,
  onChangeViewStyle: PropTypes.func.isRequired,
  onChangeListFilter: PropTypes.func.isRequired,
  newEntryUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default translate()(CollectionTop);
