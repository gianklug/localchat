<script lang="ts">
	import { username, range } from '../stores.js';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let user = '';
	let searchrange = '';
	username.subscribe((value) => (user = value));
	range.subscribe((value) => (searchrange = value));

	function updateUsername() {
		username.set(user);
		toast.push('Username successfully changed', {
			theme: {
				'--toastBackground': '#48BB78',
				'--toastBarBackground': '#2F855A'
			}
		});
	}

	function updateRange() {
		range.set(searchrange);
		toast.push('Range successfully changed', {
			theme: {
				'--toastBackground': '#48BB78',
				'--toastBarBackground': '#2F855A'
			}
		});
	}
</script>

<SvelteToast />

<div class="settings-form">
	<form on:submit|preventDefault>
		<label for="username-input">Username</label>
		<input bind:value={user} type="text" class="text-input" id="username-input" />
		<button on:click={updateUsername} type="submit" class="button">Update</button>
	</form>
	<form on:submit|preventDefault>
		<label for="range-input">Search range ({searchrange} km)</label>
		<input
			bind:value={searchrange}
			type="range"
			class="text-input"
			id="range-input"
			min="10"
			max="150"
		/>
		<button on:click={updateRange} type="submit" class="button">Update</button>
	</form>
</div>
<a href="/" class="button">Back</a>
<style>
	:root {
		--toastContainerTop: 5em;
		--toastContainerLeft: auto;
	}

	.settings-form {
		margin-top: 2em;
		padding: 5px;
		font-family: Arial, Helvetica, sans-serif;
	}

	.text-input {
		padding: 5px;
		border-radius: 10px;
	}

	#range-input {
		align-self: bottom;
	}

	.button {
		padding: 5px;
		border-radius: 10px;
	}

	.button:hover {
		background-color: lightgray;
	}

	.button:active {
		background-color: gray;
	}
</style>
