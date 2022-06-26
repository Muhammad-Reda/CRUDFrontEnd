<template>
    <header :class="{ 'scrolled-nav': scrolledNav }">
        <nav>
            <ul class="navigation">
                UAS CRUD ||

                <li>
                    <RouterLink :to="{ name: 'Peminjaman' }" class="link"
                        >Peminjaman</RouterLink
                    >
                </li>
                <li>
                    <RouterLink :to="{ name: 'Buku' }" class="link"
                        >Buku</RouterLink
                    >
                </li>
                <li>
                    <RouterLink :to="{ name: 'home' }" class="link"
                        >Siswa</RouterLink
                    >
                </li>
            </ul>

            <div class="icon">
                <i
                    @click="toggleMobileNav"
                    v-show="mobile"
                    class="fa fa-bars"
                    :class="{ 'icon-active': mobileNav }"
                ></i>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                scrolledNav: null,
                mobile: null,
                mobileNav: null,
                windowWidth: null,
            };
        },

        created() {
            window.addEventListener("resize", this.checkScreen);
            this.checkScreen();
        },

        mounted() {
            window.addEventListener("scroll", this.updateScroll);
        },

        methods: {
            toggleMobileNav() {
                this.mobileNav = !this.mobileNav;
            },

            updateScroll() {
                const scrollPosition = window.scrollY;
                if (scrollPosition > 50) {
                    this.scrolledNav = true;
                    return;
                }
                this.scrolledNav = false;
            },

            checkScreen() {
                this.windowWidth = window.innerWidth;
                if (this.windowWidth <= 750) {
                    this.mobile = true;
                    return;
                }
                this.mobile = false;
                this.mobileNav = false;
                return;
            },
        },
    };
</script>

<style scoped>
    .scrolled-nav {
        background-color: rgb(0, 0, 0, 0.6);
    }

    .scrolled-nav nav {
        padding: 8px 0;
    }

    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        transition: 0.5s ease all;
        width: 100%;
        margin: 0 auto;
        @media (min-width: 1140px;) {
            max-width: 1140px;
        }
    }

    ul,
    .link {
        font-weight: 500;
        color: black;
        list-style: none;
        text-decoration: none;
    }

    li {
        text-transform: uppercase;
        padding: 16px;
        margin-left: 16px;
    }

    .link {
        font-size: 14px;
        transition: 0.5s ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid tran;
    }
    .navigation .link:hover {
        color: white;
        border-color: white;
    }

    .branding {
        color: black;
        display: flex;
        align-items: center;
    }

    .navigation {
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: center;
        background: #00afea;
    }

    .icon {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 10px;
        height: 100%;
    }

    .icon i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
    }

    .icon-active {
        transform: rotate(180deg);
    }

    .dropdown-nav {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 250px;
        height: 100%;
        background-color: white;
        left: 0;
        top: 0;
    }

    .dropdown-nav li {
        margin-left: 0;
    }

    .dropdown-nav li .link {
        color: rgb(181, 166, 166);
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }
</style>
