import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { partial } from 'lodash';
import { Cursor } from 'netlify-cms-lib-util';
import {
  loadEntries as actionLoadEntries,
  traverseCollectionCursor as actionTraverseCollectionCursor,
} from 'Actions/entries';
import { selectEntries } from 'Reducers';
import { selectCollectionEntriesCursor } from 'Reducers/cursors';
import Entries from './Entries';

class EntriesCollection extends React.Component {
  static propTypes = {
    collection: ImmutablePropTypes.map.isRequired,
    entries: ImmutablePropTypes.list,
    isFetching: PropTypes.bool.isRequired,
    viewStyle: PropTypes.string,
    listFilter: PropTypes.object,
    cursor: PropTypes.object.isRequired,
    loadEntries: PropTypes.func.isRequired,
    traverseCollectionCursor: PropTypes.func.isRequired,
    entriesLoaded: PropTypes.bool,
  };

  componentDidMount() {
    const { collection, entriesLoaded, loadEntries } = this.props;
    if (collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  componentDidUpdate(prevProps) {
    const { collection, entriesLoaded, loadEntries } = this.props;
    if (collection !== prevProps.collection && !entriesLoaded) {
      loadEntries(collection);
    }
  }

  handleCursorActions = (cursor, action) => {
    const { collection, traverseCollectionCursor } = this.props;
    traverseCollectionCursor(collection, action);
  };

  filterEntries = () => {
    const { entries, listFilter } = this.props;

    if (!listFilter || !listFilter.field || !listFilter.value) {
      return entries;
    }

    return entries.filter((entry, idx) => {
      let found;
      entry._root.nodes.forEach(node => {
        if (
          node.entry[0] === listFilter.field &&
          node.entry[1] === listFilter.value
        ) {
          found = true;
        }
      });

      return found;
    });


  }

  render() {
    const { collection, entries, isFetching, viewStyle, cursor } = this.props;

    return (
      <Entries
        collections={collection}
        entries={this.filterEntries()}
        isFetching={isFetching}
        collectionName={collection.get('label')}
        viewStyle={viewStyle}
        cursor={cursor}
        handleCursorActions={partial(this.handleCursorActions, cursor)}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { collection, viewStyle } = ownProps;
  const page = state.entries.getIn(['pages', collection.get('name'), 'page']);

  const entries = selectEntries(state, collection.get('name'));
  const entriesLoaded = !!state.entries.getIn(['pages', collection.get('name')]);
  const isFetching = state.entries.getIn(['pages', collection.get('name'), 'isFetching'], false);

  const rawCursor = selectCollectionEntriesCursor(state.cursors, collection.get('name'));
  const cursor = Cursor.create(rawCursor).clearData();

  return { collection, page, entries, entriesLoaded, isFetching, viewStyle, cursor };
}

const mapDispatchToProps = {
  loadEntries: actionLoadEntries,
  traverseCollectionCursor: actionTraverseCollectionCursor,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntriesCollection);
