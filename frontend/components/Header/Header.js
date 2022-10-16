import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Link from "next/link";
import { isAuthed } from "../../helper";

const Header = () => {
    const { width } = useContext(UserContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const cartItems = useSelector((state) => state.cartItems);

    useEffect(() => {
        if (width >= 768) {
            setMenuOpen(true);
        }
    }, [width]);

    const menuStateHandler = () => {
        setMenuOpen(!menuOpen);
        console.log(menuOpen);
    };

    const hideMenuOnMobileClick = () => {
        if (width < 768) {
            setMenuOpen(!menuOpen);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar__action">
                <div className="navbar__action__logo">
                    <Link href="/" passHref>GreatToGet</Link>
                </div>
                <div
                    className="navbar__action__hamburger"
                    onClick={menuStateHandler}
                >
                    <FontAwesomeIcon icon={faBars} color={"#00000"} />
                </div>
            </div>

            <nav className="navbar__items" hidden={menuOpen && width < 768}>
                <Link href="/" passHref>
                    <div
                        className="navbar__item"
                        onClick={hideMenuOnMobileClick}
                    >
                        Home
                    </div>
                </Link>
                <Link href="/about" passHref>
                    <div className="navbar__item" onClick={hideMenuOnMobileClick}>about</div>
                </Link>
                <Link href="/blogs" passHref>
                    <div className="navbar__item" onClick={hideMenuOnMobileClick}> blogs</div>
                </Link>
                <Link href="/shop" passHref>
                    <div className="navbar__item" onClick={hideMenuOnMobileClick}>Shop</div>
                </Link>
                {
                    isAuthed() ? (
                        <>
                            <Link href="/checkout" passHref>
                                <div className="navbar__item" onClick={hideMenuOnMobileClick}>
                                    {cartItems?.length === 0 ? null : (
                                        <div className="itemsInCart">Cart</div>
                                    )}
                                </div>
                            </Link>
                            <Link href="/" passHref>
                                <div style={
                                    {
                                        backgroudColor: "pink",
                                        border: "1px solid white",
                                    }
                                } className="navbar__item" onClick={() => {
                                    hideMenuOnMobileClick();
                                    localStorage.clear();
                                }}>Logout</div>
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link href="/login" passHref>
                                <div className="navbar__item" onClick={hideMenuOnMobileClick}>Login</div>
                            </Link>
                            <Link href="/register" passHref>
                                <div className="navbar__item" onClick={hideMenuOnMobileClick}>Register</div>
                            </Link>
                        </>

                    )
                }




            </nav>
        </header>
    );
};

export default Header;
