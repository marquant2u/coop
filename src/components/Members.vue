<template>
    <div class="Home">
        <div class="left"> 
            <button type="button" class="btn btn-2" @click="home()"> Retour</button>
            <button type="button" class="btn btn-6 deco" @click="logout()" >Se deconnecter</button>
        </div>
        <div class="right">
            <h1>Members</h1>
            <div v-for="mem in members"
				        :members="mem"
				        :key="mem._id" class='members'>
                            <img src="http://p-hold.com/150" height="150" width="150">
                            <div>
                                <p class= "member"> {{ mem.fullname }} </p>
                            </div>
                            <div>
                                <p class= "email"> {{ mem.email }}</p>  
                            </div>
                            <div>
                                <p class= "token"> token : {{ mem.token }} </p>
                            </div>
                    </div>
        </div>
        
    </div>
</template>


<script>
    import api from '@/api'
    import Vuex from 'vuex'
    import {
        mapActions
    } from 'vuex'
    import {
        mapState
    } from 'vuex'

    export default {

        computed: {
            ...mapState(['channels_post', 'channel_actuel', 'channels', 'members'])
        },

        created() {

            api.get('/members').then((response) => {
                this.$store.dispatch('fillMembers', response.data)
            });
        },
        methods: {

            logout() {
                this.$store.dispatch('auth/logout', true, {
                    root: true
                })
            },


            home() {
                this.$router.push({
                    name: "home"
                })
            }
        }
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .left {
        width: 100%;
        background-color: lightsteelblue;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .right {
        width: 100%;
        background-color: whitesmoke;
    }
    
    .members{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 4em;
    }
    
    .members > div {
        flex-basis: 25%;
    }
    
    .member{
        color: blueviolet; 
    }
    
    .email{
        color: deepskyblue;
    }

    .token{
        color: brown;
    }

    #style-2::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: dimgrey;
    }

    #style-2::-webkit-scrollbar {
        width: 12px;
        background-color: dimgrey;
    }

    #style-2::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: dimgrey;
    }

    header {
        font-family: 'Lobster', cursive;
        text-align: center;
        font-size: 25px;
    }

    #info {
        font-size: 18px;
        color: #555;
        text-align: center;
        margin-bottom: 25px;
    }

    a {
        color: #074E8C;
    }

    .scrollbar {
        height: 400px;
        overflow-y: scroll;
        margin-bottom: 25px;
    }

    .scrollbar1 {
        height: 600px;
        overflow-y: scroll;
        margin-bottom: 25px;
    }

    .force-overflow {
        min-height: 450px;
    }

    #wrapper {
        text-align: center;
        width: 500px;
        margin: auto;
    }

    html,
    body {
        height: 100%;
    }


    body {
        margin: 0px;
        padding: 0px;
    }

    body {
        background-color: black;
        color: #121221;
        font: 700 14px Montserrat, sans-serif;
        letter-spacing: 0.125em;
        text-align: center;
        text-transform: uppercase;
    }

    .btn {
        background: none;
        border: 2px solid;
        border-bottom-width: 4px;
        font: inherit;
        letter-spacing: inherit;
        margin: 1em;
        padding: 3 0px;
        text-transform: inherit;
        transition: color 1s;
    }

    .btn-1 {
        color: #9c89f7;
    }

    .btn-1:hover {
        animation: halftone 1s forwards;
        background: radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 0 0 / 1.25em 1.25em, radial-gradient(circle, #9c89f7 0.2em, transparent 0.25em) 6.25em 6.25em / 1.25em 1.25em;
        color: #e4f789;
    }

    @keyframes halftone {
        100% {
            background-size: 2.375em 2.375em, 0.1em 0.1em;
        }
    }

    .btn-2 {
        color: #82f6d8;
    }

    .btn-2:hover {
        animation: stripes-move 0.75s infinite linear;
        background: repeating-linear-gradient(45deg, #82f6d8 0, #82f6d8 0.25em, transparent 0.25em, transparent 0.5em);
        color: #f682a0;
    }

    @keyframes stripes-move {
        100% {
            background-position: 5em 0px;
        }
    }

    .btn-3 {
        color: #d3f169;
    }

    .btn-3:hover {
        animation: sawtooth 0.35s infinite linear;
        background: linear-gradient(45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em, linear-gradient(-45deg, #d3f169 0.5em, transparent 0.5em) 0 0 / 1em 1em;
        color: #8769f1;
    }

    @keyframes sawtooth {
        100% {
            background-position: 1em 0;
        }
    }

    .btn-4 {
        color: #eea163;
    }

    .btn-4:hover {
        animation: zigzag 1s linear infinite;
        background: linear-gradient(135deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(225deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) -0.5em 0, linear-gradient(315deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0, linear-gradient(45deg, rgba(238, 161, 99, 0.25) 0.25em, transparent 0.25em) 0 0;
        background-size: 0.75em 0.75em;
        color: #63b0ee;
    }

    @keyframes zigzag {
        100% {
            background-position: 1em 0, 1em 0, -0.75em 0, -0.75em 0;
        }
    }

    .btn-5 {
        color: #7cf07f;
    }

    .btn-5:hover {
        animation: blinds 0.75s linear forwards;
        background: linear-gradient(0deg, #7cf07f 25%, transparent 25%) 0 0 / 0.5em 0.5em, linear-gradient(0deg, #88d6f3 50%, transparent 50%) 0 0 / 1em 1em;
        color: #f07ced;
    }

    @keyframes blinds {
        100% {
            background-position: 0 0, 0 -3em;
            background-size: 0 0, 1em 6em;
        }
    }

    .btn-6 {
        color: #f9879b;
    }

    .btn-6:hover {
        animation: pulse 1s ease-in infinite;
        background: radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0 0 / 1em 1em, radial-gradient(circle, rgba(249, 135, 155, 0.25) 43%, transparent 50%) 0.5em 0.5em / 2em 2em;
        color: #0bdcb7;
    }

    @keyframes pulse {
        50% {
            background-position: 0.66em 0.66em, -0.33em -0.33em;
        }
        100% {
            background-size: 2em 2em, 1em 1em;
            background-position: -1.5em -1.5em, -1em -1em;
        }
    }

    h1 {
        color: lightblue;
    }

</style>
