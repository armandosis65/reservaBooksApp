import React from 'react';
import { Avatar } from '@chakra-ui/react'
import { useUser } from '../Providers/UserProvider';


export const ProfileImage = () => {
    const { user} = useUser();
    console.log(user.userImage);
    return <Avatar name={user.name} src={user.userImage} />;
}