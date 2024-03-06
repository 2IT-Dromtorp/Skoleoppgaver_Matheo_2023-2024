<script>
  import { Router, Link, Route } from "svelte-routing";
  import CreateUser from './lib/createuser.svelte'
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/"><CreateUser /></Route>
  </div>
</Router>