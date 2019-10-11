import React, { Fragment } from 'reactn';
import SearchSection from './SearchSection';

export const SearchResults = ({
  searchParams,
  allCircles: circles,
  allChannels: channels,
  allAmendments: amendments,
  allRevisions: revisions,
  allUsers: users,
}) => {
  circles = circles ? circles : [];
  channels = channels ? channels : [];
  amendments = amendments ? amendments : [];
  revisions = revisions ? revisions : [];
  users = users ? users : [];

  return (
    <Fragment>
      {circles.length > 0 && (
        <SearchSection
          search={searchParams}
          data={circles}
          searchOn={'name'}
          title='circles'
        />
      )}
      {channels.length > 0 && (
        <SearchSection
          search={searchParams}
          data={channels}
          searchOn={'name'}
          title='channels'
        />
      )}
      {amendments.length > 0 && (
        <SearchSection
          search={searchParams}
          data={amendments}
          searchOn={'title'}
          title='amendments'
        />
      )}
      {revisions.length > 0 && (
        <SearchSection
          search={searchParams}
          data={revisions}
          searchOn={'title'}
          title='revisions'
        />
      )}
      {users.length > 0 && (
        <SearchSection
          search={searchParams}
          data={users}
          searchOn={'firstName'}
          title='users'
        />
      )}
    </Fragment>
  );
};
