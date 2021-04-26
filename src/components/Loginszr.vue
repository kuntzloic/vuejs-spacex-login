<template>
    <div class="container" v-if="isLogged == false"> <!--When is logged out -->
        <h1>Login</h1>
        <div class="row">
            <h5>Nutzername :</h5>
            <input type="text" placeholder="Nutzername" class="form-control" name="nutzer" id="nutzerinp">
        </div>
        <div class="row">
            <h5>Passwort :</h5>
            <input type="password" placeholder="Passwort" class="form-control" id="passwortinp" name="passwort">
        </div>
        <button type="button" @click="updateLogin" class="btn btn-outline-primary">Log In</button>
        <h3>Einwahldaten : </h3>
        <p>Nutzername  : {{ getAdminUser }}</p>
        <p>Passwort  : {{ getAdminPass }}</p>
    </div>
    <div class="container" v-if="isLogged == true"> <!--When is logged in -->
        <h1>Super {{getUser}} ! du bist eingelogged!</h1>
        <router-link to="/dashboard" class="btn btn-primary">Zu Dashboard gehen !</router-link>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Loginszr",
        data(){
            return {
                usersList:[]
            }
        },
        computed: {
            getUser(){
                return this.$store.state.username;
            },
            getPass(){
                return this.$store.state.password;
            },
            getAdminUser(){
                return this.$store.state.admin_username;
            },
            getAdminPass(){
                return this.$store.state.admin_password;
            },
            isLogged(){
                return this.$store.state.isloggedin;
            }
        },
        mounted () {
            if(this.isLogged == false){
                axios.get('https://randomuser.me/api/').then(response=>{
                console.log(response.data);
                this.usersList=response.data["results"];
                this.usersList.forEach(element => this.saveAdminUser(element.login.username)); //Saving the username
                this.usersList.forEach(element => this.saveAdminPassword(element.login.password)); //Saving the password
                }).catch(err=>{
                console.log(err);
                })
            }
        },
        methods: {
            saveUser(username){
                this.$store.commit("saveUser", username)
            },
            savePassword(password){
                this.$store.commit("savePassword", password)
            },
            saveAdminUser(username){
                this.$store.commit("saveAdminUser", username)
            },
            saveAdminPassword(password){
                this.$store.commit("saveAdminPassword", password)
            },
            updateLogin(){
                this.saveUser(document.getElementById("nutzerinp").value);
                this.savePassword(document.getElementById("passwortinp").value);
                this.$store.commit("updateLoggin");
                console.log("#1245 Updating " + this.$store.state.isloggedin + "     " + this.getUser)
            }
        },
        props: {
            msg: String,
        },
};
</script>


<style scoped>

</style>