<template>
	<div>
		HOME
		{{channels}}
	</div>
</template>

<script>
import api from '@/api'

export default {
	data () {
		return {
			channels: []
		}
	},
	created () {
		api.get('/channels').then((response) => {
			this.channels = response.data
		});
	}
}
</script>
