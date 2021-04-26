<template>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>Dashboard</h2>
    <div class="container" v-if="isLogged == false"> <!--When is logged out -->
        <div class="alert alert-danger" role="alert">
            Sie müssen eingelogged sein um diese Seite zu nutzen!
        </div>
        <router-link to="/" class="btn btn-primary">Zurück Login</router-link>
    </div>
    <div class="container" v-if="isLogged == true"> <!--When is logged in -->
            <h3>Zugriff zum Shnittstelle</h3>

            <div v-for="kapsel in raumkapselList" :key="kapsel.serial" class="row"> <!--Active -->
                <div v-if="kapsel.status == 'active'" class="alert alert-dark col-md-12" role="alert">
                    <h4 style="color: green;">Status : Active !</h4>
                    <h5>Serien Nummer : {{kapsel.serial}}</h5>
                    <p>Typ : {{kapsel.type}}</p>
                    <button type="button" @click="launchKapsel(kapsel.serial)" v-if="kapsel.type == 'Dragon 2.0'" class="btn btn-outline-warning">Launch</button>
                    <button type="button" v-if="kapsel.type != 'Dragon 2.0'" class="btn btn-outline-secondary" disabled>Launch</button>
                    <br/>
                    <p>Wiedernutzung Zahl : {{kapsel.reuse_count}} mal</p>
                    <p>Wasseranlandungen : {{kapsel.water_landings}}</p>
                    <p>Erdelandungen : {{kapsel.land_landings}}</p>
                    <p>Aktualisiert zum letzten mal : {{kapsel.last_update}}.</p>
                    <p>Flugnummern :</p>
                    <ol>
                        <li style="background-color: #CCCCCC;" v-for="launc in kapsel.launches" :key="launc.serial">{{ launc }}</li>
                    </ol>
                    <hr/>
                    <p>ID : {{kapsel.id}}</p>
                    </div>
            </div>


            <div v-for="kapsel in raumkapselList" :key="kapsel.serial" class="row"> <!--Not Active -->
                <div v-if="kapsel.status != 'active'" class="alert alert-dark col-md-12" role="alert">
                    <h4 style="color: red;">Status : {{ kapsel.status }}</h4>
                    <h5>Serial : {{kapsel.serial}}</h5>
                    <p>Type : {{kapsel.type}}</p>
                    <button type="button" class="btn btn-outline-secondary" disabled>Launch</button>
                    <br/>
                    <p>Was in function : {{kapsel.reuse_count}} times.</p>
                    <p>Water landings : {{kapsel.reuse_count}}</p>
                    <p>Lands landings : {{kapsel.reuse_count}}</p>
                    <p>Last update : {{kapsel.last_update}}.</p>
                    <p>Launches :</p>
                    <ol>
                        <li style="background-color: #CCCCCC;" v-for="launc in kapsel.launches" :key="launc.serial">{{ launc }}</li>
                    </ol>
                    <hr/>
                    <p>ID : {{kapsel.id}}</p>
                    </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Dashboard",
        data(){
            return {
                raumkapselList:[]
            }
        },
        computed: {
            getUser(){
                return this.$store.state.username;
            },
            isLogged(){
                return this.$store.state.isloggedin;
            }
        },
        mounted () {
            if(this.isLogged == true){
                axios.get('https://api.spacexdata.com/v4/capsules').then(response=>{
                console.log(response.data);
                this.raumkapselList=response.data;
                }).catch(err=>{
                console.log(err);
                })
            }else{
                console.log("Not loggedin")
            }
        },
        methods: {
            launchKapsel(serial){
                alert("Raumkapsel " + serial + " startet")
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