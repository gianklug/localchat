<Header></Header>
<form on:submit|preventDefault>
  <input bind:value={user} type="text" name="" id="">
  <button on:click={updateUsername} type="submit">Update Username</button>
</form>
<style>

</style>
<script lang="ts">
  import Header from './Header.svelte';
  import { username, range } from '../stores.js';

  let user = '';
  username.subscribe(value => user = value)

  function updateUsername() {
    console.log("updating username")
    console.log(user);
      username.set(user);
  }

</script>