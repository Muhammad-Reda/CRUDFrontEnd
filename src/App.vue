<template>
    <Navigation />
    <RouterView />
</template>

<style>
    #app {
        font-family: Arial, Helvetica, sans-serif;
        color: #2c3e50;
    }
</style>

<script>
    import Navigation from "./components/Navigation.vue";
    export default {
        name: "App",
        components: {
            Navigation,
        },
    };
</script>

<style></style>
