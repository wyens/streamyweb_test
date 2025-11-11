import React from 'react';
import { Text } from '../Components/TextItem';
import { UpdateComponent } from '../../Base/UpdateComponent';
import { controllers } from '../../Controllers/Controllers';
import { UPDATE } from '../../Helpers/constants';

type UserShortNameViewProps = {};

function getInitialsFromFullName(fullName: string): string {
  if (!fullName) {
    return '';
  }
  const normalized = fullName.trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return '';
  }

  const parts = normalized.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return '';
  }

  const first = parts[0];
  const last = parts.length > 1 ? parts[parts.length - 1] : parts[0];

  const firstLetter = first.charAt(0).toUpperCase();
  const lastLetter = last.charAt(0).toUpperCase();

  return parts.length === 1 ? firstLetter : `${firstLetter}${lastLetter}`;
}

class UserShortNameView extends UpdateComponent {
  props: UserShortNameViewProps;

  constructor(props: UserShortNameViewProps) {
    super(props);
    this.props = props;
    this.type = UPDATE.USERINFO;
  }

  render() {
    const fullName = controllers().auth.userInfo?.user.full_name || '';
    const initials = getInitialsFromFullName(fullName);

    return initials;
  }
}

export { UserShortNameView };
