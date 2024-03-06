<script>
  import { Router, Link, Route } from "svelte-routing";
  import GYAARRTTTT from './lib/loginSite.svelte'
  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/"><GYAARRTTTT />
    
    </Route>
  </div>
</Router>