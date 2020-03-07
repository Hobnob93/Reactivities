import React, { useContext } from 'react';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;

    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to="/">
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to="/activities" />
                <Menu.Item>
                    <Button positive as={NavLink} to="/createActivity" content="Create Activity" />
                </Menu.Item>
                {user && (
                    <Menu.Item position="right">
                        <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
                        <Dropdown pointing="top left" text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={"/profile/username"} text="My Profile" icon="user" />
                                <Dropdown.Item text="Logout" inon="power" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Container>
        </Menu>
    )
}

export default observer(NavBar);