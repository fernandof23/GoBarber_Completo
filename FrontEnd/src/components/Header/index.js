import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';
import Logo from '~/assets/logo_header.svg';
import Notification from '~/components/Notifications';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <Link to="/dashboard">
                        <img src={Logo} alt="GoBarber" />
                    </Link>
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Notification />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu Perfil</Link>
                        </div>
                        <img src={profile.avatar.url} alt="avatar" />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
