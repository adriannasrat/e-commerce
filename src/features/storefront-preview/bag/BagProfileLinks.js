import React from 'react';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const links = [
  { id: 'orders', label: 'Orders', Icon: Inventory2OutlinedIcon },
  { id: 'saves', label: 'Your saves', Icon: BookmarkBorderIcon },
  { id: 'account', label: 'Account', Icon: SettingsOutlinedIcon },
  { id: 'signin', label: 'Sign in', Icon: AccountCircleOutlinedIcon },
];
export default function BagProfileLinks({ onSelect }) {
  return <nav className="bag-panel-profile" aria-label="My profile"><span>My profile</span>
    {links.map(({ id, label, Icon }) => <button key={id} onClick={() => onSelect(id)}><Icon aria-hidden="true" />{label}</button>)}
  </nav>;
}
