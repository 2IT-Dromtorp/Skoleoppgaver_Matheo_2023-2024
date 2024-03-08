<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { app } from '../firebase'
    import { navigate } from "svelte-routing";
    
    let email = ""
    let password = ""

    function logIn(e){
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            localStorage.setItem("jwt", await userCredential.user.getIdToken())
            navigate("/user")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
        });
    }
</script>

<div>
    <h1>Log In</h1>
    <form on:submit={logIn}>
        <input autocomplete="username" required={true} type="email" bind:value={email}/>
        <input autocomplete="current-password" required={true} type="password" bind:value={password}/>
        <button type="submit">Submit</button>
    </form>
</div>