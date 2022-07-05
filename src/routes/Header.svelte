<div class="header">
    <h1 class="title">LocalChat</h1>
    {#if $page.routeId != "settings"}
    <a class="settings" href="/settings">Settings</a>
    {/if}
</div>

<style>
    .header {
        position: sticky;
        top: 0;
        background-color: #EEEEEE;
        padding-left: 1.5em;
        padding-right: 1.5em;
        padding-top: 1em;
        padding-bottom: 0.5em;
        box-shadow: 0px 0px 15px 5px #000000;
        font-family: Arial, Helvetica, sans-serif;
    }
    .title {
        display: inline;
    }
    .settings {
        display: inline;
        text-decoration: underline;
        cursor: pointer;
        float: right;
        align-self: center;

    }
</style>

<script lang="ts">
    import { page } from '$app/stores';
</script>

