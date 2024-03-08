<script>
  import { Router, Link, Route } from "svelte-routing";
  import CreateUser from './lib/createuser.svelte'
  import LogIn from './lib/signin.svelte'
  import User from './lib/user.svelte'
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/"><CreateUser /></Route>
    <Route path="/login"><LogIn /></Route>
    <Route path="/user"><User /></Route>
  </div>
</Router>